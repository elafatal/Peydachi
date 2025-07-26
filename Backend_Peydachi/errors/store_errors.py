from fastapi.exceptions import HTTPException
from fastapi import status


STORE_NOT_FOUND_ERROR = HTTPException(
    status_code=status.HTTP_404_NOT_FOUND,
    detail='فروشگاه پیدا نشد.'
    )

NO_STORE_FOUND_ERROR = HTTPException(
    status_code=status.HTTP_404_NOT_FOUND,
    detail='هیچ فروشگاهی با این مشخصات پیدا نشد.'
    )

STORE_ALREADY_EXISTS_ERROR = HTTPException(
    status_code=status.HTTP_406_NOT_ACCEPTABLE,
    detail="فروشگاه وجود دارد."
    )

STORE_ACCESS_ERROR = HTTPException(
    status_code=status.HTTP_403_FORBIDDEN,
    detail='شما دسترسی تغییر اطلاعات فروشگاه دیگران را ندارید.'
    )


STORE_NAME_MUST_BE_LONGER_THAN_3_CHARACTERS_ERROR = HTTPException(
    status_code=status.HTTP_406_NOT_ACCEPTABLE,
    detail="نام فروشگاه باید بیشتر از ۳ کاراکتر باشد."
    )