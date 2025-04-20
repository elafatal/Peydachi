from fastapi import APIRouter
from functions import store_rating_functions
from dependencies.dependencies import DB_DEPENDENCY
from dependencies.access_dependencies import USER_DEPENDENCY
from schemas.store_rating_schemas import AddStoreRatingModel, StoreRatingDisplayModel


router = APIRouter(
    prefix='/store_rating',
    tags=['Store Rating']
)


@router.post('/rate_store', status_code=201, response_model=StoreRatingDisplayModel)
async def rate_store(rating: AddStoreRatingModel, db: DB_DEPENDENCY, user: USER_DEPENDENCY):
    return await store_rating_functions.rate_store(rating=rating, db=db, user_id=user.id)