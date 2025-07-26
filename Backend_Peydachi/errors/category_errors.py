from fastapi.exceptions import HTTPException
from fastapi import status


CATEGORY_NOT_FOUND_ERROR = HTTPException(
    status_code=status.HTTP_404_NOT_FOUND,
    detail='دسته‌بندی پیدا نشد.'
    )

NO_CATEGORY_FOUND_ERROR = HTTPException(
    status_code=status.HTTP_404_NOT_FOUND,
    detail='هیچ دسته‌بندی‌ای با این مشخصات پیدا نشد.'
    )

CATEGORY_ALREADY_EXISTS_ERROR = HTTPException(
    status_code=status.HTTP_406_NOT_ACCEPTABLE,
    detail="این دسته‌بندی وجود دارد."
    )

CATEGORY_RELATION_ALREADY_EXISTS_ERROR = HTTPException(
    status_code=status.HTTP_406_NOT_ACCEPTABLE,
    detail="این ارتباط دسته‌بندی وجود دارد."
    )