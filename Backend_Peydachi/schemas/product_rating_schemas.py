from schemas.base_schemas import BaseSchema
from pydantic import Field


class AddProductRatingModel(BaseSchema):
    store_id: int
    rating: int = Field(gt=0, le=6)
    product_id: int


class ProductRatingDisplayModel(BaseSchema):
    store_id: int
    user_id: int
    rating: int
    product_id: int


class ProductRatingDistributionModel(BaseSchema):
    rating: int
    count: int

