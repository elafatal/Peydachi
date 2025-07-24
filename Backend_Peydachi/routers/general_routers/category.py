from fastapi import APIRouter
from functions import category_functions
from dependencies.dependencies import DB_DEPENDENCY
from dependencies.body_dependencies import NAME_BODY, ID_BODY
from dependencies.limiter_dependencies import LIMIT_10_PER_MINUTE_DEPENDENCY
from schemas.category_schema import CategoryDisplay


router = APIRouter(
    prefix='/category',
    tags=['Category'],
    dependencies=[LIMIT_10_PER_MINUTE_DEPENDENCY]
)


@router.post('/search_category', status_code=200, response_model=list[CategoryDisplay])
async def search_category(name: NAME_BODY, db: DB_DEPENDENCY):
    return await category_functions.search_category(name=name, db=db)


@router.post('/get_all_categories_of_store', status_code=200, response_model=list[CategoryDisplay])
async def get_all_categories_of_store(store_id: ID_BODY, db: DB_DEPENDENCY):
    return await category_functions.get_all_categories_of_store(store_id=store_id, db=db)