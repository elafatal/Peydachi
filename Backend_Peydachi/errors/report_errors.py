from fastapi.exceptions import HTTPException
from fastapi import status


REPORT_NOT_FOUND_ERROR = HTTPException(
    status_code=status.HTTP_404_NOT_FOUND,
    detail='گزارش پیدا نشد.'
    )

NO_REPORT_FOUND_ERROR = HTTPException(
    status_code=status.HTTP_404_NOT_FOUND,
    detail='هیچ گزارشی با این مشخصات پیدا نشد.'
    )

REPORT_ALREADY_REVIEWED_ERROR = HTTPException(
    status_code=status.HTTP_406_NOT_ACCEPTABLE,
    detail="گزارش از قبل بررسی شده است."
    )


REPORT_TITLE_MUST_BE_LONGER_THAN_3_CHARACTERS_ERROR = HTTPException(
    status_code=status.HTTP_406_NOT_ACCEPTABLE,
    detail="عنوان گزارش باید بیشتر از ۳ کاراکتر باشد"
    )

REPORT_TITLE_MUST_BE_SHORTER_THAN_200_CHARACTERS_ERROR = HTTPException(
    status_code=status.HTTP_406_NOT_ACCEPTABLE,
    detail="عنوان کاراکتر می‌تواند حداکثر ۲۰۰ کاراکتر باشد."
    )

REPORT_TEXT_MUST_BE_LONGER_THAN_10_CHARACTERS_ERROR = HTTPException(
    status_code=status.HTTP_406_NOT_ACCEPTABLE,
    detail="متن گزارش باید بیشتر از ۱۰ کاراکتر باشد."
    )

REPORT_TEXT_MUST_BE_SHORTER_THAN_500_CHARACTERS_ERROR = HTTPException(
    status_code=status.HTTP_406_NOT_ACCEPTABLE,
    detail="متن گزارش نمی‌تواند بیشتر از ۵۰۰ کاراکتر باشد."
    )