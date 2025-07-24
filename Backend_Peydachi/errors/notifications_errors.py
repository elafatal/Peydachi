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