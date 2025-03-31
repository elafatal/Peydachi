from fastapi.exceptions import HTTPException
from fastapi import status


PRODUCT_NOT_FOUND_ERROR = HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                                        detail='Product Not Found.')

NO_PRODUCT_FOUND_ERROR = HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                                       detail='No Matched Product Was Found')

PRODUCT_ACCESS_ERROR = HTTPException(status_code=status.HTTP_403_FORBIDDEN,
                                     detail='You Are Forbidden To Change Other Stores Products Info.')
