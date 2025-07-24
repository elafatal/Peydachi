from fastapi.exceptions import HTTPException
from fastapi import status


USER_PHONE_VERIFICATION_CODE_ERROR = HTTPException(
    status_code=status.HTTP_404_NOT_FOUND,
    detail='User Phone Verification Code Error.'
    )

USER_VERIFICATION_CODE_EXPIRED_ERROR = HTTPException(
    status_code=status.HTTP_404_NOT_FOUND,
    detail='User Verification Code Expired.'
    )