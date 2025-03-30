from fastapi import APIRouter
from functions import store_functions
from dependencies.dependencies import DB_DEPENDENCY
from dependencies.body_dependencies import NAME_BODY, ID_BODY
from dependencies.access_dependencies import ROUTER_SELLER_DEPENDENCY, SELLER_DEPENDENCY
from schemas.store_schema import StoreModel, StoreDisplay


router = APIRouter(
    prefix='/seller/store',
    tags=['Seller Store'],
)


@router.put('/update_store_info', status_code=200, response_model=StoreDisplay)
async def update_store_info(request: StoreModel, db: DB_DEPENDENCY, seller: SELLER_DEPENDENCY):
    return await store_functions.update_store_info(user_id=seller.id, request=request, db=db)


@router.post('/get_self_store', status_code=200, response_model=StoreDisplay)
async def get_self_store(db: DB_DEPENDENCY, seller: SELLER_DEPENDENCY):
    return await store_functions.get_self_store(user_id=seller.id, db=db)


@router.delete('/delete_store', status_code=200)
async def delete_store(db: DB_DEPENDENCY, seller: SELLER_DEPENDENCY):
    return await store_functions.delete_store(user_id=seller.id, db=db)


@router.post('/search_in_banned_stores', status_code=200, response_model=list[StoreDisplay])
async def search_in_banned_stores(name: NAME_BODY, db: DB_DEPENDENCY, seller: SELLER_DEPENDENCY):
    return await store_functions.search_in_banned_stores(name=name, db=db)