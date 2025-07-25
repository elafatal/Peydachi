from fastapi.exceptions import HTTPException
from fastapi import status

PRODUCT_RATING_NOT_FOUND_ERROR = HTTPException(
    status_code=status.HTTP_404_NOT_FOUND,
    detail='Store Rating Not Found.'
    )

NO_PRODUCT_RATING_FOUND_ERROR = HTTPException(
    status_code=status.HTTP_404_NOT_FOUND,
    detail='No Matched Store Rating Was Found'
    )


PRODUCT_RATING_MUST_BE_BETWEEN_0_AND_5_ERROR = HTTPException(
    status_code=status.HTTP_406_NOT_ACCEPTABLE,
    detail="Product rating must be between 0 and 5."
    )