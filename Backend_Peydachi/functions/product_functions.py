import datetime
from fastapi import UploadFile, File
from database.models import Product, Store, ProductComment, ProductRating
from sqlalchemy.orm import Session
from sqlalchemy import delete, and_
from schemas.product_schemas import ProductModel, UpdateProductModel, ProductSearchModels
from string import ascii_letters
import random
from errors.product_errors import NO_PRODUCT_FOUND_ERROR, PRODUCT_NOT_FOUND_ERROR, PRODUCT_ACCESS_ERROR
from errors.store_errors import STORE_NOT_FOUND_ERROR




async def add_product(product: ProductModel, owner_id: int, pic: UploadFile | None, db: Session):
    store = db.query(Store).filter(Store.owner_id == owner_id).first()
    if not store:
        raise STORE_NOT_FOUND_ERROR


    new_product = Product(
        store_id = product.store_id,
        name=product.name,
        description=product.description if product.description else None,
        city_id=store.city_id,
        date_added=datetime.datetime.now(),
        quantity=product.quantity if product.quantity else None
    )

    db.add(new_product)

    if pic:
        rand_str = ''.join(random.choice(ascii_letters) for _ in range(6))
        new_name = f'_{rand_str}.'.join(pic.filename.rsplit('.', 1))
        path_file = f'pictures/{new_name}'

        new_product.pic_url = path_file


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
    path_file = f'pictures/{new_name}'

    product.pic_url = path_file

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

    product.pic_url = None

    db.commit()
    db.refresh(product)

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


async def search_near_products(search: ProductSearchModels, db: Session):
    pass