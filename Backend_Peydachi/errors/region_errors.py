from fastapi.exceptions import HTTPException
from fastapi import status

REGION_NOT_FOUND_ERROR = HTTPException(
    status_code=status.HTTP_404_NOT_FOUND,
    detail='استان پیدا نشد.'
    )

NO_REGION_FOUND_ERROR = HTTPException(
    status_code=status.HTTP_404_NOT_FOUND,
    detail='هیچ استانی با این مشخصات پیدا نشد.'
    )

REGION_ALREADY_EXISTS = HTTPException(
    status_code=status.HTTP_406_NOT_ACCEPTABLE,
    detail="استان وجود دارد."
    )