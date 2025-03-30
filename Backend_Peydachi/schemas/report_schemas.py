import datetime
from schemas.base_schemas import BaseSchema


class ReportDisplay(BaseSchema):
    id: int
    text: str
    date_added: datetime.datetime
    is_reviewed: bool
