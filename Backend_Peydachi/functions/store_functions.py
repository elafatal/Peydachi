import datetime
from database.models import User, Store, StoreCategory, StoreComment, StoreRating, ProductComment, ProductRating, Product
from sqlalchemy.orm import Session
from sqlalchemy import delete, and_
from functions.general_functions import check_store_name_duplicate
from schemas.store_schema import StoreModel
from errors.store_errors import (
    NO_STORE_FOUND_ERROR,
    STORE_NOT_FOUND_ERROR,
    STORE_ALREADY_EXISTS_ERROR,
    STORE_ACCESS_ERROR
)
from errors.user_errors import USER_NOT_FOUND_ERROR, USER_NOT_SELLER_ERROR, USER_ALREADY_HAS_STORE


async def create_store(request: StoreModel, db: Session):
    if check_store_name_duplicate(request.name, db):
        raise STORE_ALREADY_EXISTS_ERROR

    if request.owner_id:
        user = db.query(User).filter(User.id == request.owner_id).first()
        if not user or not user.is_seller:
            raise USER_NOT_SELLER_ERROR

        existing_store = db.query(Store).filter(Store.owner_id == user.id).first()
        if existing_store:
            raise USER_ALREADY_HAS_STORE

    store = Store(
        name=request.name,
        description=request.description if request.description else None,
        owner_id=request.owner_id if request.owner_id else None,
        location_latitude=request.location_latitude if request.location_latitude else None,
        location_longitude=request.location_longitude if request.location_longitude else None,
        contact_info=request.contact_info if request.contact_info else None,
        date_added=datetime.datetime.now(),
    )

    db.add(store)
    db.commit()
    db.refresh(store)

    return store


async def add_owner_to_store(user_id: int, store_id: int, db: Session):
    store = db.query(Store).filter(Store.id == store_id).first()
    if not store:
        raise STORE_NOT_FOUND_ERROR

    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise USER_NOT_FOUND_ERROR

    store.owner_id = user_id
    user.is_seller = True
    db.commit()

    return store


async def update_store_info(user_id: int, request: StoreModel, db: Session):
    store = db.query(Store).filter(Store.id == request.id).first()
    if not store:
        raise NO_STORE_FOUND_ERROR


    if user_id != store.owner_id:
        raise STORE_ACCESS_ERROR

    store.name = request.name if request.name else store.name
    store.description = request.description if request.description else store.description
    store.location_latitude = request.location_latitude if request.location_latitude else store.location_latitude
    store.location_longitude = request.location_longitude if request.location_longitude else store.location_longitude
    store.contact_info = request.contact_info if request.contact_info else store.contact_info

    db.commit()

    return store


async def get_self_store(user_id: int, db: Session):
    store = db.query(Store).filter(Store.owner_id == user_id).first()
    if not store:
        raise NO_STORE_FOUND_ERROR

    return store


async def delete_store(user_id: int, db: Session):
    store = db.query(Store).filter(Store.owner_id == user_id).first()
    if not store:
        raise NO_STORE_FOUND_ERROR

    product_ids_tuple = db.query(Product.id).filter(Product.store_id == store.id).all()
    product_ids = []
    for product_id in product_ids_tuple:
        product_ids.append(product_id[0])

    products = delete(Product).where(Product.store_id == store.id)
    product_ratings = delete(ProductRating).where(ProductRating.product_id.in_(product_ids))
    product_comments = delete(ProductComment).where(ProductComment.product_id.in_(product_ids))
    store_ratings = delete(StoreRating).where(StoreRating.store_id == store.id)
    store_comments = delete(StoreComment).where(StoreComment.store_id == store.id)
    store_category = delete(StoreCategory).where(StoreCategory.store_id == store.id)

    db.execute(products)
    db.execute(store_ratings)
    db.execute(store_comments)
    db.execute(product_ratings)
    db.execute(product_comments)
    db.execute(store_category)

    db.delete(store)
    db.commit()

    return 'Store deleted'


async def delete_store_admin(store_id: int, db: Session):
    store = db.query(Store).filter(Store.id == store_id).first()
    if not store:
        raise NO_STORE_FOUND_ERROR

    product_ids_tuple = db.query(Product.id).filter(Product.store_id == store.id).all()
    product_ids = []
    for product_id in product_ids_tuple:
        product_ids.append(product_id[0])

    products = delete(Product).where(Product.store_id == store.id)
    product_ratings = delete(ProductRating).where(ProductRating.product_id.in_(product_ids))
    product_comments = delete(ProductComment).where(ProductComment.product_id.in_(product_ids))
    store_ratings = delete(StoreRating).where(StoreRating.store_id == store.id)
    store_comments = delete(StoreComment).where(StoreComment.store_id == store.id)

    db.execute(products)
    db.execute(store_ratings)
    db.execute(store_comments)
    db.execute(product_ratings)
    db.execute(product_comments)

    db.delete(store)
    db.commit()

    return 'Store deleted'


async def ban_store(store_id: int, db: Session):
    store = db.query(Store).filter(Store.id == store_id).first()
    if not store:
        raise STORE_NOT_FOUND_ERROR

    store.is_banned = True

    user = db.query(User).filter(User.id == store.owner_id).first()
    if not user:
        raise USER_NOT_FOUND_ERROR

    user.is_banned = True
    db.commit()

    return store


async def unban_store(store_id: int, db: Session):
    store = db.query(Store).filter(Store.id == store_id).first()
    if not store:
        raise STORE_NOT_FOUND_ERROR

    store.is_banned = False

    user = db.query(User).filter(User.id == store.owner_id).first()
    if not user:
        raise USER_NOT_FOUND_ERROR

    user.is_banned = False

    db.commit()

    return store


async def get_all_stores(db: Session):
    stores = db.query(Store).all()
    if not stores:
        raise NO_STORE_FOUND_ERROR

    return stores


async def search_store(name: str, db: Session):
    stores = db.query(Store).filter(Store.name.match(name)).all()
    if not stores:
        raise NO_STORE_FOUND_ERROR

    return stores


async def get_store_by_id(store_id: int, db: Session):
    store = db.query(Store).filter(Store.id == store_id).first()
    if not store:
        raise STORE_NOT_FOUND_ERROR

    return store


async def get_all_banned_stores(db: Session):
    stores = db.query(Store).filter(Store.is_banned == True).all()
    if not stores:
        raise NO_STORE_FOUND_ERROR

    return stores


async def get_all_stores_of_city(city_id: int, db: Session):
    stores = db.query(Store).filter(Store.city_id == city_id).all()
    if not stores:
        raise NO_STORE_FOUND_ERROR

    return stores


async def search_all_stores_of_city(city_id: int, name: str, db: Session):
    stores = db.query(Store).filter(and_(Store.city_id == city_id, Store.name.match(name))).all()
    if not stores:
        raise NO_STORE_FOUND_ERROR

    return stores


async def search_in_banned_stores(name: str, db: Session):
    stores = db.query(Store).filter(and_(Store.is_banned == True, Store.name.match(name))).all()
    if not stores:
        raise NO_STORE_FOUND_ERROR

    return stores


async def promote_user_to_seller(user_id: int, db: Session):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise USER_NOT_FOUND_ERROR

    user.is_seller = True

    db.commit()

    return f"User {user.username} is now a seller"