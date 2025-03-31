from fastapi import APIRouter
from functions import product_functions
from dependencies.dependencies import DB_DEPENDENCY
from dependencies.access_dependencies import USER_DEPENDENCY
from dependencies.body_dependencies import NAME_BODY, ID_BODY
from schemas.product_schemas import ProductDisplay, ProductSearchModels


router = APIRouter(
    prefix='/product',
    tags=['Product']
)


@router.post('/get_product', status_code=200, response_model=ProductDisplay)
async def get_product(product_id: ID_BODY, db: DB_DEPENDENCY):
    return await product_functions.get_product_by_id(product_id=product_id, db=db)


@router.get('/get_all_products', status_code=200, response_model=list[ProductDisplay])
async def get_all_products(db: DB_DEPENDENCY):
    return await product_functions.get_all_products(db=db)


@router.post('/get_all_products_of_store', status_code=200, response_model=list[ProductDisplay])
async def get_all_products_of_store(store_id: ID_BODY, db: DB_DEPENDENCY):
    return await product_functions.get_all_products_of_store(store_id=store_id, db=db)


@router.post('/get_all_available_products_of_store', status_code=200, response_model=list[ProductDisplay])
async def get_all_available_products_of_store(store_id: ID_BODY, db: DB_DEPENDENCY):
    return await product_functions.get_all_available_products_of_store(store_id=store_id, db=db)


@router.post('/search_all_products', status_code=200, response_model=list[ProductDisplay])
async def search_all_products(name: NAME_BODY, db: DB_DEPENDENCY):
    return await product_functions.search_all_products(name=name, db=db)


@router.post('/search_all_products_of_store', status_code=200, response_model=list[ProductDisplay])
async def search_all_products_of_store(store_id: ID_BODY, name: NAME_BODY, db: DB_DEPENDENCY):
    return await product_functions.search_all_products_of_store(store_id=store_id, name=name, db=db)


@router.post('/search_all_available_products_of_store', status_code=200, response_model=list[ProductDisplay])
async def search_all_available_products_of_store(store_id: ID_BODY, name: NAME_BODY, db: DB_DEPENDENCY):
    return await product_functions.search_all_available_products_of_store(store_id=store_id, name=name, db=db)


@router.post('/search_all_products_of_city', status_code=200, response_model=list[ProductDisplay])
async def search_all_products_of_city(city_id: ID_BODY, name: NAME_BODY, db: DB_DEPENDENCY):
    return await product_functions.search_all_products_of_city(city_id=city_id, name=name, db=db)


@router.post('/search_all_available_products_of_city', status_code=200, response_model=list[ProductDisplay])
async def search_all_available_products_of_city(city_id: ID_BODY, name: NAME_BODY, db: DB_DEPENDENCY):
    return await product_functions.search_all_available_products_of_city(city_id=city_id, name=name, db=db)


@router.post('/search_near_products', status_code=200, response_model=list[ProductDisplay])
async def search_near_products(search: ProductSearchModels, db: DB_DEPENDENCY):
    return await product_functions.search_near_products(search=search, db=db)
