from fastapi import APIRouter
from functions import add_store_request_functions
from dependencies.dependencies import DB_DEPENDENCY
from dependencies.access_dependencies import ROUTER_SUPER_ADMIN_DEPENDENCY


router = APIRouter(
    prefix='/super_admin/add_store_request',
    tags=['Super Admin Add Store Request'],
    dependencies=[ROUTER_SUPER_ADMIN_DEPENDENCY]
)


@router.delete('/remove_all_reviewed_add_store_requests', status_code=200)
async def remove_all_reviewed_add_store_requests(db: DB_DEPENDENCY):
    return await add_store_request_functions.remove_all_reviewed_add_store_requests(db=db)
