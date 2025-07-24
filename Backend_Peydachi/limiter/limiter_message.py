from fastapi.responses import JSONResponse
from fastapi.requests import Request
from fastapi.exceptions import HTTPException
from errors.limiter_errors import TOO_MANY_REQUESTS_ERROR

async def custom_rate_limit_exception_handler(request: Request, exc: HTTPException):
    if exc.status_code == 429:
        return JSONResponse(
            status_code=TOO_MANY_REQUESTS_ERROR.status_code,
            content={"detail": TOO_MANY_REQUESTS_ERROR.detail}
        )

    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.detail}
    )
