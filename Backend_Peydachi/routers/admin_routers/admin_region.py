from fastapi import APIRouter
from functions import region_functions
from dependencies.dependencies import DB_DEPENDENCY
from dependencies.access_dependencies import ROUTER_ADMIN_DEPENDENCY
from schemas.region_schemas import RegionDisplay


router = APIRouter(
    prefix='/admin/region',
    tags=['Admin Region'],
    dependencies=[ROUTER_ADMIN_DEPENDENCY]
)


@router.post('/add_region', response_model=RegionDisplay)
async def add_region(name: str, db: DB_DEPENDENCY):
    return await region_functions.add_region(name, db)


@router.put('/update_region/{id}', response_model=RegionDisplay)
async def update_region(id: int, name: str, db: DB_DEPENDENCY):
    return await region_functions.update_region(id, name, db)


@router.delete('/delete_region/{id}')
async def delete_region(id: int, db: DB_DEPENDENCY):
    return await region_functions.delete_region(id, db)
