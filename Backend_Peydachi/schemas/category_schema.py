from schemas.base_schemas import BaseSchema


class CategoryDisplay(BaseSchema):
    id: int
    name: str


class UpdateCategoryModel(BaseSchema):
    id: int
    name: str


class AddCategoryRelationModel(BaseSchema):
    category_id: int
    word: str


class CategoryRelationDisplay(BaseSchema):
    id: int
    category_id: int
    word: str


class AddRemoveStoreCategoryModel(BaseSchema):
    store_id: int
    category_id: int