from fastapi.exceptions import HTTPException
from fastapi import status

PRODUCT_RATING_NOT_FOUND_ERROR = HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                                               detail='Store Rating Not Found.')

NO_PRODUCT_RATING_FOUND_ERROR = HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                                              detail='No Matched Store Rating Was Found')