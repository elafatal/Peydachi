from fastapi import APIRouter
from schemas.deleted_pics_schemas import DeletedPicsDisplay
from functions import deleted_picture_functions
from dependencies.dependencies import DB_DEPENDENCY
from dependencies.body_dependencies import ID_BODY
from dependencies.access_dependencies import ROUTER_SUPER_ADMIN_DEPENDENCY


router = APIRouter(
    prefix='/super_admin',
    tags=['Super Admin Deleted Pictures'],
    dependencies=[ROUTER_SUPER_ADMIN_DEPENDENCY]
)


@router.get('/deleted_pics', status_code=200, response_model=list[DeletedPicsDisplay])
async def get_deleted_pics(db: DB_DEPENDENCY):
    return await deleted_picture_functions.get_deleted_pics(db=db)


@router.get('/all_deleted_pics', status_code=200, response_model=list[DeletedPicsDisplay])
async def get_all_deleted_pics(db: DB_DEPENDENCY):
    return await deleted_picture_functions.get_all_deleted_pics(db=db)


@router.put('/review_deleted_pic', status_code=200, response_model=DeletedPicsDisplay)
async def review_deleted_pic(deleted_pic_id: ID_BODY, db: DB_DEPENDENCY):
    return await deleted_picture_functions.review_deleted_pic(deleted_pic_id=deleted_pic_id, db=db)


@router.delete('/delete_all_reviewed_deleted_pics', status_code=200)
async def delete_all_reviewed_deleted_pics(db: DB_DEPENDENCY):
    return await deleted_picture_functions.delete_all_reviewed_deleted_pics(db=db)
