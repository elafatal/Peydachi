from schemas.base_schemas import BaseSchema


class DeletedPicsDisplay(BaseSchema):
    id: int
    name: str
    is_reviewed: bool