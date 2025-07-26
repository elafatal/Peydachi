from fastapi.exceptions import HTTPException
from fastapi import status

PRODUCT_RATING_NOT_FOUND_ERROR = HTTPException(
    status_code=status.HTTP_404_NOT_FOUND,
    detail='نمره محصول پیدا نشد.'
    )

NO_PRODUCT_RATING_FOUND_ERROR = HTTPException(
    status_code=status.HTTP_404_NOT_FOUND,
    detail='هیچ نمره محصولی با این مشخصات پیدا نشد.'
    )


PRODUCT_RATING_MUST_BE_BETWEEN_0_AND_5_ERROR = HTTPException(
    status_code=status.HTTP_406_NOT_ACCEPTABLE,
    detail="نمره محصول باید بین ۰ تا ۵ باشد."
    )