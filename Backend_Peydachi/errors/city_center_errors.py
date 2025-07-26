from fastapi.exceptions import HTTPException
from fastapi import status


CITY_CENTER_NOT_FOUND_ERROR = HTTPException(
    status_code=status.HTTP_404_NOT_FOUND,
    detail='مرکز شهر پیدا نشد.'
    )

NO_CITY_CENTER_FOUND_ERROR = HTTPException(
    status_code=status.HTTP_404_NOT_FOUND,
    detail='هیچ مرکز شهری با این مشخصات پیدا نشد.'
    )


CITY_CENTER_ALREADY_EXISTS_ERROR = HTTPException(
    status_code=status.HTTP_406_NOT_ACCEPTABLE,
    detail="مرکز شهر وجود دارد."
    )