from fastapi.exceptions import HTTPException
from fastapi import status

ADD_STORE_REQUEST_NOT_FOUND_ERROR = HTTPException(
    status_code=status.HTTP_404_NOT_FOUND,
    detail='Add Store Request Not Found.'
    )

NO_ADD_STORE_REQUEST_FOUND_ERROR = HTTPException(
    status_code=status.HTTP_404_NOT_FOUND,
    detail='No Matched Add Store Request Was Found'
    )

ADD_STORE_REQUEST_ALREADY_REVIEWED_ERROR = HTTPException(
    status_code=status.HTTP_406_NOT_ACCEPTABLE,
    detail="Add Store Request already reviewed"
    )