from fastapi.exceptions import HTTPException
from fastapi import status


NOTIFICATION_NOT_FOUND_ERROR = HTTPException(
    status_code=status.HTTP_404_NOT_FOUND,
    detail='پیام پیدا نشد.'
    )

NO_NOTIFICATION_FOUND_ERROR = HTTPException(
    status_code=status.HTTP_404_NOT_FOUND,
    detail='هیچ پیامی با این مشخصات پیدا نشد.'
    )

NOTIFICATION_ACCESS_ERROR = HTTPException(
    status_code=status.HTTP_403_FORBIDDEN,
    detail='شما دسترسی به پیام‌های کاربران دیگر ندارید.'
    )


NOTIFICATION_HAS_ALREADY_BEEN_READ_ERROR = HTTPException(
    status_code=status.HTTP_406_NOT_ACCEPTABLE,
    detail="پیام قبلا بخوانده شده است."
    )


NOTIFICATION_TITLE_MUST_BE_LONGER_THAN_3_CHARACTERS_ERROR = HTTPException(
    status_code=status.HTTP_406_NOT_ACCEPTABLE,
    detail="عنوان پیام باید بیشتر از ۳ کاراکتر باشد."
    )

NOTIFICATION_TITLE_MUST_BE_SHORTER_THAN_200_CHARACTERS_ERROR = HTTPException(
    status_code=status.HTTP_406_NOT_ACCEPTABLE,
    detail="عنوان پیام نمی‌تواند بیشتر از ۲۰۰ کاراکتر باشد."
    )


NOTIFICATION_TEXT_MUST_BE_LONGER_THAN_5_CHARACTERS_ERROR = HTTPException(
    status_code=status.HTTP_406_NOT_ACCEPTABLE,
    detail="متن پیام باید بیشتر از ۵ کاراکتر باشد."
    )


NOTIFICATION_TEXT_MUST_BE_SHORTER_THAN_500_CHARACTERS_ERROR = HTTPException(
    status_code=status.HTTP_406_NOT_ACCEPTABLE,
    detail="متن پیام نمی‌تواند بیشتر از ۵۰۰ کاراکتر باشد."
    )