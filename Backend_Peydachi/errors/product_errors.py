from fastapi.exceptions import HTTPException
from fastapi import status


PRODUCT_NOT_FOUND_ERROR = HTTPException(
    status_code=status.HTTP_404_NOT_FOUND,
    detail='Product Not Found.'
    )

NO_PRODUCT_FOUND_ERROR = HTTPException(
    status_code=status.HTTP_404_NOT_FOUND,
    detail='No Matched Product Was Found'
    )

PRODUCT_ACCESS_ERROR = HTTPException(
    status_code=status.HTTP_403_FORBIDDEN,
    detail='You Are Forbidden To Change Other Stores Products Info.'
    )

UPLOAD_PICTURE_ERROR = HTTPException(
    status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
    detail='Upload Picture Is Not Possible Due To Service Error'
    )

UPLOAD_PICTURE_INTERNAL_ERROR = HTTPException(
    status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
    detail='There Was A Problem Uploading Picture, Try Again Later.'
    )

PRIDUCT_HAS_NO_PICTURE_ERROR = HTTPException(
    status_code=status.HTTP_404_NOT_FOUND,
    detail='Product Has No Picture.'
    )


PRODUCT_NAME_MUST_BE_LONGER_THAN_3_CHARACTERS_ERROR = HTTPException(
    status_code=status.HTTP_406_NOT_ACCEPTABLE,
    detail="Product name must be longer than 3 characters."
    )


PRODUCT_QUANTITY_CAN_NOT_BE_NEGATIVE_ERROR = HTTPException(
    status_code=status.HTTP_406_NOT_ACCEPTABLE,
    detail="Product quantity can not be negative."
    )
