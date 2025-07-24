from fastapi.exceptions import HTTPException
from fastapi import status


NOTIFICATION_NOT_FOUND_ERROR = HTTPException(
    status_code=status.HTTP_404_NOT_FOUND,
    detail='Notification Not Found.'
    )

NO_NOTIFICATION_FOUND_ERROR = HTTPException(
    status_code=status.HTTP_404_NOT_FOUND,
    detail='No Matched Notification Was Found'
    )

NOTIFICATION_ACCESS_ERROR = HTTPException(
    status_code=status.HTTP_403_FORBIDDEN,
    detail='You Are Forbidden To Access Other Users Notifications.'
    )


NOTIFICATION_TITLE_MUST_BE_LONGER_THAN_3_CHARACTERS_ERROR = HTTPException(
    status_code=status.HTTP_406_NOT_ACCEPTABLE,
    detail="Notification must be longer than 3 characters."
    )

NOTIFICATION_TITLE_MUST_BE_SHORTER_THAN_200_CHARACTERS_ERROR = HTTPException(
    status_code=status.HTTP_406_NOT_ACCEPTABLE,
    detail="Notification must be shorter than 200 characters."
    )


NOTIFICATION_TEXT_MUST_BE_LONGER_THAN_5_CHARACTERS_ERROR = HTTPException(
    status_code=status.HTTP_406_NOT_ACCEPTABLE,
    detail="Notification must be longer than 5 characters."
    )


NOTIFICATION_TEXT_MUST_BE_SHORTER_THAN_500_CHARACTERS_ERROR = HTTPException(
    status_code=status.HTTP_406_NOT_ACCEPTABLE,
    detail="Notification must be shorter than 500 characters."
    )