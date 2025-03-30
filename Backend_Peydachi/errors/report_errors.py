from fastapi.exceptions import HTTPException
from fastapi import status


REPORT_NOT_FOUND_ERROR = HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                                       detail='Report Not Found.')

NO_REPORT_FOUND_ERROR = HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                                      detail='No Matched Report Was Found')