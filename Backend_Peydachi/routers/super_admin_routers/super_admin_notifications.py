from fastapi import APIRouter
from functions import notification_functions
from dependencies.dependencies import DB_DEPENDENCY
from dependencies.access_dependencies import ROUTER_SUPER_ADMIN_DEPENDENCY


router = APIRouter(
    prefix='/super_admin/notification',
    tags=['Super Admin Notification'],
    dependencies=[ROUTER_SUPER_ADMIN_DEPENDENCY]
)


@router.delete('/delete_all_seen_notifications', status_code=200)
async def delete_all_seen_notifications(db: DB_DEPENDENCY):
    return await notification_functions.delete_all_seen_notifications(db=db)