from fastapi import status
from fastapi.exceptions import HTTPException

TOO_MANY_REQUESTS_ERROR = HTTPException(
    status_code=status.HTTP_429_TOO_MANY_REQUESTS,
    detail="Too Many Requests. Please Try Again Later After Some Time.",
    )
