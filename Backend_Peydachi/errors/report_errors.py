from fastapi.exceptions import HTTPException
from fastapi import status


REPORT_NOT_FOUND_ERROR = HTTPException(
    status_code=status.HTTP_404_NOT_FOUND,
    detail='Report Not Found.'
    )

NO_REPORT_FOUND_ERROR = HTTPException(
    status_code=status.HTTP_404_NOT_FOUND,
    detail='No Matched Report Was Found'
    )

REPORT_ALREADY_REVIEWED_ERROR = HTTPException(
    status_code=status.HTTP_406_NOT_ACCEPTABLE,
    detail="Report already reviewed"
    )


REPORT_TITLE_MUST_BE_LONGER_THAN_3_CHARACTERS_ERROR = HTTPException(
    status_code=status.HTTP_406_NOT_ACCEPTABLE,
    detail="Report must be longer than 3 characters."
    )

REPORT_TITLE_MUST_BE_SHORTER_THAN_200_CHARACTERS_ERROR = HTTPException(
    status_code=status.HTTP_406_NOT_ACCEPTABLE,
    detail="Report must be shorter than 200 characters."
    )

REPORT_TEXT_MUST_BE_LONGER_THAN_10_CHARACTERS_ERROR = HTTPException(
    status_code=status.HTTP_406_NOT_ACCEPTABLE,
    detail="Report must be longer than 10 characters."
    )

REPORT_TEXT_MUST_BE_SHORTER_THAN_500_CHARACTERS_ERROR = HTTPException(
    status_code=status.HTTP_406_NOT_ACCEPTABLE,
    detail="Report must be shorter than 500 characters."
    )