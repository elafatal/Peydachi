from fastapi.exceptions import HTTPException
from fastapi import status


USER_NAME_DUPLICATE_ERROR = HTTPException(
    status_code=status.HTTP_406_NOT_ACCEPTABLE,
    detail='این نام کاربری قبلا ثبت شده است.'
    )


EMAIL_DUPLICATE_ERROR = HTTPException(
    status_code=status.HTTP_406_NOT_ACCEPTABLE,
    detail='این ایمیل قبلا ثبت شده است.'
    )


PHONE_NUMBER_DUPLICATE_ERROR = HTTPException(
    status_code=status.HTTP_406_NOT_ACCEPTABLE,
    detail='این شماره تلفن قبلا ثبت شده است.'
    )


USER_NOT_FOUND_ERROR = HTTPException(
    status_code=status.HTTP_404_NOT_FOUND,
    detail='کاربر پیدا نشد.'
    )


ERROR_CREDENTIAL = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail='احراز هویت ناموفق.',
    headers={'WWW-authenticate': 'bearer'}
    )


TOKEN_EXPIRED_ERROR = HTTPException(
    status_code=status.HTTP_406_NOT_ACCEPTABLE,
    detail='Token Expired.'
    )


INVALID_TOKEN_ERROR = HTTPException(
    status_code=status.HTTP_406_NOT_ACCEPTABLE,
    detail='Invalid or Expired Token.')


ACCESS_TOKEN_DEMAND_ERROR = HTTPException(
    status_code=status.HTTP_403_FORBIDDEN,
    detail='Please Provide Access Token Instead of Refresh Token.'
    )


REFRESH_TOKEN_DEMAND_ERROR = HTTPException(
    status_code=status.HTTP_403_FORBIDDEN,
    detail='Please Provide Refresh Token Instead of Access Token.'
    )


PROTECTED_ERROR = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail='دسترسی غیرمجاز',
    )


INVALID_USER_ERROR = HTTPException(
    status_code=status.HTTP_404_NOT_FOUND,
    detail='کابر غیرمجاز'
    )


INVALID_PASSWORD_ERROR = HTTPException(
    status_code=status.HTTP_404_NOT_FOUND,
    detail='رمز عبور اشتباه است.'
    )


DONT_HAVE_ACCESS_ERROR = HTTPException(
    status_code=status.HTTP_403_FORBIDDEN,
    detail='تغییر اطلاعات دیگر کاربران امکان پذیر نیست.'
    )


DONT_HAVE_ACCESS_ADMIN_ERROR = HTTPException(
    status_code=status.HTTP_403_FORBIDDEN,
    detail='حذف کردن ادمین‌ها امکان پذیر نیست.'
    )


NO_USER_FOUND_ERROR = HTTPException(
    status_code=status.HTTP_404_NOT_FOUND,
    detail='کاربری با این مشخصات پیدا نشد.'
    )


USER_IS_BANNED_ERROR = HTTPException(
    status_code=status.HTTP_403_FORBIDDEN,
    detail='کابر مسدود شده است.'
    )


USER_HAS_NO_PHONE_NUMBER_ERROR = HTTPException(
    status_code=status.HTTP_404_NOT_FOUND,
    detail='شماره همراهی برای این کاربر وجود ندارد.'
    )

USER_IS_ALREADY_SELLER_ERROR = HTTPException(
    status_code=status.HTTP_406_NOT_ACCEPTABLE,
    detail="کاربر از قبل فروشنده است."
    )


USER_ALREADY_HAS_STORE = HTTPException(
    status_code=status.HTTP_406_NOT_ACCEPTABLE,
    detail='از قبل فروشگاهی برای این فروشنده ثبت شده است.'
    )


USER_IS_NOT_SELLER_ERROR = HTTPException(
    status_code=status.HTTP_406_NOT_ACCEPTABLE,
    detail="کابر فروشنده نیست."
    )


USERNAME_CAN_NOT_HAVE_SPACE_ERROR = HTTPException(
    status_code=status.HTTP_406_NOT_ACCEPTABLE,
    detail="ماشین نام کاربری نمی تواند شامل فاصله باشد."
    )


USERNAME_MUST_BE_LONGER_THAN_3_CHARACTERS_ERROR = HTTPException(
    status_code=status.HTTP_406_NOT_ACCEPTABLE,
    detail="نام کاربری باید بیشتر از 3 کاراکتر باشد."
    )


PASSWORD_MUST_BE_LONGER_THAN_6_CHARACTERS_ERROR = HTTPException(
    status_code=status.HTTP_406_NOT_ACCEPTABLE,
    detail="رمز عبور باید بیشتر از ۶ کاراکتر باشد."
    )


INVALID_PHONE_NUMBER_ERROR = HTTPException(
    status_code=status.HTTP_406_NOT_ACCEPTABLE,
    detail="شماره همراه نامعتبر است."
    )


PHONE_NUMBER_CAN_NOT_BE_EMPTY_ERROR = HTTPException(
    status_code=status.HTTP_406_NOT_ACCEPTABLE,
    detail="شماره همراه نمی تواند خالی باشد."
    )


USERNAME_MUST_BE_ENGLISH = HTTPException(
    status_code=status.HTTP_406_NOT_ACCEPTABLE,
    detail="نام کاربری فقط باید شامل حروف، اعداد و کاراکترهای انگلیسی باشد."
    )


USERNAME_MUST_BE_SHORTER_THAN_40_CHARACTERS_ERROR = HTTPException(
    status_code=status.HTTP_406_NOT_ACCEPTABLE,
    detail="نام کاربری حداثر می‌تواند شامل ۴۰ کاراکتر باشد."
    )