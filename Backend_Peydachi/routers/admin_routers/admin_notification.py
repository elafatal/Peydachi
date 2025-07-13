from fastapi import APIRouter
from functions import notification_functions
from dependencies.dependencies import DB_DEPENDENCY
from dependencies.body_dependencies import NAME_BODY, ID_BODY, ID_BODY_OR_NONE
from dependencies.access_dependencies import ROUTER_ADMIN_DEPENDENCY, ADMIN_DEPENDENCY
from schemas.notification_schemas import SendNotificationModel, AdminNotificationDisplay


router = APIRouter(
    prefix='/admin/notification',
    tags=['Admin Notification'],
    dependencies=[ROUTER_ADMIN_DEPENDENCY]
)


@router.post('/admin_send_notification', status_code=201, response_model=AdminNotificationDisplay)
async def admin_send_notification(notif_info: SendNotificationModel, db: DB_DEPENDENCY, admin: ADMIN_DEPENDENCY):
    return await notification_functions.admin_send_notification(notif_info=notif_info, db=db, admin_id=admin.id)


@router.get('/get_sent_notifications_of_admin', status_code=200, response_model=list[AdminNotificationDisplay])
async def get_sent_notifications_of_admin(db: DB_DEPENDENCY, admin: ADMIN_DEPENDENCY):
    return await notification_functions.get_sent_notifications_of_admin(db=db, admin_id=admin.id)


@router.post('/get_last_n_sent_notifications_of_admin', status_code=200, response_model=list[AdminNotificationDisplay])
async def get_last_n_sent_notifications_of_admin(n: ID_BODY_OR_NONE, db: DB_DEPENDENCY, admin: ADMIN_DEPENDENCY):
    return await notification_functions.get_last_n_sent_notifications_of_admin(db=db, admin_id=admin.id, n=n)


@router.get('/get_all_sent_notifications', status_code=200, response_model=list[AdminNotificationDisplay])
async def get_all_sent_notifications(db: DB_DEPENDENCY):
    return await notification_functions.get_all_sent_notifications(db=db)


@router.post('/get_last_n_sent_notifications', status_code=200, response_model=list[AdminNotificationDisplay])
async def get_last_n_sent_notifications(n: ID_BODY_OR_NONE, db: DB_DEPENDENCY):
    return await notification_functions.get_last_n_sent_notifications(db=db, n=n)


@router.get('/get_all_seen_notifications', status_code=200, response_model=list[AdminNotificationDisplay])
async def get_all_seen_notifications(db: DB_DEPENDENCY):
    return await notification_functions.get_all_seen_notifications(db=db)


@router.post('/get_last_n_seen_notifications', status_code=200, response_model=list[AdminNotificationDisplay])
async def get_last_n_seen_notifications(n: ID_BODY_OR_NONE, db: DB_DEPENDENCY):
    return await notification_functions.get_last_n_seen_notifications(db=db, n=n)


@router.get('/get_all_unseen_notifications', status_code=200, response_model=list[AdminNotificationDisplay])
async def get_all_unseen_notifications(db: DB_DEPENDENCY):
    return await notification_functions.get_all_unseen_notifications(db=db)


@router.post('/get_last_n_unseen_notifications', status_code=200, response_model=list[AdminNotificationDisplay])
async def get_last_n_unseen_notifications(n: ID_BODY_OR_NONE, db: DB_DEPENDENCY):
    return await notification_functions.get_last_n_unseen_notifications(db=db, n=n)


@router.post('/get_notification_by_id', status_code=200, response_model=AdminNotificationDisplay)
async def get_notification_by_id(notif_id: ID_BODY, db: DB_DEPENDENCY):
    return await notification_functions.get_notification_by_id(notif_id=notif_id, db=db)


@router.post('/get_all_user_notifications', status_code=200, response_model=list[AdminNotificationDisplay])
async def get_all_user_notifications(user_id: ID_BODY, db: DB_DEPENDENCY):
    return await notification_functions.get_all_user_notifications(user_id=user_id, db=db)


@router.post('/get_all_user_unread_notifications', status_code=200, response_model=list[AdminNotificationDisplay])
async def get_all_user_unread_notifications(user_id: ID_BODY, db: DB_DEPENDENCY):
    return await notification_functions.get_all_user_unread_notifications(user_id=user_id, db=db)


@router.post('/get_all_user_seen_notifications', status_code=200, response_model=list[AdminNotificationDisplay])
async def get_all_user_seen_notifications(user_id: ID_BODY, db: DB_DEPENDENCY):
    return await notification_functions.get_all_user_seen_notifications(user_id=user_id, db=db)


@router.post('/search_notifications', status_code=200, response_model=list[AdminNotificationDisplay])
async def search_notifications(search: NAME_BODY, db: DB_DEPENDENCY):
    return await notification_functions.search_notifications(search=search, db=db)


@router.post('/search_unseen_notifications', status_code=200, response_model=list[AdminNotificationDisplay])
async def search_unseen_notifications(search: NAME_BODY, db: DB_DEPENDENCY):
    return await notification_functions.search_unseen_notifications(search=search, db=db)


@router.post('/search_seen_notifications', status_code=200, response_model=list[AdminNotificationDisplay])
async def search_seen_notifications(search: NAME_BODY, db: DB_DEPENDENCY):
    return await notification_functions.search_seen_notifications(search=search, db=db)


@router.post('/search_user_notifications', status_code=200, response_model=list[AdminNotificationDisplay])
async def search_user_notifications(user_id: ID_BODY, search: NAME_BODY, db: DB_DEPENDENCY):
    return await notification_functions.search_user_notifications(user_id=user_id, search=search, db=db)


@router.delete('/delete_notification', status_code=200)
async def delete_notification(notification_id: ID_BODY, db: DB_DEPENDENCY):
    return await notification_functions.delete_notification(notification_id=notification_id, db=db)


@router.delete('/delete_all_user_notifications', status_code=200)
async def delete_all_user_notifications(user_id: ID_BODY, db: DB_DEPENDENCY):
    return await notification_functions.delete_all_user_notifications(user_id=user_id, db=db)


