import datetime
from schemas.base_schemas import BaseSchema
from schemas.product_schemas import ProductDisplay
from schemas.store_schema import StoreDisplay



class AddProductCommentModel(BaseSchema):
    product_id: int
    text: str


class ProductCommentDisplay(AddProductCommentModel):
    id: int
    user_id: int
    user_name: str
    date_added: datetime.datetime


class FullProductCommentDisplay(BaseSchema):
    product_comment: ProductCommentDisplay
    product: ProductDisplay
    store: StoreDisplay