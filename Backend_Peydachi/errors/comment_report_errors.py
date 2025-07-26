from fastapi.exceptions import HTTPException
from fastapi import status



COMMENT_REPORT_NOT_FOUND_ERROR = HTTPException(
    status_code=status.HTTP_404_NOT_FOUND,
    detail='گزارش کامنت پیدا نشد.'
    )


NO_COMMENT_REPORT_FOUND_ERROR = HTTPException(
    status_code=status.HTTP_404_NOT_FOUND,
    detail='هیچ گزارش کامنتی با این مشخصات پیدا نشد.'
    )

NO_PRODUCT_COMMENT_REPORT_FOUND_ERROR = HTTPException(
    status_code=status.HTTP_404_NOT_FOUND,
    detail='هیچ گزارش کامنتی برای محصول پیدا نشد.'
    )

NO_STORE_COMMENT_REPORT_FOUND_ERROR = HTTPException(
    status_code=status.HTTP_404_NOT_FOUND,
    detail='هیچ گزارش کامنتی برای فروشگاه پیدا نشد.'
    )


COMMENT_REPORT_ALREADY_REVIEWED_ERROR = HTTPException(
    status_code=status.HTTP_406_NOT_ACCEPTABLE,
    detail="گزارش کامنت قبلا بررسی شده است."
    )


COMMENT_REPORT_MUST_BE_LONGER_THAN_3_CHARACTERS_ERROR = HTTPException(
    status_code=status.HTTP_406_NOT_ACCEPTABLE,
    detail="گزارش کامنت باید بیشتر از 3 کاراکتر باشد."
    )

COMMENT_REPORT_MUST_BE_SHORTER_THAN_500_CHARACTERS_ERROR = HTTPException(
    status_code=status.HTTP_406_NOT_ACCEPTABLE,
    detail="گزارش کامنت حداکثر میتواند ۵۰۰ کاراکتر باشد."
    )