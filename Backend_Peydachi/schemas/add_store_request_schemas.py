import datetime
from schemas.base_schemas import BaseSchema


class AddAddStoreRequestModel(BaseSchema):
    store_name: str
    phone_number: str
    address: str
    region_id: int | None = None
    city_id: int | None = None
    description: str | None = None


class AddStoreRequestDisplay(AddAddStoreRequestModel):
    id: int
    date_added: datetime.datetime