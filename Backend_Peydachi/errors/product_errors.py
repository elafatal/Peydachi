from fastapi.exceptions import HTTPException
from fastapi import status


PRODUCT_NOT_FOUND_ERROR = HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                                        detail='Product Not Found.')

NO_PRODUCT_FOUND_ERROR = HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                                       detail='No Matched Product Was Found')

PRODUCT_ACCESS_ERROR = HTTPException(status_code=status.HTTP_403_FORBIDDEN,
                                     detail='You Are Forbidden To Change Other Stores Products Info.')

UPLOAD_PICTURE_ERROR = HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                                     detail='Upload Picture Is Not Possible Due To Service Error')

UPLOAD_PICTURE_INTERNAL_ERROR = HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                                              detail='There Was A Problem Uploading Picture, Try Again Later.')

PRIDUCT_HAS_NO_PICTURE_ERROR = HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                                             detail='Product Has No Picture.')
