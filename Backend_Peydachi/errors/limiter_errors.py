from fastapi import status
from fastapi.exceptions import HTTPException

TOO_MANY_REQUESTS_ERROR = HTTPException(
    status_code=status.HTTP_429_TOO_MANY_REQUESTS,
    detail="تعداد درخواست‌های شما بیشتر از حد مجاز است. پس از مدتی دوباره امتحان کنید.",
    )
