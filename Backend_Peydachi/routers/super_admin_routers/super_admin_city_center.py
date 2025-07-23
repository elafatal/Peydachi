from fastapi import APIRouter
from functions import city_center_functions
from dependencies.dependencies import DB_DEPENDENCY
from dependencies.body_dependencies import ID_BODY
from dependencies.access_dependencies import ROUTER_SUPER_ADMIN_DEPENDENCY
from schemas.city_center_schemas import AddCityCenterModel, CityCenterDisplay


router = APIRouter(
    prefix='/super_admin/city_center',
    tags=['Super Admin City Center'],
    dependencies=[ROUTER_SUPER_ADMIN_DEPENDENCY]
)


@router.post('/add_city_center', status_code=201, response_model=CityCenterDisplay)
async def add_city_center(city_center: AddCityCenterModel, db: DB_DEPENDENCY):
    return await city_center_functions.add_city_center(city_center=city_center, db=db)


@router.put('/update_city_center', status_code=200, response_model=CityCenterDisplay)
async def update_city_center(new_city_center: AddCityCenterModel, db: DB_DEPENDENCY):
    return await city_center_functions.update_city_center(new_city_center=new_city_center, db=db)


@router.delete('/delete_city_center', status_code=200)
async def delete_city_center(city_id: ID_BODY, db: DB_DEPENDENCY):
    return await city_center_functions.delete_city_center(city_id=city_id, db=db)