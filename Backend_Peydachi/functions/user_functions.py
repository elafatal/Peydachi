from database.models import User, StoreComment, ProductComment, StoreRating, ProductRating
from sqlalchemy.orm import Session
from sqlalchemy import delete, and_
from hash.hash import Hash
from errors.user_errors import USER_NOT_FOUND_ERROR
from schemas.user_schemas import UserModel, UserUpdateModel
from errors.user_errors import (
    USER_NOT_FOUND_ERROR,
    USER_NAME_DUPLICATE_ERROR,
    EMAIL_DUPLICATE_ERROR,
    PHONE_NUMBER_DUPLICATE_ERROR,
    NO_USER_FOUND_ERROR,
    DONT_HAVE_ACCESS_ADMIN_ERROR,
    USER_PHONE_VERIFICATION_CODE_ERROR,
    USER_HAS_NO_PHONE_NUMBER_ERROR,
    SMS_SERVER_ERROR,
    USER_VERIFICATION_CODE_EXPIRED_ERROR
)
from functions.general_functions import (
    check_username_duplicate,
    check_phone_number_duplicate,
    check_email_duplicate
)


async def get_user_by_username(username: str, db: Session):
    user = db.query(User).filter(User.username == username).first()

    if not user:
        raise USER_NOT_FOUND_ERROR

    return user


async def get_all_users(db: Session):
    users = db.query(User).all()

    if not users:
        raise NO_USER_FOUND_ERROR

    return users


async def get_user_by_id(user_id: int, db: Session):
    user = db.query(User).filter(User.id == user_id).first()

    if not user:
        raise USER_NOT_FOUND_ERROR

    return user


async def create_user(request: UserModel, db: Session):
    if check_username_duplicate(request.username, db):
        raise USER_NAME_DUPLICATE_ERROR

    if request.email and check_email_duplicate(request.email, db):
        raise EMAIL_DUPLICATE_ERROR

    if request.phone_number and check_phone_number_duplicate(request.phone_number, db):
        raise PHONE_NUMBER_DUPLICATE_ERROR

    user = User(
        username=request.username,
        password=Hash.bcrypt(request.password),
        email=request.email,
        phone_number=request.phone_number,
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return user


async def update_user(user_id: int, request: UserUpdateModel, db: Session):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise USER_NOT_FOUND_ERROR

    if request.username:
        if check_username_duplicate(request.username, db):
            raise USER_NAME_DUPLICATE_ERROR

        user.username = request.username

    if request.email:
        if check_email_duplicate(request.email, db):
            raise EMAIL_DUPLICATE_ERROR

        user.email = request.email

    if request.phone_number:
        if check_phone_number_duplicate(request.phone_number, db):
            raise PHONE_NUMBER_DUPLICATE_ERROR

        user.phone_number = request.phone_number

    if request.password:
        user.password = Hash.bcrypt(request.password)

    db.commit()

    return user


async def delete_user(user_id: int, db: Session):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise USER_NOT_FOUND_ERROR

    delete_store_comments = delete(StoreComment).where(StoreComment.user_id == user_id)
    delete_product_comments = delete(ProductComment).where(ProductRating.user_id == user_id)
    delete_store_ratings = delete(StoreRating).where(StoreRating.user_id == user_id)
    delete_product_ratings = delete(ProductRating).where(ProductRating.user_id == user_id)

    db.execute(delete_store_comments)
    db.execute(delete_product_comments)
    db.execute(delete_store_ratings)
    db.execute(delete_product_ratings)

    db.delete(user)
    db.commit()
    return f"User '{user.username}' Has Been Deleted"



async def admin_delete_user(user_id: int, db: Session):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise USER_NOT_FOUND_ERROR

    if user.is_admin and user.is_super_admin:
        raise DONT_HAVE_ACCESS_ADMIN_ERROR

    delete_store_comments = delete(StoreComment).where(StoreComment.user_id == user_id)
    delete_product_comments = delete(ProductComment).where(ProductRating.user_id == user_id)
    delete_store_ratings = delete(StoreRating).where(StoreRating.user_id == user_id)
    delete_product_ratings = delete(ProductRating).where(ProductRating.user_id == user_id)

    db.execute(delete_store_comments)
    db.execute(delete_product_comments)
    db.execute(delete_store_ratings)
    db.execute(delete_product_ratings)

    db.delete(user)
    db.commit()
    return f"User '{user.username}' Has Been Deleted"


async def ban_user(user_id: int, db: Session):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise USER_NOT_FOUND_ERROR

    if user.is_banned:
        return 'User Is Already Banned.'

    user.is_banned = True

    db.commit()

    return f"User '{user.username}' Banned By Admin."


async def unban_user(user_id: int, db: Session):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise USER_NOT_FOUND_ERROR

    if not user.is_banned:
        return 'User Is Not Banned.'

    user.is_banned = False

    db.commit()

    return f"User '{user.username}' Unbanned By Admin."


async def search_user_by_username(user_name: str, db: Session):
    users = db.query(User).filter(User.username.match(user_name)).all()

    if not users:
        raise NO_USER_FOUND_ERROR

    return users


async def get_all_banned_users(db: Session):
    users = db.query(User).filter(User.is_banned == True).all()

    if not users:
        raise NO_USER_FOUND_ERROR

    return users


async def search_in_banned_users(user_name: str, db: Session):
    users = db.query(User).filter(and_(User.is_banned == True, User.username.match(user_name))).all

    if not users:
        raise NO_USER_FOUND_ERROR

    return users
