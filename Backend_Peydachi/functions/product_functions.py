import datetime
from fastapi import UploadFile, File
from database.models import Product, Store, ProductComment, ProductRating, DeletedPics
from sqlalchemy.orm import Session
from urllib.parse import quote
from sqlalchemy import delete, and_
from schemas.product_schemas import ProductModel, UpdateProductModel, ProductSearchModels, FullSearchStoreProductModel
from string import ascii_letters
import random
from errors.product_errors import (
    NO_PRODUCT_FOUND_ERROR,
    PRODUCT_NOT_FOUND_ERROR,
    PRODUCT_ACCESS_ERROR,
    UPLOAD_PICTURE_ERROR,
    UPLOAD_PICTURE_INTERNAL_ERROR,
    PRIDUCT_HAS_NO_PICTURE_ERROR
)
from errors.store_errors import STORE_NOT_FOUND_ERROR
from errors.general_errors import INTERNAL_ERROR
import boto3
from botocore.exceptions import NoCredentialsError
from dotenv import load_dotenv
import os
import io
from redis.asyncio import Redis


load_dotenv()

LIARA_ENDPOINT = os.getenv("LIARA_ENDPOINT")
LIARA_ACCESS_KEY = os.getenv("LIARA_ACCESS_KEY")
LIARA_SECRET_KEY = os.getenv("LIARA_SECRET_KEY")
LIARA_BUCKET_NAME = os.getenv("LIARA_BUCKET_NAME")


s3 = boto3.client(
    "s3",
    endpoint_url=LIARA_ENDPOINT,
    aws_access_key_id=LIARA_ACCESS_KEY,
    aws_secret_access_key=LIARA_SECRET_KEY,
)


async def add_product(owner_id: int, db: Session, name: str, description: str | None, quantity: int | None, pic: UploadFile | None = None):
    store = db.query(Store).filter(Store.owner_id == owner_id).first()
    if not store:
        raise STORE_NOT_FOUND_ERROR

    new_product = Product(
        store_id=store.id,
        name=name,
        description=description if description else None,
        city_id=store.city_id,
        date_added=datetime.datetime.now(),
        quantity=quantity if quantity else None
    )

    db.add(new_product)

    if pic:
        rand_str = ''.join(random.choice(ascii_letters) for _ in range(6))
        new_name = f'_{rand_str}.'.join(pic.filename.rsplit('.', 1))
        pic.filename = new_name

        try:
            file_content = await pic.read()
            s3.upload_fileobj(io.BytesIO(file_content), LIARA_BUCKET_NAME, pic.filename)

            filename_encoded = quote(new_name)
            pic_url = f"https://{LIARA_BUCKET_NAME}.{LIARA_ENDPOINT.replace('https://', '')}/{filename_encoded}"

        except NoCredentialsError:
            raise UPLOAD_PICTURE_ERROR

        except Exception:
            raise UPLOAD_PICTURE_INTERNAL_ERROR

        new_product.pic_url = pic_url
        new_product.pic_name = new_name

    db.commit()
    db.refresh(new_product)

    return new_product


async def update_product(product_info: UpdateProductModel, owner_id: int, db: Session):
    store = db.query(Store).filter(Store.owner_id == owner_id).first()
    if not store:
        raise STORE_NOT_FOUND_ERROR

    product = db.query(Product).filter(Product.id == product_info.id).first()
    if not product:
        raise PRODUCT_NOT_FOUND_ERROR

    if product.store_id != store.id:
        raise PRODUCT_ACCESS_ERROR

    product.name = product_info.name if product_info.name else product.name
    product.description = product_info.description if product_info.description else product.description

    db.commit()
    db.refresh(product)

    return product



async def add_product_pic(product_id: int, pic: UploadFile, owner_id: int, db: Session):
    store = db.query(Store).filter(Store.owner_id == owner_id).first()
    if not store:
        raise STORE_NOT_FOUND_ERROR

    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise NO_PRODUCT_FOUND_ERROR

    if product.store_id != store.id:
        raise PRODUCT_ACCESS_ERROR

    rand_str = ''.join(random.choice(ascii_letters) for _ in range(6))
    new_name = f'_{rand_str}.'.join(pic.filename.rsplit('.', 1))
    pic.filename = new_name

    try:
        file_content = await pic.read()
        s3.upload_fileobj(io.BytesIO(file_content), LIARA_BUCKET_NAME, pic.filename)

        filename_encoded = quote(new_name)
        pic_url = f"https://{LIARA_BUCKET_NAME}.{LIARA_ENDPOINT.replace('https://', '')}/{filename_encoded}"

        product.pic_url = pic_url
    except NoCredentialsError:
        raise UPLOAD_PICTURE_ERROR
    except Exception:
        raise UPLOAD_PICTURE_INTERNAL_ERROR


    if product.pic_name:
        old_pic_name = product.pic_name

        deletes_pic = DeletedPics(
            name=old_pic_name
        )

        db.add(deletes_pic)

    product.pic_name = new_name

    db.commit()
    db.refresh(product)

    return product


async def remove_product_pic(product_id: int, owner_id: int, db: Session):
    store = db.query(Store).filter(Store.owner_id == owner_id).first()
    if not store:
        raise STORE_NOT_FOUND_ERROR

    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise NO_PRODUCT_FOUND_ERROR

    if product.store_id != store.id:
        raise PRODUCT_ACCESS_ERROR

    if not product.pic_url:
        raise PRIDUCT_HAS_NO_PICTURE_ERROR

    delete_pic = DeletedPics(
        name=product.pic_name
    )
    db.add(delete_pic)

    product.pic_url = None
    product.pic_name = None

    db.commit()

    return product


async def delete_product(product_id: int, owner_id: int, db: Session):
    store = db.query(Store).filter(Store.owner_id == owner_id).first()
    if not store:
        raise STORE_NOT_FOUND_ERROR

    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise NO_PRODUCT_FOUND_ERROR

    if product.store_id != store.id:
        raise PRODUCT_ACCESS_ERROR


    product_comments = delete(ProductComment).where(ProductComment.product_id == product_id)
    product_ratings = delete(ProductRating).where(ProductRating.product_id == product_id)

    db.execute(product_comments)
    db.execute(product_ratings)

    if product.pic_name:
        delete_pic = DeletedPics(
            name=product.pic_name
        )
        db.add(delete_pic)

    db.delete(product)
    db.commit()

    return 'Product deleted'


async def delete_product_admin(product_id: int, db: Session):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise PRODUCT_NOT_FOUND_ERROR

    product_comments = delete(ProductComment).where(ProductComment.product_id == product_id)
    product_ratings = delete(ProductRating).where(ProductRating.product_id == product_id)

    db.execute(product_comments)
    db.execute(product_ratings)

    db.delete(product)


async def update_product_quantity(product_id: int, quantity: int, owner_id: int, db: Session):
    store = db.query(Store).filter(Store.owner_id == owner_id).first()
    if not store:
        raise STORE_NOT_FOUND_ERROR

    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise NO_PRODUCT_FOUND_ERROR

    if product.store_id != store.id:
        raise PRODUCT_ACCESS_ERROR

    product.quantity = quantity

    db.commit()
    db.refresh(product)

    return product


async def get_product_by_id(product_id: int, db: Session):
    product = db.query(Product).filter(Product.id == product_id).order_by(Product.date_added.desc()).first()
    if not product:
        raise NO_PRODUCT_FOUND_ERROR

    return product


async def get_all_products(db: Session):
    products = db.query(Product).order_by(Product.date_added.desc()).all()
    if not products:
        raise NO_PRODUCT_FOUND_ERROR

    return products



async def get_all_products_of_store(store_id: int, db: Session):
    products = db.query(Product).filter(Product.store_id == store_id).order_by(Product.date_added.desc()).all()
    if not products:
        raise NO_PRODUCT_FOUND_ERROR

    return products


async def get_all_available_products_of_store(store_id: int, db: Session):
    products = db.query(Product).filter(and_(Product.store_id == store_id, Product.quantity > 0)).order_by(Product.date_added.desc()).all()
    if not products:
        raise NO_PRODUCT_FOUND_ERROR

    return products


async def search_all_products(name: str, db: Session):
    products = db.query(Product).filter(Product.name.contains(name)).order_by(Product.date_added.desc()).all()
    if not products:
        raise NO_PRODUCT_FOUND_ERROR

    return products


async def search_all_products_of_store(store_id: int, name: str, db: Session):
    products = db.query(Product).filter(and_(Product.store_id == store_id, Product.name.contains(name))).order_by(Product.date_added.desc()).all()
    if not products:
        raise NO_PRODUCT_FOUND_ERROR

    return products


async def search_all_available_products_of_store(store_id: int, name: str, db: Session):
    products = db.query(Product).filter(and_(Product.store_id == store_id, Product.name.contains(name), Product.quantity > 0)).order_by(Product.date_added.desc()).all()
    if not products:
        raise NO_PRODUCT_FOUND_ERROR

    return products


async def search_all_products_of_city(city_id: int, name: str, db: Session):
    products = db.query(Product).filter(and_(Product.city_id == city_id, Product.name.contains(name))).order_by(Product.date_added.desc()).all()
    if not products:
        raise NO_PRODUCT_FOUND_ERROR

    return products


async def search_all_available_products_of_city(city_id: int, name: str, db: Session):
    products = db.query(Product).filter(and_(Product.city_id == city_id, Product.name.contains(name), Product.quantity > 0)).order_by(Product.date_added.desc()).all()
    if not products:
        raise NO_PRODUCT_FOUND_ERROR

    return products


async def get_self_products(user_id: int, db: Session):
    store = db.query(Store).filter(Store.owner_id == user_id).first()
    if not store:
        raise STORE_NOT_FOUND_ERROR

    products = db.query(Product).filter(Product.store_id == store.id).order_by(Product.date_added.desc()).all()
    if not products:
        raise NO_PRODUCT_FOUND_ERROR

    return products


async def search_near_products(search: ProductSearchModels, redis_db: Redis, db: Session):
    products = db.query(Product).filter(and_(Product.city_id == search.city_id, Product.name.contains(search.name))).all()

    if not products:
        raise NO_PRODUCT_FOUND_ERROR

    store_ids = [product.store_id for product in products]
    stores = db.query(Store).filter(Store.id.in_(store_ids)).all()


    generated_key = ''.join(random.choice(ascii_letters) for _ in range(6))


    for store in stores:
        this_long = float(store.location_longitude)
        this_lat = float(store.location_latitude)
        redis_db.geoadd(generated_key, (this_long, this_lat, store.id))


    redis_db.expire(generated_key, 60)
    search_result = redis_db.geosearch(
        generated_key,
        unit="km",
        radius=search.range_km if search.range_km else 10,
        longitude=float(search.location_longitude),
        latitude=float(search.location_latitude),
        withdist=True
    )


    if not search_result:
        raise NO_PRODUCT_FOUND_ERROR

    result_display = []
    for result in search_result:
        print(result)
        store_id = int(result[0].decode("utf-8"))
        result_product = next((product for product in products if product.store_id == store_id), None)
        result_store = next((store for store in stores if store.id == store_id), None)
        distance = round(float(result[1]), 2)
        print("Distance:", distance)


        result_json = {
            'store': result_store,
            'product': result_product,
            'distance': distance
        }

        result_display.append(result_json)


    redis_db.delete(generated_key)


    return result_display


async def full_search_in_store_products(search_request: FullSearchStoreProductModel, db: Session):
    search_offset = (search_request.page - 1) * search_request.show_limit
    search_limit = search_request.page * search_request.show_limit

    if not search_request.order and not search_request.search_text:
        products = db.query(Product).filter(Product.store_id == search_request.store_id).order_by(Product.average_rating.desc()).limit(search_limit).offset(search_offset).all()

    elif not search_request.order and search_request.search_text:
        products = db.query(Product).filter(and_(Product.store_id == search_request.store_id, Product.name.contains(search_request.search_text))).order_by(Product.average_rating.desc()).limit(search_limit).offset(search_offset).all()

    elif search_request.order:
        if search_request.search_text:
            if search_request.order == 'favorite':
                products = db.query(Product).filter(and_(Product.store_id == search_request.store_id, Product.name.contains(search_request.search_text))).order_by(Product.average_rating.desc()).limit(search_limit).offset(search_offset).all()

            elif search_request.order == 'newest':
                products = db.query(Product).filter(and_(Product.store_id == search_request.store_id, Product.name.contains(search_request.search_text))).order_by(Product.date_added.desc()).limit(search_limit).offset(search_offset).all()

            elif search_request.order == 'oldest':
                products = db.query(Product).filter(and_(Product.store_id == search_request.store_id, Product.name.contains(search_request.search_text))).order_by(Product.date_added.asc()).limit(search_limit).offset(search_offset).all()

        else:
            if search_request.order == 'favorite':
                products = db.query(Product).filter(Product.store_id == search_request.store_id).order_by(Product.average_rating.desc()).limit(search_limit).offset(search_offset).all()

            elif search_request.order == 'newest':
                products = db.query(Product).filter(Product.store_id == search_request.store_id).order_by(Product.date_added.desc()).limit(search_limit).offset(search_offset).all()

            elif search_request.order == 'oldest':
                products = db.query(Product).filter(Product.store_id == search_request.store_id).order_by(Product.date_added.asc()).limit(search_limit).offset(search_offset).all()

    else:
        products = db.query(Product).filter(Product.store_id == search_request.store_id).order_by(Product.average_rating.desc()).limit(search_limit).offset(search_offset).all()


    if not products:
        raise NO_PRODUCT_FOUND_ERROR

    return products