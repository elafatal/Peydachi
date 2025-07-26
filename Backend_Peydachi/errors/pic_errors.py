from fastapi.exceptions import HTTPException
from fastapi import status



FILETYPE_MUST_BE_PICTURE_ERROR = HTTPException(
    status_code=status.HTTP_406_NOT_ACCEPTABLE,
    detail="فایل باید عکس باشد."
    )