from fastapi import APIRouter
from functions import report_functions
from dependencies.dependencies import DB_DEPENDENCY
from dependencies.access_dependencies import ROUTER_SUPER_ADMIN_DEPENDENCY

router = APIRouter(
    prefix='/super_admin/report',
    tags=['Super Admin Report'],
    dependencies=[ROUTER_SUPER_ADMIN_DEPENDENCY]
)


@router.delete('/delete_all_reviewed_reports', status_code=200)
async def delete_all_reviewed_reports(db: DB_DEPENDENCY):
    return await report_functions.delete_all_reviewed_reports(db)

