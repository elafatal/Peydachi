from fastapi.exceptions import HTTPException
from fastapi import status



INTERNAL_ERROR = HTTPException(
    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
    detail='مشکلی در سرور داخلی پیش آمده است، لطفا پس از مدتی دوباره امتحان کنید یا در صورت نیاز با پشتیبانی تماس بگیرید.'
    )