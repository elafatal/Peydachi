from fastapi.exceptions import HTTPException
from fastapi import status


STORE_COMMENT_NOT_FOUND_ERROR = HTTPException(
    status_code=status.HTTP_404_NOT_FOUND,
    detail='کامنت فروشگاه پیدا نشد.'
    )

NO_STORE_COMMENT_FOUND_ERROR = HTTPException(
    status_code=status.HTTP_404_NOT_FOUND,
    detail='هیچ کامنت فروشگاهی با این مشخصات پیدا نشد.'
    )


STORE_COMMENT_ACCESS_ERROR = HTTPException(
    status_code=status.HTTP_403_FORBIDDEN,
    detail='دسترسی تغییر کامنت دیگر کابران را ندارید.'
    )


STORE_COMMENT_MUST_BE_LONGER_THAN_3_CHARACTERS_ERROR = HTTPException(
    status_code=status.HTTP_406_NOT_ACCEPTABLE,
    detail="کامنت فروشگاه باید بیشتر از ۳ کاراکتر باشد."
    )

STORE_COMMENT_MUST_BE_SHORTER_THAN_500_CHARACTERS_ERROR = HTTPException(
    status_code=status.HTTP_406_NOT_ACCEPTABLE,
    detail="کامنت فروشگاه حداکثر میتواند ۵۰۰ کاراکتر باشد."
    )