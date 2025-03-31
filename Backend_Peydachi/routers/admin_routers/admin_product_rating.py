from fastapi import APIRouter
from functions import product_rating_functions
from dependencies.dependencies import DB_DEPENDENCY
from dependencies.body_dependencies import NAME_BODY, ID_BODY
from dependencies.access_dependencies import ROUTER_ADMIN_DEPENDENCY



router = APIRouter(
    prefix='/admin/product_rating',
    tags=['Admin Product Rating'],
    dependencies=[ROUTER_ADMIN_DEPENDENCY]
)


@router.delete('/reset_product_rating', status_code=200)
async def reset_product_rating(product_id: ID_BODY, db: DB_DEPENDENCY):
    return await product_rating_functions.reset_product_rating(product_id=product_id, db=db)