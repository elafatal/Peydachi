from database.models import User
from sqlalchemy.orm import Session
from sqlalchemy import delete
from hash.hash import Hash
from errors.user_errors import USER_NOT_FOUND_ERROR


async def get_user_by_username(username: str, db: Session):
    user = db.query(User).filter(User.username == username).first()

    if not user:
        raise USER_NOT_FOUND_ERROR

    return user