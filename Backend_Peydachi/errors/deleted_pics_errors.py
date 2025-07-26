from fastapi.exceptions import HTTPException
from fastapi import status


NO_DELETED_PIC_FOUND = HTTPException(
    status_code=status.HTTP_404_NOT_FOUND,
    detail='هیچ عکس حذف شده‌ای پیدا نشد.'
    )


DELETED_PIC_NOT_FOUND = HTTPException(
    status_code=status.HTTP_404_NOT_FOUND,
    detail='عکس حذف شده پیدا نشد.'
    )