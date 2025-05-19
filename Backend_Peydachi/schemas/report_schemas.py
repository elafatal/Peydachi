import datetime
from schemas.base_schemas import BaseSchema


class AddReportModel(BaseSchema):
    title: str
    text: str


class ReportDisplay(BaseSchema):
    id: int
    title: str
    text: str
    date_added: datetime.datetime
    is_reviewed: bool
