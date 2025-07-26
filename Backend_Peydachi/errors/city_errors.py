from fastapi.exceptions import HTTPException
from fastapi import status


CITY_NOT_FOUND_ERROR = HTTPException(
    status_code=status.HTTP_404_NOT_FOUND,
    detail='شهر پیدا نشد.'
    )

NO_CITY_FOUND_ERROR = HTTPException(
    status_code=status.HTTP_404_NOT_FOUND,
    detail='هیچ شهری با این مشخصات پیدا نشد.'
    )

CITY_ALREADY_EXISTS_ERROR = HTTPException(
    status_code=status.HTTP_406_NOT_ACCEPTABLE,
    detail="این شهر وجود دارد."
    )
