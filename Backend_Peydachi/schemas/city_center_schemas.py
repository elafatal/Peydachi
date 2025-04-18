from schemas.base_schemas import BaseSchema


class AddCityCenterModel(BaseSchema):
    city_id: int
    latitude: str
    longitude: str


class CityCenterDisplay(AddCityCenterModel):\
    id: int