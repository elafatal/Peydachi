from fastapi import APIRouter
from functions import report_functions
from dependencies.dependencies import DB_DEPENDENCY
from dependencies.limiter_dependencies import LIMIT_10_PER_2MIN_DEPENDENCY
from schemas.report_schemas import ReportDisplay, AddReportModel


router = APIRouter(
    prefix='/report',
    tags=['Report'],
    dependencies=[LIMIT_10_PER_2MIN_DEPENDENCY]
)


@router.post('/send_report', status_code=201, response_model=ReportDisplay)
async def send_report(request: AddReportModel, db: DB_DEPENDENCY):
    return await report_functions.send_report(request=request, db=db)
