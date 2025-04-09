from typing import Annotated
from fastapi import APIRouter, Body
from schemas.user_schemas import UserDisplay, UserModel
from functions import super_admin_functions
from dependencies.dependencies import DB_DEPENDENCY
from dependencies.access_dependencies import ROUTER_SUPER_ADMIN_DEPENDENCY


router = APIRouter(
    prefix='/super_admin',
    tags=['Super Admin']
)


@router.post('/add_super_admin', status_code=201, response_model=UserDisplay)
async def add_super_admin(request: UserModel, db: DB_DEPENDENCY):
    return await super_admin_functions.create_super_admin(request=request, db=db)