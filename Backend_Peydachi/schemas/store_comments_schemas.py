import datetime
from schemas.base_schemas import BaseSchema
from schemas.store_schema import StoreDisplay


class AddStoreCommentModel(BaseSchema):
    store_id: int
    text: str


class StoreCommentDisplay(AddStoreCommentModel):
    id: int
    user_id: int
    user_name: str
    date_added: datetime.datetime


class FullStoreCommentDisplay(BaseSchema):
    store_comment: StoreCommentDisplay
    store: StoreDisplay