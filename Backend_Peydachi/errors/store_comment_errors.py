from fastapi.exceptions import HTTPException
from fastapi import status


STORE_COMMENT_NOT_FOUND_ERROR = HTTPException(
    status_code=status.HTTP_404_NOT_FOUND,
    detail='Store Comment Not Found.'
    )

NO_STORE_COMMENT_FOUND_ERROR = HTTPException(
    status_code=status.HTTP_404_NOT_FOUND,
    detail='No Matched Store Comment Was Found'
    )


STORE_COMMENT_ACCESS_ERROR = HTTPException(
    status_code=status.HTTP_403_FORBIDDEN,
    detail='You Are Forbidden To Change Other Stores Comment Info.'
    )