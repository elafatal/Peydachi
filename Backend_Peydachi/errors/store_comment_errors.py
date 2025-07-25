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


STORE_COMMENT_MUST_BE_LONGER_THAN_3_CHARACTERS_ERROR = HTTPException(
    status_code=status.HTTP_406_NOT_ACCEPTABLE,
    detail="Store comment must be longer than 3 characters."
    )

STORE_COMMENT_MUST_BE_SHORTER_THAN_500_CHARACTERS_ERROR = HTTPException(
    status_code=status.HTTP_406_NOT_ACCEPTABLE,
    detail="Store comment must be shorter than 100 characters."
    )