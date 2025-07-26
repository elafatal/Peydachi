from fastapi.exceptions import HTTPException
from fastapi import status

STORE_RATING_NOT_FOUND_ERROR = HTTPException(
    status_code=status.HTTP_404_NOT_FOUND,
    detail='نمره فروشگاه پیدا نشد.'
    )

NO_STORE_RATING_FOUND_ERROR = HTTPException(
    status_code=status.HTTP_404_NOT_FOUND,
    detail='هیچ نمره فروشگاهی پیدا نشد.'
    )


STORE_RATING_MUST_BE_BETWEEN_0_AND_5_ERROR = HTTPException(
    status_code=status.HTTP_406_NOT_ACCEPTABLE,
    detail="نمره فروشگاه باید بین ۰ تا ۵ باشد."
    )