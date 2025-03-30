from fastapi.exceptions import HTTPException
from fastapi import status


CITY_NOT_FOUND_ERROR = HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                                     detail='City Not Found.')

NO_CITY_FOUND_ERROR = HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                                    detail='No Matched City Was Found')

CITY_ALREADY_EXISTS_ERROR = HTTPException(status_code=status.HTTP_406_NOT_ACCEPTABLE,
                                          detail="City already exists")
