from fastapi.exceptions import HTTPException
from fastapi import status

ADD_STORE_REQUEST_NOT_FOUND_ERROR = HTTPException(
    status_code=status.HTTP_404_NOT_FOUND,
    detail='درخواست افزودن فروشگاه پیدا نشد.'
    )

NO_ADD_STORE_REQUEST_FOUND_ERROR = HTTPException(
    status_code=status.HTTP_404_NOT_FOUND,
    detail='هیچ درخواست افزودن فروشگاهی با این مشخصات پیدا نشد.'
    )

ADD_STORE_REQUEST_ALREADY_REVIEWED_ERROR = HTTPException(
    status_code=status.HTTP_406_NOT_ACCEPTABLE,
    detail="درخواست افزودن فروشگاه قبلا بررسی شده است."
    )


ADD_STORE_REQUEST_NAME_MUST_BE_LONGER_THAN_3_CHARACTERS_ERROR = HTTPException(
    status_code=status.HTTP_406_NOT_ACCEPTABLE,
    detail="نام فروشگاه باید بیشتر از 3 کاراکتر باشد."
    )


ADD_STORE_REQUEST_NAME_MUST_BE_SHORTER_THAN_150_CHARACTERS_ERROR = HTTPException(
    status_code=status.HTTP_406_NOT_ACCEPTABLE,
    detail="نام فروشگاه باید کمتر از ۱۵۰ کاراکتر باشد."
    )

ADD_STORE_REQUEST_ADDRESS_MUST_BE_LONGER_THAN_5_CHARACTERS_ERROR = HTTPException(
    status_code=status.HTTP_406_NOT_ACCEPTABLE,
    detail="آدرس فروشگاه باید بیشتر از ۵ کاراکتر باشد."
    )


ADD_STORE_REQUEST_ADDRESS_MUST_BE_SHORTER_THAN_500_CHARACTERS_ERROR = HTTPException(
    status_code=status.HTTP_406_NOT_ACCEPTABLE,
    detail="آدرس فروشگاه باید کمتر از ۵۰۰ کاراکتر باشد."
    )


ADD_STORE_REQUEST_DESCRIPTION_MUST_BE_SHORTER_THAN_600_CHARACTERS_ERROR = HTTPException(
    status_code=status.HTTP_406_NOT_ACCEPTABLE,
    detail="توضیحات فروشگاه باید کمتر از ۶۰۰ کاراکتر باشد."
    )

ADD_STORE_REQUEST_PHONE_NUMBER_CAN_NOT_BE_EMPTY_ERROR = HTTPException(
    status_code=status.HTTP_406_NOT_ACCEPTABLE,
    detail="شماره تلفن فروشگاه نمی تواند خالی باشد."
    )