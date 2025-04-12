from schemas.base_schemas import BaseSchema


class AddStoreCommentModel(BaseSchema):
    store_id: int
    text: str


class StoreCommentDisplay(AddStoreCommentModel):
    id: int
    user_id: int
    username: str
    date_added: str