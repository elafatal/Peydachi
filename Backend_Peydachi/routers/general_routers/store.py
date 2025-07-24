from fastapi import APIRouter
from functions import store_functions
from dependencies.dependencies import DB_DEPENDENCY
from dependencies.body_dependencies import NAME_BODY, ID_BODY
from dependencies.limiter_dependencies import LIMIT_20_PER_MINUTE_DEPENDENCY
from schemas.store_schema import StoreDisplay


router = APIRouter(
    prefix='/store',
    tags=['Store'],
    dependencies=[LIMIT_20_PER_MINUTE_DEPENDENCY]
)


@router.get('/get_all_stores', status_code=200, response_model=list[StoreDisplay])
async def get_all_stores(db: DB_DEPENDENCY):
    return await store_functions.get_all_stores(db=db)


@router.post('/search_active_stores', status_code=200, response_model=list[StoreDisplay])
async def search_active_stores(name: NAME_BODY, db: DB_DEPENDENCY):
    return await store_functions.search_active_stores(name=name, db=db)


@router.post('/get_store_by_id', status_code=200, response_model=StoreDisplay)
async def get_store_by_id(store_id: ID_BODY, db: DB_DEPENDENCY):
    return await store_functions.get_store_by_id(store_id=store_id, db=db)


@router.post('/get_all_stores_of_city', status_code=200, response_model=list[StoreDisplay])
async def get_all_stores_of_city(city_id: ID_BODY, db: DB_DEPENDENCY):
    return await store_functions.get_all_stores_of_city(city_id=city_id, db=db)


@router.post('/search_all_stores_of_city', status_code=200, response_model=list[StoreDisplay])
async def search_all_stores_of_city(city_id: ID_BODY, name: NAME_BODY, db: DB_DEPENDENCY):
    return await store_functions.search_all_stores_of_city(city_id=city_id, name=name, db=db)