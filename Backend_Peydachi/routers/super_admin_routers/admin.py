from fastapi import APIRouter
from schemas.user_schemas import UserDisplay, UserModel
from functions import admin_functions
from dependencies.dependencies import DB_DEPENDENCY
from dependencies.body_dependencies import ID_BODY
from dependencies.access_dependencies import ROUTER_SUPER_ADMIN_DEPENDENCY


router = APIRouter(
    prefix='/super_admin/admin',
    tags=['Super Admin Admin'],
    dependencies=[ROUTER_SUPER_ADMIN_DEPENDENCY]
)


@router.post('/create_admin', status_code=201, response_model=UserDisplay)
async def create_admin(request: UserModel, db: DB_DEPENDENCY):
    return await admin_functions.create_admin(request=request, db=db)


@router.delete('/delete_user', status_code=200)
async def delete_user(user_id: ID_BODY, db: DB_DEPENDENCY):
    return await admin_functions.delete_user_admin(user_id=user_id, db=db)


@router.put('/promote_user_to_admin', status_code=200, response_model=UserDisplay)
async def promote_user_to_admin(user_id: ID_BODY, db: DB_DEPENDENCY):
    return await admin_functions.promote_user_to_admin(user_id=user_id, db=db)
