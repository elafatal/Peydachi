from fastapi import APIRouter
from functions import notification_functions
from dependencies.dependencies import DB_DEPENDENCY
from dependencies.access_dependencies import USER_DEPENDENCY
from dependencies.body_dependencies import NAME_BODY, ID_BODY
from schemas.notification_schemas import NotificationDisplay


router = APIRouter(
    prefix='/notification',
    tags=['Notification'],
)


@router.post('/get_all_self_notifications', status_code=200, response_model=list[NotificationDisplay])
async def get_all_self_notifications(db: DB_DEPENDENCY, user: USER_DEPENDENCY):
    return await notification_functions.get_all_self_notifications(db=db, user_id=user.id)


@router.post('/get_all_self_unread_notifications', status_code=200, response_model=list[NotificationDisplay])
async def get_all_self_unread_notifications(db: DB_DEPENDENCY, user: USER_DEPENDENCY):
    return await notification_functions.get_all_self_unread_notifications(db=db, user_id=user.id)


@router.post('/review_notification', status_code=200, response_model=NotificationDisplay)
async def review_notification(notification_id: ID_BODY, db: DB_DEPENDENCY, user: USER_DEPENDENCY):
    return await notification_functions.review_notification(notification_id=notification_id, db=db, user_id=user.id)


@router.post('/get_notification_by_id', status_code=200, response_model=NotificationDisplay)
async def get_notification_by_id(notification_id: ID_BODY, db: DB_DEPENDENCY):
    return await notification_functions.get_notification_by_id(notification_id=notification_id, db=db)


@router.post('/search_self_notifications', status_code=200, response_model=list[NotificationDisplay])
async def search_self_notifications(search: NAME_BODY, db: DB_DEPENDENCY, user: USER_DEPENDENCY):
    return await notification_functions.search_user_notifications(search=search, db=db, user_id=user.id)
