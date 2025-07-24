from fastapi import APIRouter
from functions import product_functions
from dependencies.dependencies import DB_DEPENDENCY
from dependencies.body_dependencies import ID_BODY
from dependencies.access_dependencies import ROUTER_ADMIN_DEPENDENCY
from dependencies.limiter_dependencies import LIMIT_10_PER_2MIN_DEPENDENCY


router = APIRouter(
    prefix='/admin/product',
    tags=['Admin Product'],
    dependencies=[ROUTER_ADMIN_DEPENDENCY, LIMIT_10_PER_2MIN_DEPENDENCY]
)


@router.delete('/delete_product_admin', status_code=200)
async def delete_product_admin(product_id: ID_BODY, db: DB_DEPENDENCY):
    return await product_functions.delete_product_admin(product_id=product_id, db=db)
