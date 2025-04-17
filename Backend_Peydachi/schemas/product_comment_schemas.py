import datetime
from schemas.base_schemas import BaseSchema


class AddProductCommentModel(BaseSchema):
    product_id: int
    text: str


class ProductCommentDisplay(AddProductCommentModel):
    id: int
    user_id: int
    user_name: str
    date_added: datetime.datetime