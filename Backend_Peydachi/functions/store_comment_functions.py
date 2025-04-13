import datetime
from database.models import StoreComment, User
from sqlalchemy.orm import Session
from sqlalchemy import delete, and_
from schemas.store_comments_schemas import AddStoreCommentModel
from errors.store_comment_errors import (
    NO_STORE_COMMENT_FOUND_ERROR,
    STORE_COMMENT_NOT_FOUND_ERROR,
    STORE_COMMENT_ACCESS_ERROR)
from errors.user_errors import USER_NOT_FOUND_ERROR


async def add_store_comment(store_comment: AddStoreCommentModel, user_id: int, db: Session):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise USER_NOT_FOUND_ERROR

    new_store_comment = StoreComment(
        user_id=user_id,
        store_id=store_comment.store_id,
        user_name=user.username,
        text=store_comment.text,
        date_added=datetime.datetime.now(),
    )

    db.add(new_store_comment)
    db.commit()

    return new_store_comment


async def get_store_comments(store_id: int, db: Session):
    store_comments = db.query(StoreComment).filter(StoreComment.store_id == store_id).order_by(StoreComment.date_added.desc()).all()
    if not store_comments:
        raise NO_STORE_COMMENT_FOUND_ERROR

    return store_comments


async def get_store_comment_by_id(store_comment_id: int, db: Session):
    store_comment = db.query(StoreComment).filter(StoreComment.id == store_comment_id).first()
    if not store_comment:
        raise STORE_COMMENT_NOT_FOUND_ERROR

    return store_comment


async def admin_remove_store_comment(store_comment_id: int, db: Session):
    store_comment = db.query(StoreComment).filter(StoreComment.id == store_comment_id).first()
    if not store_comment:
        raise STORE_COMMENT_NOT_FOUND_ERROR

    db.delete(store_comment)
    db.commit()

    return 'Store comment deleted'


async def user_delete_store_comment(store_comment_id: int, user_id: int, db: Session):
    store_comment = db.query(StoreComment).filter(StoreComment.id == store_comment_id).first()
    if not store_comment:
        raise STORE_COMMENT_NOT_FOUND_ERROR

    if store_comment.user_id != user_id:
        raise STORE_COMMENT_ACCESS_ERROR

    db.delete(store_comment)
    db.commit()

    return 'Store comment deleted'


async def search_store_comments(store_id: int, search: str, db: Session):
    store_comments = db.query(StoreComment).filter(and_(StoreComment.store_id == store_id, StoreComment.text.contains(search))).order_by(StoreComment.date_added.desc()).all()
    if not store_comments:
        raise NO_STORE_COMMENT_FOUND_ERROR

    return store_comments


async def delete_all_comments_of_store(store_id: int, db: Session):
    delete_store_comments = delete(StoreComment).where(StoreComment.store_id == store_id)

    db.execute(delete_store_comments)
    db.commit()

    return 'Store comments deleted'

