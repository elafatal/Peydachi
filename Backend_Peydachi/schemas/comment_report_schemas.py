import datetime
from schemas.base_schemas import BaseSchema


class AddCommentReportModel(BaseSchema):
    text: str
    comment_id: int
    is_store: bool


class CommentReportDisplay(BaseSchema):
    id: int
    text: str
    is_reviewed: bool
    is_store: bool
    date_added: datetime.datetime