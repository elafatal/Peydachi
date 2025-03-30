from schemas.base_schemas import BaseSchema


class CityModel(BaseSchema):
    name: str
    region_id: int


class CityDisplay(BaseSchema):
    id: int
    region_id: int
    name: str


class CityUpdateModel(BaseSchema):
    id: int
    region_id: int | None = None
    name: str | None = None
