from schemas.base_schemas import BaseSchema
from pydantic import EmailStr, field_validator



class UserModel(BaseSchema):
    username: str
    password: str
    phone_number: str | None = None
    email: EmailStr | None = None


    @field_validator("email", mode="before")
    @classmethod
    def normalize_empty_email(cls, value):
        if value == "":
            return None
        return value



class UserDisplay(BaseSchema):
    id: int
    username: str
    phone_number: str | None = None
    email: EmailStr | None = None
    is_seller: bool
    is_admin: bool
    is_super_admin: bool
    is_banned: bool


class UserUpdateModel(BaseSchema):
    username: str | None = None
    password: str | None = None
    phone_number: str | None = None
    email: EmailStr | None = None


class UserAuth(BaseSchema):
    id: int
    username: str
    phone_number: str | None = None