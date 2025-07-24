from fastapi import APIRouter
from functions import city_center_functions
from dependencies.dependencies import DB_DEPENDENCY
from dependencies.body_dependencies import ID_BODY
from dependencies.limiter_dependencies import LIMIT_10_PER_MINUTE_DEPENDENCY
from schemas.city_center_schemas import CityCenterDisplay


router = APIRouter(
    prefix='/city_center',
    tags=['City Center'],
    dependencies=[LIMIT_10_PER_MINUTE_DEPENDENCY]
)


@router.post('/get_center_of_city', status_code=200, response_model=CityCenterDisplay)
async def get_center_of_city(city_id: ID_BODY, db: DB_DEPENDENCY):
    return await city_center_functions.get_center_of_city(city_id=city_id, db=db)


@router.post('/get_city_centers_of_region', status_code=200, response_model=list[CityCenterDisplay])
async def get_city_centers_of_region(region_id: ID_BODY, db: DB_DEPENDENCY):
    return await city_center_functions.get_city_centers_of_region(region_id=region_id, db=db)