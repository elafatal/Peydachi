from fastapi import APIRouter
from functions import region_functions
from dependencies.dependencies import DB_DEPENDENCY
from dependencies.access_dependencies import USER_DEPENDENCY
from dependencies.body_dependencies import NAME_BODY
from schemas.region_schemas import RegionDisplay


router = APIRouter(
    prefix='/region',
    tags=['Region']
)


@router.get('/get_region_by_id', response_model=RegionDisplay)
async def get_region_by_id(id: int, db: DB_DEPENDENCY):
    return await region_functions.get_region_by_id(id, db)


@router.get('/get_all_regions', response_model=list[RegionDisplay])
async def get_all_regions(db: DB_DEPENDENCY):
    return await region_functions.get_all_regions(db)


@router.post('/search_region_by_name', response_model=list[RegionDisplay])
async def search_region_by_name(region_name: NAME_BODY, db: DB_DEPENDENCY):
    return await region_functions.search_region_by_name(region_name=region_name, db=db)


