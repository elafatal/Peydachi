from fastapi import APIRouter
from functions import region_functions
from dependencies.dependencies import DB_DEPENDENCY
from dependencies.body_dependencies import NAME_BODY, ID_BODY
from dependencies.access_dependencies import ROUTER_SUPER_ADMIN_DEPENDENCY
from schemas.region_schemas import RegionDisplay


router = APIRouter(
    prefix='/super_admin/region',
    tags=['Super Admin Region'],
    dependencies=[ROUTER_SUPER_ADMIN_DEPENDENCY]
)


@router.post('/add_region', response_model=RegionDisplay)
async def add_region(name: NAME_BODY, db: DB_DEPENDENCY):
    return await region_functions.add_region(name, db)


@router.put('/update_region', response_model=RegionDisplay)
async def update_region(id: ID_BODY, name: NAME_BODY, db: DB_DEPENDENCY):
    return await region_functions.update_region(id, name, db)


@router.delete('/delete_region')
async def delete_region(id: ID_BODY, db: DB_DEPENDENCY):
    return await region_functions.delete_region(id, db)
