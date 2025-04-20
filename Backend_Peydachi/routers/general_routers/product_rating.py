from fastapi import APIRouter
from functions import store_rating_functions
from dependencies.dependencies import DB_DEPENDENCY
from dependencies.access_dependencies import USER_DEPENDENCY
from schemas.product_rating_schemas import ProductRatingDisplayModel, AddProductRatingModel


router = APIRouter(
    prefix='/product_rating',
    tags=['Product Rating']
)


@router.post('/rate_product', status_code=201, response_model=ProductRatingDisplayModel)
async def rate_product(rating: AddProductRatingModel, db: DB_DEPENDENCY, user: USER_DEPENDENCY):
    return await store_rating_functions.rate_product(rating=rating, db=db, user_id=user.id)