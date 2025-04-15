from fastapi import APIRouter
from functions import store_functions
from dependencies.dependencies import DB_DEPENDENCY
from dependencies.body_dependencies import NAME_BODY, ID_BODY
from dependencies.access_dependencies import ROUTER_ADMIN_DEPENDENCY
from schemas.store_schema import StoreModel, StoreDisplay


router = APIRouter(
    prefix='/admin/store',
    tags=['Admin Store'],
    dependencies=[ROUTER_ADMIN_DEPENDENCY]
)


@router.post('/create_store', status_code=201, response_model=StoreDisplay)
async def create_store(request: StoreModel, db: DB_DEPENDENCY):
    return await store_functions.create_store(request=request, db=db)


@router.put('/add_owner_to_store', status_code=200, response_model=StoreDisplay)
async def add_owner_to_store(store_id: ID_BODY, user_id: ID_BODY, db: DB_DEPENDENCY):
    return await store_functions.add_owner_to_store(store_id=store_id, user_id=user_id, db=db)


@router.delete('/delete_store', status_code=200)
async def delete_store_admin(store_id: ID_BODY, db: DB_DEPENDENCY):
    return await store_functions.delete_store_admin(store_id=store_id, db=db)


@router.put('/ban_store', status_code=200, response_model=StoreDisplay)
async def ban_store(store_id: ID_BODY, db: DB_DEPENDENCY):
    return await store_functions.ban_store(store_id=store_id, db=db)


@router.put('/unban_store', status_code=200, response_model=StoreDisplay)
async def unban_store(store_id: ID_BODY, db: DB_DEPENDENCY):
    return await store_functions.unban_store(store_id=store_id, db=db)


@router.get('/get_all_banned_stores', status_code=200, response_model=list[StoreDisplay])
async def get_all_banned_stores(db: DB_DEPENDENCY):
    return await store_functions.get_all_banned_stores(db=db)


@router.put('/promote_user_to_seller', status_code=200)
async def promote_user_to_seller(user_id: ID_BODY, db: DB_DEPENDENCY):
    return await store_functions.promote_user_to_seller(user_id=user_id, db=db)


@router.post('/search_in_banned_stores', status_code=200, response_model=list[StoreDisplay])
async def search_in_banned_stores(name: NAME_BODY, db: DB_DEPENDENCY):
    return await store_functions.search_in_banned_stores(name=name, db=db)