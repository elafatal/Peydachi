from fastapi import APIRouter
from functions import user_functions
from dependencies.dependencies import DB_DEPENDENCY
from dependencies.body_dependencies import NAME_BODY
from dependencies.access_dependencies import USER_DEPENDENCY
from schemas.user_schemas import UserDisplay, UserModel, UserUpdateModel


router = APIRouter(
    prefix='/user',
    tags=['User']
)


@router.post('/create_user', status_code=201, response_model=UserDisplay)
async def create_user(request: UserModel, db: DB_DEPENDENCY):
    return await user_functions.create_user(request=request, db=db)


@router.get('get_self_user_info', status_code=200, response_model=UserDisplay)
async def get_self_user_info(db: DB_DEPENDENCY, user: USER_DEPENDENCY):
    return await user_functions.get_user_by_id(user_id=user.id, db=db)


@router.put('/update_user', status_code=200, response_model=UserDisplay)
async def update_user(request: UserUpdateModel, db: DB_DEPENDENCY, user: USER_DEPENDENCY):
    return await user_functions.update_user(user_id=user.id, request=request, db=db)


@router.delete('/delete_user', status_code=200)
async def delete_user_self(db: DB_DEPENDENCY, user: USER_DEPENDENCY):
    return await user_functions.delete_user(user_id=user.id, db=db)


@router.post('/is_username_available', status_code=200)
async def is_username_available(username: NAME_BODY, db: DB_DEPENDENCY):
    return await user_functions.is_username_available(username=username, db=db)


