from fastapi import APIRouter
from functions import store_rating_functions
from dependencies.dependencies import DB_DEPENDENCY
from dependencies.body_dependencies import NAME_BODY, ID_BODY
from dependencies.access_dependencies import ROUTER_ADMIN_DEPENDENCY



router = APIRouter(
    prefix='/admin/store_rating',
    tags=['Admin Store Rating'],
    dependencies=[ROUTER_ADMIN_DEPENDENCY]
)


@router.delete('/reset_all_ratings_of_store', status_code=200)
async def reset_all_ratings_of_store(store_id: ID_BODY, db: DB_DEPENDENCY):
    return await store_rating_functions.reset_all_ratings_of_store(store_id, db)