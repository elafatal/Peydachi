from fastapi.exceptions import HTTPException
from fastapi import status

STORE_RATING_NOT_FOUND_ERROR = HTTPException(
    status_code=status.HTTP_404_NOT_FOUND,
    detail='Store Rating Not Found.'
    )

NO_STORE_RATING_FOUND_ERROR = HTTPException(
    status_code=status.HTTP_404_NOT_FOUND,
    detail='No Matched Store Rating Was Found'
    )


STORE_RATING_MUST_BE_BETWEEN_0_AND_5_ERROR = HTTPException(
    status_code=status.HTTP_406_NOT_ACCEPTABLE,
    detail="Store rating must be between 0 and 5."
    )