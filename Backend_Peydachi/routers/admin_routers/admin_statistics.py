from fastapi import APIRouter
from functions import statistics_functions
from dependencies.dependencies import DB_DEPENDENCY
from dependencies.body_dependencies import NAME_BODY, ID_BODY
from dependencies.access_dependencies import ROUTER_ADMIN_DEPENDENCY
from schemas.statistics_schemas import StatisticsDisplay


router = APIRouter(
    prefix='/admin/statistics',
    tags=['Admin Statistics'],
    dependencies=[ROUTER_ADMIN_DEPENDENCY]
)


@router.get('/get_general_stats', status_code=200, response_model=StatisticsDisplay)
async def get_general_stats(db: DB_DEPENDENCY):
    return await statistics_functions.get_general_stats(db=db)