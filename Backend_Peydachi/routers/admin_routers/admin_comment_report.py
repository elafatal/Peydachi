from fastapi import APIRouter
from functions import comment_report_functions
from dependencies.dependencies import DB_DEPENDENCY
from dependencies.body_dependencies import NAME_BODY, ID_BODY
from dependencies.access_dependencies import ROUTER_ADMIN_DEPENDENCY
from schemas.comment_report_schemas import AddCommentReportModel, CommentReportDisplay


router = APIRouter(
    prefix='/admin/comment_report',
    tags=['Admin Comment Report'],
    dependencies=[ROUTER_ADMIN_DEPENDENCY]
)


@router.post('/get_comment_report_by_id', status_code=200, response_model=CommentReportDisplay)
async def get_comment_report_by_id(comment_report_id: ID_BODY, db: DB_DEPENDENCY):
    return await comment_report_functions.get_comment_report_by_id(comment_report_id=comment_report_id, db=db)


@router.get('/get_all_comment_reports', status_code=200, response_model=list[CommentReportDisplay])
async def get_all_comment_reports(db: DB_DEPENDENCY):
    return await comment_report_functions.get_all_comment_reports(db=db)


@router.post('/search_comment_reports', status_code=200, response_model=list[CommentReportDisplay])
async def search_comment_reports(report_text: NAME_BODY, db: DB_DEPENDENCY):
    return await comment_report_functions.search_comment_reports(report_text=report_text, db=db)


@router.post('/search_not_reviewed_comment_reports', status_code=200, response_model=list[CommentReportDisplay])
async def search_not_reviewed_comment_reports(report_text: NAME_BODY, db: DB_DEPENDENCY):
    return await comment_report_functions.search_not_reviewed_comment_reports(report_text=report_text, db=db)


@router.post('/search_reviewed_comment_reports', status_code=200, response_model=list[CommentReportDisplay])
async def search_reviewed_comment_reports(report_text: NAME_BODY, db: DB_DEPENDENCY):
    return await comment_report_functions.search_reviewed_comment_reports(report_text=report_text, db=db)


@router.get('/get_all_reviewed_comment_reports', status_code=200, response_model=list[CommentReportDisplay])
async def get_all_reviewed_comment_reports(db: DB_DEPENDENCY):
    return await comment_report_functions.get_all_reviewed_comment_reports(db=db)


@router.put('/review_comment_report', status_code=200, response_model=CommentReportDisplay)
async def review_comment_report(report_id: ID_BODY, db: DB_DEPENDENCY):
    return await comment_report_functions.review_comment_report(report_id=report_id, db=db)


@router.delete('/delete_comment_report', status_code=200)
async def delete_comment_report(report_id: ID_BODY, db: DB_DEPENDENCY):
    return await comment_report_functions.delete_comment_report(report_id=report_id, db=db)


@router.get('/get_comment_reports_to_review', status_code=200, response_model=list[CommentReportDisplay])
async def get_comment_reports_to_review(db: DB_DEPENDENCY):
    return await comment_report_functions.get_comment_reports_to_review(db=db)


@router.get('/get_all_store_comment_reports', status_code=200, response_model=list[CommentReportDisplay])
async def get_all_store_comment_reports(db: DB_DEPENDENCY):
    return await comment_report_functions.get_all_store_comment_reports(db=db)


@router.get('/get_all_store_comment_reports_to_review', status_code=200, response_model=list[CommentReportDisplay])
async def get_all_store_comment_reports_to_review(db: DB_DEPENDENCY):
    return await comment_report_functions.get_all_store_comment_reports_to_review(db=db)


@router.get('/get_all_product_comment_reports', status_code=200, response_model=list[CommentReportDisplay])
async def get_all_product_comment_reports(db: DB_DEPENDENCY):
    return await comment_report_functions.get_all_product_comment_reports(db=db)


@router.get('/get_all_product_comment_reports_to_review', status_code=200, response_model=list[CommentReportDisplay])
async def get_all_product_comment_reports_to_review(db: DB_DEPENDENCY):
    return await comment_report_functions.get_all_product_comment_reports_to_review(db=db)


@router.get('/get_all_reviewed_store_comment_reports', status_code=200, response_model=list[CommentReportDisplay])
async def get_all_reviewed_store_comment_reports(db: DB_DEPENDENCY):
    return await comment_report_functions.get_all_reviewed_store_comment_reports(db=db)


@router.get('/get_all_reviewed_product_comment_reports', status_code=200, response_model=list[CommentReportDisplay])
async def get_all_reviewed_product_comment_reports(db: DB_DEPENDENCY):
    return await comment_report_functions.get_all_reviewed_product_comment_reports(db=db)


@router.delete('/delete_all_reviewed_comment_reports', status_code=200)
async def delete_all_reviewed_comment_reports(db: DB_DEPENDENCY):
    return await comment_report_functions.delete_all_reviewed_comment_reports(db=db)