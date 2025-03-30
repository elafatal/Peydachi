from fastapi import APIRouter
from functions import comment_report_functions
from dependencies.dependencies import DB_DEPENDENCY
from schemas.comment_report_schemas import AddCommentReportModel, CommentReportDisplay


router = APIRouter(
    prefix='/comment_report',
    tags=['Comment Report']
)


@router.post('/send_comment_report', status_code=201, response_model=CommentReportDisplay)
async def send_comment_report(request: AddCommentReportModel, db: DB_DEPENDENCY):
    return await comment_report_functions.send_comment_report(request=request, db=db)