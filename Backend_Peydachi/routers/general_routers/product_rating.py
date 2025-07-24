from fastapi import APIRouter
from functions import product_rating_functions
from dependencies.dependencies import DB_DEPENDENCY
from dependencies.body_dependencies import ID_BODY
from dependencies.access_dependencies import USER_DEPENDENCY
from dependencies.limiter_dependencies import LIMIT_10_PER_MINUTE_DEPENDENCY
from schemas.product_rating_schemas import (
    ProductRatingDisplayModel,
    AddProductRatingModel,
    ProductRatingDistributionModel
)


router = APIRouter(
    prefix='/product_rating',
    tags=['Product Rating'],
    dependencies=[LIMIT_10_PER_MINUTE_DEPENDENCY]
)


@router.post('/rate_product', status_code=201, response_model=ProductRatingDisplayModel)
async def rate_product(rating: AddProductRatingModel, db: DB_DEPENDENCY, user: USER_DEPENDENCY):
    return await product_rating_functions.rate_product(rating=rating, db=db, user_id=user.id)


@router.post('/get_product_rating_distribution', status_code=200, response_model=list[ProductRatingDistributionModel])
async def get_product_rating_distribution(product_id: ID_BODY, db: DB_DEPENDENCY):
    return await product_rating_functions.get_product_rating_distribution(product_id=product_id, db=db)