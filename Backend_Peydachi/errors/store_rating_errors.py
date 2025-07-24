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