from fastapi import APIRouter
from functions import statistics_functions
from dependencies.dependencies import DB_DEPENDENCY
from dependencies.body_dependencies import NAME_BODY, ID_BODY
from dependencies.access_dependencies import ROUTER_ADMIN_DEPENDENCY
from schemas.statistics_schemas import (
    GeneralStatisticsDisplay,
    AddStoreRequestStatisticsDisplay,
    PendingReviewStatisticsDisplay
)


router = APIRouter(
    prefix='/admin/statistics',
    tags=['Admin Statistics'],
    dependencies=[ROUTER_ADMIN_DEPENDENCY]
)


@router.get('/get_general_stats', status_code=200, response_model=GeneralStatisticsDisplay)
async def get_general_stats(db: DB_DEPENDENCY):
    return await statistics_functions.get_general_stats(db=db)


@router.get('/get_add_store_request_stats', status_code=200, response_model=AddStoreRequestStatisticsDisplay)
async def get_add_store_request_stats(db: DB_DEPENDENCY):
    return await statistics_functions.get_add_store_request_stats(db=db)


@router.get('/get_pending_review_stats', status_code=200, response_model=PendingReviewStatisticsDisplay)
async def get_pending_review_stats(db: DB_DEPENDENCY):
    return await statistics_functions.get_pending_review_stats(db=db)