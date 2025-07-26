from fastapi.exceptions import HTTPException
from fastapi import status


PRODUCT_COMMENT_NOT_FOUND_ERROR = HTTPException(
    status_code=status.HTTP_404_NOT_FOUND,
    detail='کامنت محصول پیدا نشد.'
    )

NO_PRODUCT_COMMENT_FOUND_ERROR = HTTPException(
    status_code=status.HTTP_404_NOT_FOUND,
    detail='هیچ کامنت محصولی با این مشخصات پیدا نشد.'
    )

PRODUCT_COMMENT_ACCESS_ERROR = HTTPException(
    status_code=status.HTTP_403_FORBIDDEN,
    detail='دسترسی تغییر کامنت دیگر کابران را ندارید.'
    )


PRODUCT_COMMENT_MUST_BE_LONGER_THAN_3_CHARACTERS_ERROR = HTTPException(
    status_code=status.HTTP_406_NOT_ACCEPTABLE,
    detail="کامنت محصول باید بیشتر از ۳ کاراکتر باشد."
    )


PRODUCT_COMMENT_MUST_BE_SHORTER_THAN_500_CHARACTERS_ERROR = HTTPException(
    status_code=status.HTTP_406_NOT_ACCEPTABLE,
    detail="کامنت محصول حداکثر می‌تواند ۵۰۰ کاراکتر باشد"
    )