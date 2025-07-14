from fastapi import APIRouter
from functions import statistics_functions
from dependencies.dependencies import DB_DEPENDENCY
from dependencies.body_dependencies import NAME_BODY, ID_BODY
from dependencies.access_dependencies import ROUTER_ADMIN_DEPENDENCY
from schemas.statistics_schemas import (
    GeneralStatisticsDisplay,
    AddStoreRequestAndReportStatisticsDisplay,
    PendingReviewStatisticsDisplay,
    StoreDistributionByCity,
    StoreDistributionByRegion,
    TopRaterDisplay,
    TopCommenterDisplay,
    AllDashboardStatisticsDisplay
)


router = APIRouter(
    prefix='/admin/statistics',
    tags=['Admin Statistics'],
    dependencies=[ROUTER_ADMIN_DEPENDENCY]
)


@router.get('/get_general_stats', status_code=200, response_model=GeneralStatisticsDisplay)
async def get_general_stats(db: DB_DEPENDENCY):
    return await statistics_functions.get_general_stats(db=db)


@router.get('/get_add_store_request_and_report_stats', status_code=200, response_model=AddStoreRequestAndReportStatisticsDisplay)
async def get_add_store_request_and_report_stats(db: DB_DEPENDENCY):
    return await statistics_functions.get_add_store_request_and_report_stats(db=db)


@router.get('/get_pending_review_stats', status_code=200, response_model=PendingReviewStatisticsDisplay)
async def get_pending_review_stats(db: DB_DEPENDENCY):
    return await statistics_functions.get_pending_review_stats(db=db)


@router.get('/get_store_distribution_by_city', status_code=200, response_model=list[StoreDistributionByCity])
async def get_store_distribution_by_city(db: DB_DEPENDENCY):
    return await statistics_functions.get_store_distribution_by_city(db=db)


@router.get('/get_store_distribution_by_region', status_code=200, response_model=list[StoreDistributionByRegion])
async def get_store_distribution_by_region(db: DB_DEPENDENCY):
    return await statistics_functions.get_store_distribution_by_region(db=db)


@router.get('/get_top_commenters', status_code=200, response_model=list[TopCommenterDisplay])
async def get_top_commenters(db: DB_DEPENDENCY):
    return await statistics_functions.get_top_commenters(db=db)


@router.get('/get_top_raters', status_code=200, response_model=list[TopRaterDisplay])
async def get_top_raters(db: DB_DEPENDENCY):
    return await statistics_functions.get_top_raters(db=db)


@router.get('/get_all_dashboard_stats', status_code=200, response_model=AllDashboardStatisticsDisplay)
async def get_all_dashboard_stats(db: DB_DEPENDENCY):
    return await statistics_functions.get_all_dashboard_stats(db=db)