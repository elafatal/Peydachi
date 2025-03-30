from fastapi.exceptions import HTTPException
from fastapi import status


STORE_NOT_FOUND_ERROR = HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                                      detail='Store Not Found.')

NO_STORE_FOUND_ERROR = HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                                     detail='No Matched Store Was Found')

STORE_ALREADY_EXISTS_ERROR = HTTPException(status_code=status.HTTP_406_NOT_ACCEPTABLE,
                                           detail="Store already exists")

STORE_ACCESS_ERROR = HTTPException(status_code=status.HTTP_403_FORBIDDEN,
                                   detail='You Are Forbidden To Change Other Stores Info.')