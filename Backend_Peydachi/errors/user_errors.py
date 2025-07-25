from fastapi.exceptions import HTTPException
from fastapi import status


USER_NAME_DUPLICATE_ERROR = HTTPException(
    status_code=status.HTTP_406_NOT_ACCEPTABLE,
    detail='Username Already Exists.'
    )


EMAIL_DUPLICATE_ERROR = HTTPException(
    status_code=status.HTTP_406_NOT_ACCEPTABLE,
    detail='Email Already Exists.'
    )


PHONE_NUMBER_DUPLICATE_ERROR = HTTPException(
    status_code=status.HTTP_406_NOT_ACCEPTABLE,
    detail='Phone Number Already Exists.'
    )


USER_NOT_FOUND_ERROR = HTTPException(
    status_code=status.HTTP_404_NOT_FOUND,
    detail='User Not Found.'
    )


ERROR_CREDENTIAL = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail='Invalid Authorization',
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
    detail='Protected.'
    )


INVALID_USER_ERROR = HTTPException(
    status_code=status.HTTP_404_NOT_FOUND,
    detail='Invalid Username.'
    )


INVALID_PASSWORD_ERROR = HTTPException(
    status_code=status.HTTP_404_NOT_FOUND,
    detail='Invalid Password.'
    )


DONT_HAVE_ACCESS_ERROR = HTTPException(
    status_code=status.HTTP_403_FORBIDDEN,
    detail='You Are Forbidden To Change Other Users Info.'
    )


DONT_HAVE_ACCESS_ADMIN_ERROR = HTTPException(
    status_code=status.HTTP_403_FORBIDDEN,
    detail='You Are Forbidden To Remove An Admin.'
    )


NO_USER_FOUND_ERROR = HTTPException(
    status_code=status.HTTP_404_NOT_FOUND,
    detail='No Matched User Was Found'
    )


USER_IS_BANNED_ERROR = HTTPException(
    status_code=status.HTTP_403_FORBIDDEN,
    detail='User Has Been Banned.'
    )


USER_PHONE_VERIFICATION_CODE_ERROR = HTTPException(
    status_code=status.HTTP_404_NOT_FOUND,
    detail='User Phone Verification Code Error.'
    )


USER_HAS_NO_PHONE_NUMBER_ERROR = HTTPException(
    status_code=status.HTTP_404_NOT_FOUND,
    detail='User Has No Phone Number.'
    )


SMS_SERVER_ERROR = HTTPException(
    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
    detail='There was an error processing your verification. Try again later.'
    )


USER_VERIFICATION_CODE_EXPIRED_ERROR = HTTPException(
    status_code=status.HTTP_404_NOT_FOUND,
    detail='User Verification Code Expired.'
    )

USER_IS_ALREADY_SELLER_ERROR = HTTPException(
    status_code=status.HTTP_406_NOT_ACCEPTABLE,
    detail="User is already a seller."
    )


USER_NOT_SELLER_ERROR = HTTPException(
    status_code=status.HTTP_406_NOT_ACCEPTABLE,
    detail='Owner not found or not accessible.'
    )


USER_ALREADY_HAS_STORE = HTTPException(
    status_code=status.HTTP_406_NOT_ACCEPTABLE,
    detail='This user already owns a store.'
    )


USER_IS_NOT_SELLER_ERROR = HTTPException(
    status_code=status.HTTP_406_NOT_ACCEPTABLE,
    detail="User is not a seller."
    )


USERNAME_CAN_NOT_HAVE_SPACE_ERROR = HTTPException(
    status_code=status.HTTP_406_NOT_ACCEPTABLE,
    detail="Username can not have space."
    )


USERNAME_MUST_BE_LONGER_THAN_3_CHARACTERS_ERROR = HTTPException(
    status_code=status.HTTP_406_NOT_ACCEPTABLE,
    detail="Username must be longer than 3 characters."
    )


PASSWORD_MUST_BE_LONGER_THAN_6_CHARACTERS_ERROR = HTTPException(
    status_code=status.HTTP_406_NOT_ACCEPTABLE,
    detail="Password must be longer than 6 characters."
    )


INVALID_PHONE_NUMBER_ERROR = HTTPException(
    status_code=status.HTTP_406_NOT_ACCEPTABLE,
    detail="Invalid phone number."
    )


PHONE_NUMBER_CAN_NOT_BE_EMPTY_ERROR = HTTPException(
    status_code=status.HTTP_406_NOT_ACCEPTABLE,
    detail="Phone number can not be empty."
    )


USERNAME_MUST_BE_ENGLISH = HTTPException(
    status_code=status.HTTP_406_NOT_ACCEPTABLE,
    detail="Username must be in English."
    )


USERNAME_MUST_BE_SHORTER_THAN_40_CHARACTERS_ERROR = HTTPException(
    status_code=status.HTTP_406_NOT_ACCEPTABLE,
    detail="Username must be shorter than 40 characters."
    )