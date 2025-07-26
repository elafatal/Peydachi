from fastapi.exceptions import HTTPException
from fastapi import status


USER_PHONE_VERIFICATION_CODE_ERROR = HTTPException(
    status_code=status.HTTP_404_NOT_FOUND,
    detail='کد احراز هویت شما نادرست است.'
    )

USER_VERIFICATION_CODE_EXPIRED_ERROR = HTTPException(
    status_code=status.HTTP_404_NOT_FOUND,
    detail='کد احراز هویت شما منقضی شده است.'
    )


SMS_SERVICE_ERROR = HTTPException(
    status_code=status.HTTP_404_NOT_FOUND,
    detail='مشکلی در سرویس پیامک رخ داده است. (در صورت روشن بودن فیلترشکن یا نرم‌افزارهای مشابه آن‌ها را موقتا خاموش کنید).'
    )