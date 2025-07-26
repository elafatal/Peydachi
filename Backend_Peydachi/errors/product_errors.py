from fastapi.exceptions import HTTPException
from fastapi import status


PRODUCT_NOT_FOUND_ERROR = HTTPException(
    status_code=status.HTTP_404_NOT_FOUND,
    detail='محصول پیدا نشد.'
    )

NO_PRODUCT_FOUND_ERROR = HTTPException(
    status_code=status.HTTP_404_NOT_FOUND,
    detail='هیچ محصولی با این مشخصات پیدا نشد.'
    )

PRODUCT_ACCESS_ERROR = HTTPException(
    status_code=status.HTTP_403_FORBIDDEN,
    detail='دسترسی تغییر محصولات دیگر کابران را ندارید.'
    )

UPLOAD_PICTURE_ERROR = HTTPException(
    status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
    detail='آپلود تصویر با خطا مواجه شد.'
    )

UPLOAD_PICTURE_INTERNAL_ERROR = HTTPException(
    status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
    detail='آپلود تصویر با خطای داخلی مواجه شد. لطفا پس از مدتی دوباره تلاش کنید یا با پشتیبانی تماس بگیرید.'
    )

PRIDUCT_HAS_NO_PICTURE_ERROR = HTTPException(
    status_code=status.HTTP_404_NOT_FOUND,
    detail='عکسی برای محصول ثبت نشده است.'
    )


PRODUCT_NAME_MUST_BE_LONGER_THAN_3_CHARACTERS_ERROR = HTTPException(
    status_code=status.HTTP_406_NOT_ACCEPTABLE,
    detail="نام محصول باید بیشتر از 3 کاراکتر باشد."
    )


PRODUCT_QUANTITY_CAN_NOT_BE_NEGATIVE_ERROR = HTTPException(
    status_code=status.HTTP_406_NOT_ACCEPTABLE,
    detail="موجودی محصول نمی تواند منفی باشد."
    )
