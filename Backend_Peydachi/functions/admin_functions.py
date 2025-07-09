from database.models import User, StoreComment, ProductComment, StoreRating, ProductRating, Notification
from sqlalchemy.orm import Session
from sqlalchemy import delete, and_
from hash.hash import Hash
from schemas.user_schemas import UserModel
from errors.admin_errors import USER_IS_ALREADY_ADMIN_ERROR, USER_IS_NOT_ADMIN_ERROR
from errors.user_errors import (
    USER_NAME_DUPLICATE_ERROR,
    EMAIL_DUPLICATE_ERROR,
    PHONE_NUMBER_DUPLICATE_ERROR,
    USER_NOT_FOUND_ERROR
)
from functions.general_functions import (
    check_username_duplicate,
    check_phone_number_duplicate,
    check_email_duplicate
)


async def create_admin(request: UserModel, db: Session):
    if check_username_duplicate(request.username, db):
        raise USER_NAME_DUPLICATE_ERROR

    if request.email and check_email_duplicate(request.email, db):
        raise EMAIL_DUPLICATE_ERROR

    if request.phone_number and check_phone_number_duplicate(request.phone_number, db):
        raise PHONE_NUMBER_DUPLICATE_ERROR

    user = User(
        username=request.username,
        password=Hash.bcrypt(request.password),
        email=request.email if request.email else None,
        is_admin=True,
        phone_number=request.phone_number,
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return user


async def delete_user_admin(user_id: int, db: Session):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise USER_NOT_FOUND_ERROR

    delete_store_comments = delete(StoreComment).where(StoreComment.user_id == user_id)
    delete_product_comments = delete(ProductComment).where(ProductRating.user_id == user_id)
    delete_store_ratings = delete(StoreRating).where(StoreRating.user_id == user_id)
    delete_product_ratings = delete(ProductRating).where(ProductRating.user_id == user_id)
    delete_notification = delete(Notification).where(Notification.user_id == user_id)

    db.execute(delete_store_comments)
    db.execute(delete_product_comments)
    db.execute(delete_store_ratings)
    db.execute(delete_product_ratings)
    db.execute(delete_notification)

    db.delete(user)
    db.commit()
    return f"User '{user.username}' Has Been Deleted"


async def promote_user_to_admin(user_id: int, db: Session):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise USER_NOT_FOUND_ERROR

    if user.is_admin:
        raise USER_IS_ALREADY_ADMIN_ERROR

    user.is_admin = True
    db.commit()

    return user


async def demote_admin_to_user(user_id: int, db: Session):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise USER_NOT_FOUND_ERROR

    if not user.is_admin:
        raise USER_IS_NOT_ADMIN_ERROR

    user.is_admin = False
    db.commit()

    return user