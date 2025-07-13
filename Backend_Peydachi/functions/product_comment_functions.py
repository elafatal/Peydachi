import datetime
from database.models import ProductComment, User, Product, Store
from sqlalchemy.orm import Session
from sqlalchemy import delete, and_
from schemas.product_comment_schemas import AddProductCommentModel
from errors.product_comment_errors import (
    PRODUCT_COMMENT_ACCESS_ERROR,
    NO_PRODUCT_COMMENT_FOUND_ERROR,
    PRODUCT_COMMENT_NOT_FOUND_ERROR
)
from errors.user_errors import USER_NOT_FOUND_ERROR


async def add_product_comment(product_comment: AddProductCommentModel, user_id: int, db: Session):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise USER_NOT_FOUND_ERROR

    new_product_comment = ProductComment(
        user_id=user_id,
        product_id=product_comment.product_id,
        user_name=user.username,
        text=product_comment.text,
        date_added=datetime.datetime.now(),
    )

    db.add(new_product_comment)
    db.commit()

    return new_product_comment


async def get_product_comments(product_id: int, db: Session):
    product_comments = db.query(ProductComment).filter(ProductComment.product_id == product_id).order_by(ProductComment.date_added.desc()).all()
    if not product_comments:
        raise NO_PRODUCT_COMMENT_FOUND_ERROR

    return product_comments


async def get_product_comment_by_id(product_comment_id: int, db: Session):
    product_comment = db.query(ProductComment).filter(ProductComment.id == product_comment_id).first()
    if not product_comment:
        raise NO_PRODUCT_COMMENT_FOUND_ERROR

    return product_comment


async def admin_delete_product_comment(product_comment_id: int, db: Session):
    product_comment = db.query(ProductComment).filter(ProductComment.id == product_comment_id).first()
    if not product_comment:
        raise PRODUCT_COMMENT_NOT_FOUND_ERROR

    db.delete(product_comment)
    db.commit()

    return 'Product comment deleted'


async def user_delete_product_comment(product_comment_id: int, user_id: int, db: Session):
    product_comment = db.query(ProductComment).filter(ProductComment.id == product_comment_id).first()
    if not product_comment:
        raise PRODUCT_COMMENT_NOT_FOUND_ERROR

    if product_comment.user_id != user_id:
        raise PRODUCT_COMMENT_ACCESS_ERROR

    db.delete(product_comment)
    db.commit()

    return 'Product comment deleted'


async def search_product_comments_of_product(product_id: int, search: str, db: Session):
    product_comments = db.query(ProductComment).filter(and_(ProductComment.product_id == product_id, ProductComment.text.contains(search))).order_by(ProductComment.date_added.desc()).all()
    if not product_comments:
        raise NO_PRODUCT_COMMENT_FOUND_ERROR

    return product_comments


async def search_in_all_product_comments(search: str, db: Session):
    product_comments = db.query(ProductComment).filter(ProductComment.text.contains(search)).order_by(ProductComment.date_added.desc()).all()
    if not product_comments:
        raise NO_PRODUCT_COMMENT_FOUND_ERROR

    return product_comments


async def delete_all_comments_of_product(product_id: int, db: Session):
    delete_product_comments = delete(ProductComment).where(ProductComment.product_id == product_id)

    db.execute(delete_product_comments)
    db.commit()

    return 'Product comments deleted'


async def get_user_product_comments(user_id: int, db: Session):
    product_comments = db.query(ProductComment).filter(ProductComment.user_id == user_id).order_by(ProductComment.date_added.desc()).all()

    if not product_comments:
        raise NO_PRODUCT_COMMENT_FOUND_ERROR

    return product_comments


async def get_user_full_product_comments(user_id: int, db: Session):
    product_comments = db.query(ProductComment).filter(ProductComment.user_id == user_id).order_by(ProductComment.date_added.desc()).all()

    if not product_comments:
        raise NO_PRODUCT_COMMENT_FOUND_ERROR


    full_product_comments = []
    for comment in product_comments:
        product = db.query(Product).filter(Product.id == comment.product_id).first()
        store = db.query(Store).filter(Store.id == product.store_id).first()

        full_product_comment = {
            'product_comment': comment,
            'product': product,
            'store': store
        }

        full_product_comments.append(full_product_comment)


    return full_product_comments


