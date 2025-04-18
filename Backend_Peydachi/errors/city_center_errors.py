from fastapi.exceptions import HTTPException
from fastapi import status


CITY_CENTER_NOT_FOUND_ERROR = HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                                            detail='City Center Not Found.')

NO_CITY_CENTER_FOUND_ERROR = HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                                           detail='No Matched City Center Was Found')


CITY_CENTER_ALREADY_EXISTS_ERROR = HTTPException(status_code=status.HTTP_406_NOT_ACCEPTABLE,
                                                 detail="City Center already exists")