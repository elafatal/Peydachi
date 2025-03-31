import datetime
from schemas.base_schemas import BaseSchema


class ProductModel(BaseSchema):
    name: str
    description: str | None = None
    quantity: int | None = None


class UpdateProductModel(BaseSchema):
    id: int
    name: str | None = None
    description: str | None = None


class ProductDisplay(BaseSchema):
    id: int
    name: str
    description: str | None = None
    quantity: int | None = None
    date_added: datetime.datetime
    city_id: int
    pic_url: str | None = None
    average_rating: float | None = None


class ProductSearchModels(BaseSchema):
    name: str
    city_id: int
    location_latitude: str
    location_longitude: str