from base_schemas import BaseSchema


class UserAuth(BaseSchema):
    id: int
    username: str
    phone_number: str | None = None