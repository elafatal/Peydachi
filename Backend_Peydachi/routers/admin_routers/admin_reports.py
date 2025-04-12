from fastapi import APIRouter
from functions import report_functions
from dependencies.dependencies import DB_DEPENDENCY
from dependencies.body_dependencies import NAME_BODY, ID_BODY
from dependencies.access_dependencies import ROUTER_ADMIN_DEPENDENCY
from schemas.report_schemas import ReportDisplay


router = APIRouter(
    prefix='/admin/report',
    tags=['Admin Report'],
    dependencies=[ROUTER_ADMIN_DEPENDENCY]
)


@router.post('/get_report', status_code=200, response_model=ReportDisplay)
async def get_report(report_id: ID_BODY, db: DB_DEPENDENCY):
    return await report_functions.get_report_by_id(report_id=report_id, db=db)


@router.get('/get_reports_to_review', status_code=200, response_model=list[ReportDisplay])
async def get_reports_to_review(db: DB_DEPENDENCY):
    return await report_functions.get_reports_to_review(db=db)


@router.get('/get_all_reports', status_code=200, response_model=list[ReportDisplay])
async def get_all_reports(db: DB_DEPENDENCY):
    return await report_functions.get_all_reports(db=db)


@router.post('/search_reports', status_code=200, response_model=list[ReportDisplay])
async def search_reports(report_text: NAME_BODY, db: DB_DEPENDENCY):
    return await report_functions.search_reports(report_text=report_text, db=db)


@router.post('/search_reviewed_reports', status_code=200, response_model=list[ReportDisplay])
async def search_reviewed_reports(report_text: NAME_BODY, db: DB_DEPENDENCY):
    return await report_functions.search_reviewed_reports(report_text=report_text, db=db)


@router.post('/search_not_reviewed_reports', status_code=200, response_model=list[ReportDisplay])
async def search_not_reviewed_reports(report_text: NAME_BODY, db: DB_DEPENDENCY):
    return await report_functions.search_not_reviewed_reports(report_text=report_text, db=db)


@router.get('/get_all_reviewed_reports', status_code=200, response_model=list[ReportDisplay])
async def get_all_reviewed_reports(db: DB_DEPENDENCY):
    return await report_functions.get_all_reviewed_reports(db=db)


@router.post('/review_report', status_code=200, response_model=ReportDisplay)
async def review_report(report_id: ID_BODY, db: DB_DEPENDENCY):
    return await report_functions.review_report(report_id=report_id, db=db)


@router.delete('/delete_report', status_code=200)
async def delete_report(report_id: ID_BODY, db: DB_DEPENDENCY):
    return await report_functions.remove_report(report_id=report_id, db=db)