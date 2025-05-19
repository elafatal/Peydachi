from fastapi import APIRouter
from functions import city_functions
from dependencies.dependencies import DB_DEPENDENCY
from dependencies.body_dependencies import NAME_BODY, ID_BODY
from schemas.city_schemas import CityDisplay


router = APIRouter(
    prefix='/city',
    tags=['City']
)


@router.post('/get_city_by_id', status_code=200, response_model=CityDisplay)
async def get_city_by_id(city_id: ID_BODY, db: DB_DEPENDENCY):
    return await city_functions.get_city_by_id(cit_id=city_id, db=db)

@router.get('/get_all_cities', status_code=200, response_model=list[CityDisplay])
async def get_all_cities(db: DB_DEPENDENCY):
    return await city_functions.get_all_cities(db=db)


@router.post('/get_cities_of_region', status_code=200, response_model=list[CityDisplay])
async def get_all_cities_of_region(region_id: ID_BODY, db: DB_DEPENDENCY):
    return await city_functions.get_cities_of_region(region_id=region_id, db=db)


@router.post('/search_city_by_name', status_code=200, response_model=list[CityDisplay])
async def search_city_by_name(city_name: NAME_BODY, db: DB_DEPENDENCY):
    return await city_functions.search_city_by_name(city_name=city_name, db=db)


@router.post('/search_city_in_region', status_code=200, response_model=list[CityDisplay])
async def search_city_in_region(city_name: NAME_BODY, region_id: ID_BODY, db: DB_DEPENDENCY):
    return await city_functions.search_city_in_region(city_name=city_name, region_id=region_id, db=db)