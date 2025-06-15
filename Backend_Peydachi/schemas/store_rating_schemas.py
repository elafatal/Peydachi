from schemas.base_schemas import BaseSchema
from pydantic import Field


class AddStoreRatingModel(BaseSchema):
    store_id: int
    rating: int = Field(gt=0, le=6)


class StoreRatingDisplayModel(BaseSchema):
    store_id: int
    user_id: int
    rating: int


class StoreRatingDistributionModel(BaseSchema):
    rating: int
    count: int

