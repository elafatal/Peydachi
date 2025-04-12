from schemas.base_schemas import BaseSchema


class AddProductCommentModel(BaseSchema):
    product_id: int
    text: str


class ProductCommentDisplay(AddProductCommentModel):
    id: int
    user_id: int
    username: str
    date_added: str