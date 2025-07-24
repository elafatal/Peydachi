from fastapi.exceptions import HTTPException
from fastapi import status

REGION_NOT_FOUND_ERROR = HTTPException(
    status_code=status.HTTP_404_NOT_FOUND,
    detail='Region Not Found.'
    )

NO_REGION_FOUND_ERROR = HTTPException(
    status_code=status.HTTP_404_NOT_FOUND,
    detail='No Matched Region Was Found'
    )

REGION_ALREADY_EXISTS = HTTPException(
    status_code=status.HTTP_406_NOT_ACCEPTABLE,
    detail="Region already exists"
    )