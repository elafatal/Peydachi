from fastapi import APIRouter
from functions import category_functions
from dependencies.dependencies import DB_DEPENDENCY
from dependencies.body_dependencies import ID_BODY, NAME_BODY
from dependencies.access_dependencies import ROUTER_ADMIN_DEPENDENCY
from schemas.category_schema import (
    CategoryDisplay,
    AddCategoryRelationModel,
    CategoryRelationDisplay,
    UpdateCategoryModel,
    AddRemoveStoreCategoryModel
)


router = APIRouter(
    prefix='/admin/category',
    tags=['Admin Category'],
    dependencies=[ROUTER_ADMIN_DEPENDENCY]
)


@router.post('/add_category', status_code=201, response_model=CategoryDisplay)
async def add_category(name: NAME_BODY, db: DB_DEPENDENCY):
    return await category_functions.add_category(name=name, db=db)


@router.delete('/delete_category', status_code=200)
async def delete_category(name: NAME_BODY, db: DB_DEPENDENCY):
    return await category_functions.delete_category(name=name, db=db)


@router.put('/change_category_name', status_code=200, response_model=CategoryDisplay)
async def change_category_name(update_info: UpdateCategoryModel, db: DB_DEPENDENCY):
    return await category_functions.change_category_name(update=update_info, db=db)


@router.get('/get_all_categories', status_code=200, response_model=list[CategoryDisplay])
async def get_all_categories(db: DB_DEPENDENCY):
    return await category_functions.get_all_categories(db=db)


@router.post('/add_category_to_store', status_code=200)
async def add_category_to_store(store_category: AddRemoveStoreCategoryModel, db: DB_DEPENDENCY):
    return await category_functions.add_category_to_store(store_category=store_category, db=db)


@router.delete('/remove_category_from_store', status_code=200)
async def remove_category_from_store(store_category: AddRemoveStoreCategoryModel, db: DB_DEPENDENCY):
    return await category_functions.remove_category_from_store(store_category=store_category, db=db)


@router.post('/add_category_relation', status_code=200, response_model=CategoryRelationDisplay)
async def add_category_relation(category_relation: AddCategoryRelationModel, db: DB_DEPENDENCY):
    return await category_functions.add_category_relation(category_relation=category_relation, db=db)


@router.delete('/remove_category_relation', status_code=200)
async def remove_category_relation(category_relation_id: ID_BODY, db: DB_DEPENDENCY):
    return await category_functions.remove_category_relation(category_relation_id=category_relation_id, db=db)


@router.post('/get_all_relations_of_category', status_code=200, response_model=list[CategoryRelationDisplay])
async def get_all_relations_of_category(category_id: ID_BODY, db: DB_DEPENDENCY):
    return await category_functions.get_all_relations_of_category(category_id=category_id, db=db)