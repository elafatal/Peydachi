from fastapi import APIRouter
from functions import city_functions
from dependencies.dependencies import DB_DEPENDENCY
from dependencies.body_dependencies import ID_BODY
from dependencies.access_dependencies import ROUTER_SUPER_ADMIN_DEPENDENCY
from schemas.city_schemas import CityDisplay, CityModel, CityUpdateModel


router = APIRouter(
    prefix='/super_admin/city',
    tags=['Super Admin City'],
    dependencies=[ROUTER_SUPER_ADMIN_DEPENDENCY]
)


@router.post('/add_city', status_code=201, response_model=CityDisplay)
async def add_city(info: CityModel, db: DB_DEPENDENCY):
    return await city_functions.add_city(info=info, db=db)


@router.put('/update_city', status_code=200, response_model=CityDisplay)
async def update_city(info: CityUpdateModel, db: DB_DEPENDENCY):
    return await city_functions.update_city(info=info, db=db)


@router.delete('/delete_city', status_code=200)
async def delete_city(city_id: ID_BODY, db: DB_DEPENDENCY):
    return await city_functions.delete_city(city_id=city_id, db=db)
