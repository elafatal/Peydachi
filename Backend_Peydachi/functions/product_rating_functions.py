from database.models import StoreRating, Store, ProductRating, Product
from sqlalchemy.orm import Session
from sqlalchemy import delete, and_
from schemas.product_rating_schemas import AddProductRatingModel
from errors.store_errors import STORE_NOT_FOUND_ERROR
from errors.product_errors import PRODUCT_NOT_FOUND_ERROR
from statistics import mean



def update_product_average_rating(product_id: int, db: Session):
    product = db.query(Product).filter(Product.id == product_id).first()
    ratings = db.query(ProductRating).filter(ProductRating.product_id == product_id).all()

    if not ratings:
        product.average_rating = None
        db.commit()
        return

    product.average_rating = mean([rating.rating for rating in ratings])
    db.commit()

    return


def update_store_average_product_rating(store_id: int, db: Session):
    store = db.query(Store).filter(Store.id == store_id).first()
    ratings = db.query(ProductRating).filter(ProductRating.store_id == store_id).all()

    if not ratings:
        store.average_product_rating = None
        db.commit()
        return

    store.average_product_rating = mean([rating.rating for rating in ratings])
    db.commit()

    return


async def rate_product(rating: AddProductRatingModel, user_id: int, db: Session):
    product = db.query(Product).filter(Product.id == rating.product_id).first()
    if not product:
        raise PRODUCT_NOT_FOUND_ERROR

    product_rating = db.query(ProductRating).filter(and_(ProductRating.product_id == rating.product_id, ProductRating.user_id == user_id)).first()
    if product_rating:
        product_rating.rating = rating.rating
        db.commit()
        update_product_average_rating(product.id, db)
        update_store_average_product_rating(product.store_id, db)
        return product_rating

    else:
        new_product_rating = ProductRating(
            product_id=rating.product_id,
            user_id=user_id,
            store_id=product.store_id,
            rating=rating.rating
        )

        db.add(new_product_rating)
        db.commit()
        update_product_average_rating(product.id, db)
        update_store_average_product_rating(product.store_id, db)

        return new_product_rating


async def reset_product_rating(product_id: int, db: Session):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise PRODUCT_NOT_FOUND_ERROR

    product_ratings = delete(ProductRating).where(ProductRating.product_id == product_id)

    db.execute(product_ratings)

    db.commit()
    update_product_average_rating(product.id, db)
    update_store_average_product_rating(product.store_id, db)

    return


async def get_product_rating_distribution(product_id: int, db: Session):
    product_rating_distribution = []

    for i in range(1, 6):
        product_rating_count = db.query(ProductRating).filter(ProductRating.product_id == product_id, ProductRating.rating == i).count()

        distribution = {
            'rating': i,
            'count': product_rating_count
        }

        product_rating_distribution.append(distribution)

    return product_rating_distribution