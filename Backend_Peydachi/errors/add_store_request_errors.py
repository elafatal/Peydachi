from fastapi.exceptions import HTTPException
from fastapi import status

ADD_STORE_REQUEST_NOT_FOUND_ERROR = HTTPException(
    status_code=status.HTTP_404_NOT_FOUND,
    detail='Add Store Request Not Found.'
    )

NO_ADD_STORE_REQUEST_FOUND_ERROR = HTTPException(
    status_code=status.HTTP_404_NOT_FOUND,
    detail='No Matched Add Store Request Was Found'
    )

ADD_STORE_REQUEST_ALREADY_REVIEWED_ERROR = HTTPException(
    status_code=status.HTTP_406_NOT_ACCEPTABLE,
    detail="Add Store Request already reviewed"
    )


ADD_STORE_REQUEST_NAME_MUST_BE_LONGER_THAN_3_CHARACTERS_ERROR = HTTPException(
    status_code=status.HTTP_406_NOT_ACCEPTABLE,
    detail="Add Store Request name must be longer than 10 characters."
    )


ADD_STORE_REQUEST_NAME_MUST_BE_SHORTER_THAN_150_CHARACTERS_ERROR = HTTPException(
    status_code=status.HTTP_406_NOT_ACCEPTABLE,
    detail="Add Store Request name must be shorter than 150 characters."
    )

ADD_STORE_REQUEST_ADDRESS_MUST_BE_LONGER_THAN_5_CHARACTERS_ERROR = HTTPException(
    status_code=status.HTTP_406_NOT_ACCEPTABLE,
    detail="Add Store Request address must be longer than 10 characters."
    )


ADD_STORE_REQUEST_ADDRESS_MUST_BE_SHORTER_THAN_500_CHARACTERS_ERROR = HTTPException(
    status_code=status.HTTP_406_NOT_ACCEPTABLE,
    detail="Add Store Request address must be shorter than 500 characters."
    )


ADD_STORE_REQUEST_DESCRIPTION_MUST_BE_SHORTER_THAN_600_CHARACTERS_ERROR = HTTPException(
    status_code=status.HTTP_406_NOT_ACCEPTABLE,
    detail="Add Store Request description must be shorter than 600 characters."
    )

ADD_STORE_REQUEST_PHONE_NUMBER_CAN_NOT_BE_EMPTY_ERROR = HTTPException(
    status_code=status.HTTP_406_NOT_ACCEPTABLE,
    detail="Add Store Request phone number can not be empty."
    )