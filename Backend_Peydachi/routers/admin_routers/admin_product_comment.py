from fastapi import APIRouter
from functions import product_comment_functions
from dependencies.dependencies import DB_DEPENDENCY
from dependencies.body_dependencies import NAME_BODY, ID_BODY
from dependencies.access_dependencies import ROUTER_ADMIN_DEPENDENCY
from dependencies.limiter_dependencies import LIMIT_10_PER_MINUTE_DEPENDENCY
from schemas.product_comment_schemas import ProductCommentDisplay, FullProductCommentDisplay

router = APIRouter(
    prefix='/admin/product_comment',
    tags=['Admin Product Comment'],
    dependencies=[ROUTER_ADMIN_DEPENDENCY, LIMIT_10_PER_MINUTE_DEPENDENCY]
)


@router.delete('/admin_delete_product_comment', status_code=200)
async def admin_delete_product_comment(product_comment_id: ID_BODY, db: DB_DEPENDENCY):
    return await product_comment_functions.admin_delete_product_comment(product_comment_id=product_comment_id, db=db)


@router.delete('/delete_all_comments_of_product', status_code=200)
async def delete_all_comments_of_product(product_id: ID_BODY, db: DB_DEPENDENCY):
    return await product_comment_functions.delete_all_comments_of_product(product_id=product_id, db=db)


@router.post('/search_product_comments_of_product', status_code=200, response_model=list[ProductCommentDisplay])
async def search_product_comments_of_product(product_id: ID_BODY, search: NAME_BODY, db: DB_DEPENDENCY):
    return await product_comment_functions.search_product_comments_of_product(product_id=product_id, search=search, db=db)


@router.post('/search_in_all_product_comments', status_code=200, response_model=list[ProductCommentDisplay])
async def search_in_all_product_comments(search: NAME_BODY, db: DB_DEPENDENCY):
    return await product_comment_functions.search_in_all_product_comments(search=search, db=db)

@router.post('/get_user_product_comments', status_code=200, response_model=list[ProductCommentDisplay])
async def get_user_product_comments(user_id: ID_BODY, db: DB_DEPENDENCY):
    return await product_comment_functions.get_user_product_comments(user_id=user_id, db=db)


@router.post('/get_user_full_product_comments', status_code=200, response_model=list[FullProductCommentDisplay])
async def get_user_full_product_comments(user_id: ID_BODY, db: DB_DEPENDENCY):
    return await product_comment_functions.get_user_full_product_comments(user_id=user_id, db=db)