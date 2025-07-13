from fastapi import APIRouter
from functions import store_comment_functions
from dependencies.dependencies import DB_DEPENDENCY
from dependencies.body_dependencies import NAME_BODY, ID_BODY
from dependencies.access_dependencies import ROUTER_ADMIN_DEPENDENCY
from schemas.store_comments_schemas import StoreCommentDisplay, FullStoreCommentDisplay



router = APIRouter(
    prefix='/admin/store_comment',
    tags=['Admin Store Comment'],
    dependencies=[ROUTER_ADMIN_DEPENDENCY]
)


@router.delete('/admin_remove_store_comment', status_code=200)
async def admin_remove_store_comment(store_comment_id: ID_BODY, db: DB_DEPENDENCY):
    return await store_comment_functions.admin_remove_store_comment(store_comment_id=store_comment_id, db=db)


@router.delete('/delete_all_comments_of_store', status_code=200)
async def delete_all_comments_of_store(store_id: ID_BODY, db: DB_DEPENDENCY):
    return await store_comment_functions.delete_all_comments_of_store(store_id=store_id, db=db)


@router.post('/search_store_comments_of_store', status_code=200, response_model=list[StoreCommentDisplay])
async def search_store_comments_of_store(store_id: ID_BODY, search: NAME_BODY, db: DB_DEPENDENCY):
    return await store_comment_functions.search_store_comments_of_store(store_id=store_id, search=search, db=db)


@router.post('/search_in_all_store_comments', status_code=200, response_model=list[StoreCommentDisplay])
async def search_in_all_store_comments(search: NAME_BODY, db: DB_DEPENDENCY):
    return await store_comment_functions.search_in_all_store_comments(search=search, db=db)


@router.post('/get_user_store_comments', status_code=200, response_model=list[StoreCommentDisplay])
async def get_user_store_comments(user_id: ID_BODY, db: DB_DEPENDENCY):
    return await store_comment_functions.get_user_store_comments(user_id=user_id, db=db)


@router.post('/get_user_full_store_comments', status_code=200, response_model=list[FullStoreCommentDisplay])
async def get_user_full_store_comments(user_id: ID_BODY, db: DB_DEPENDENCY):
    return await store_comment_functions.get_user_full_store_comments(user_id=user_id, db=db)