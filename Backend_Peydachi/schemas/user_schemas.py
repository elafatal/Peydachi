from schemas.base_schemas import BaseSchema
from pydantic import EmailStr



class UserModel(BaseSchema):
    username: str
    password: str
    phone_number: str | None = None
    email: EmailStr | None = None



class UserDisplay(BaseSchema):
    id: int
    username: str
    phone_number: str | None = None
    email: EmailStr | None = None
    is_seller: bool
    is_admin: bool
    is_super_admin: bool
    is_banned: bool


class UserAuth(BaseSchema):
    id: int
    username: str
    phone_number: str | None = None