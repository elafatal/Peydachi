from database.models import StoreRating, Store, ProductRating, Product
from sqlalchemy.orm import Session
from sqlalchemy import delete, and_
from schemas.store_rating_schemas import AddStoreRatingModel
from errors.store_errors import STORE_NOT_FOUND_ERROR
from statistics import mean




def update_store_average_rating(store_id: int, db: Session):
    store = db.query(Store).filter(Store.id == store_id).first()
    ratings = db.query(StoreRating).filter(StoreRating.store_id == store_id).all()

    if not ratings:
        store.average_rating = None
        db.commit()
        return

    store.average_rating = mean([rating.rating for rating in ratings])
    db.commit()

    return





async def rate_store(rating: AddStoreRatingModel, user_id: int, db: Session):
    store = db.query(Store).filter(Store.id == rating.store_id).first()
    if not store:
        raise STORE_NOT_FOUND_ERROR

    store_rating = db.query(StoreRating).filter(and_(StoreRating.store_id == rating.store_id, StoreRating.user_id == user_id)).first()
    if store_rating:
        store_rating.rating = rating.rating
        db.commit()
        update_store_average_rating(store.id, db)
        return store_rating

    else:
        new_store_rating = StoreRating(
            store_id=rating.store_id,
            user_id=user_id,
            rating=rating.rating
        )

        db.add(new_store_rating)
        db.commit()
        update_store_average_rating(store.id, db)

        return new_store_rating


async def reset_all_ratings_of_store(store_id: int, db: Session):
    store = db.query(Store).filter(Store.id == store_id).first()
    if not store:
        raise STORE_NOT_FOUND_ERROR

    store_ratings = delete(StoreRating).where(StoreRating.store_id == store_id)
    db.execute(store_ratings)

    store.average_rating = None
    db.commit()

    return f'All ratings of store {store.name} reset'


async def get_store_rating_distribution(store_id: int, db: Session):
    store_rating_distribution = []

    for i in range(1, 6):
        product_rating_count = db.query(StoreRating).filter(and_(StoreRating.store_id == store_id, StoreRating.rating == i)).count()

        distribution = {
            'rating': i,
            'count': product_rating_count
        }

        store_rating_distribution.append(distribution)

    return store_rating_distribution