from schemas.base_schemas import BaseSchema


class PhoneVerifyCheckModel(BaseSchema):
    phone_number: str
    code: str

class ForgetPasswordVerifyCheck(BaseSchema):
    username: str
    code: str