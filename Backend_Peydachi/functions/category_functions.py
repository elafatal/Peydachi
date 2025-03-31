from database.models import Category, CategoryRelation, Store, StoreCategory
from sqlalchemy.orm import Session
from sqlalchemy import and_, delete
from errors.category_errors import (
    CATEGORY_NOT_FOUND_ERROR,
    NO_CATEGORY_FOUND_ERROR,
    CATEGORY_ALREADY_EXISTS_ERROR,
    CATEGORY_RELATION_ALREADY_EXISTS_ERROR
)
from errors.store_errors import STORE_NOT_FOUND_ERROR
from schemas.category_schema import AddCategoryRelationModel, UpdateCategoryModel, AddRemoveStoreCategoryModel



async def add_category(name: str, db: Session):
    category = db.query(Category).filter(Category.name == name).first()
    if category:
        raise CATEGORY_ALREADY_EXISTS_ERROR

    category = Category(name=name)
    db.add(category)
    db.commit()
    db.refresh(category)

    return category


async def delete_category(name: str, db: Session):
    category = db.query(Category).filter(Category.name == name).first()
    if not category:
        raise CATEGORY_NOT_FOUND_ERROR

    category_relations = delete(CategoryRelation).where(CategoryRelation.category_id == category.id)
    db.execute(category_relations)

    db.delete(category)
    db.commit()

    return f'Category {category.name} deleted'


async def change_category_name(update: UpdateCategoryModel, db: Session):
    category = db.query(Category).filter(Category.id == update.id).first()
    if not category:
        raise CATEGORY_NOT_FOUND_ERROR

    category.name = update.name
    db.commit()
    db.refresh(category)

    return category


async def search_category(name: str, db: Session):
    categories = db.query(Category).filter(Category.name.match(name)).all()
    if not categories:
        raise NO_CATEGORY_FOUND_ERROR

    return categories


async def get_all_categories(db: Session):
    categories = db.query(Category).all()
    if not categories:
        raise NO_CATEGORY_FOUND_ERROR

    return categories


async def add_category_to_store(store_category: AddRemoveStoreCategoryModel, db: Session):
    store = db.query(Store).filter(Store.id == store_category.store_id).first()
    if not store:
        raise STORE_NOT_FOUND_ERROR

    category = db.query(Category).filter(Category.id == store_category.category_id).first()
    if not category:
        raise CATEGORY_NOT_FOUND_ERROR

    new_store_category = StoreCategory(
        store_id=store_category.store_id,
        category_id=store_category.category_id
    )
    db.add(new_store_category)
    db.commit()

    return f'Category {category.name} added to store {store.name}'


async def remove_category_from_store(store_category: AddRemoveStoreCategoryModel, db: Session):
    store = db.query(Store).filter(Store.id == store_category.store_id).first()
    if not store:
        raise STORE_NOT_FOUND_ERROR

    category = db.query(Category).filter(Category.id == store_category.category_id).first()
    if not category:
        raise CATEGORY_NOT_FOUND_ERROR

    store_category = db.query(StoreCategory).filter(and_(StoreCategory.store_id == store_category.store_id, StoreCategory.category_id == store_category.category_id)).first()
    if not store_category:
        raise CATEGORY_NOT_FOUND_ERROR

    db.delete(store_category)
    db.commit()

    return f'Category {category.name} removed from store {store.name}'


async def add_category_relation(category_relation: AddCategoryRelationModel, db: Session):
    category = db.query(Category).filter(Category.id == category_relation.category_id).first()
    if not category:
        raise CATEGORY_NOT_FOUND_ERROR

    category_relation_check = db.query(CategoryRelation).filter(and_(CategoryRelation.word == category_relation.word, CategoryRelation.category_id == category_relation.category_id)).first()
    if category_relation_check:
        raise CATEGORY_RELATION_ALREADY_EXISTS_ERROR

    new_category_relation = CategoryRelation(
        category_id=category_relation.category_id,
        word=category_relation.word
    )
    db.add(new_category_relation)
    db.commit()

    return new_category_relation


async def remove_category_relation(category_relation_id: int, db: Session):
    category_relation = db.query(CategoryRelation).filter(CategoryRelation.id == category_relation_id).first()
    if not category_relation:
        raise CATEGORY_NOT_FOUND_ERROR

    db.delete(category_relation)
    db.commit()

    return 'Category Relation Deleted'


async def get_all_categories_of_store(store_id: int, db: Session):
    store = db.query(Store).filter(Store.id == store_id).first()
    if not store:
        raise STORE_NOT_FOUND_ERROR

    categories = db.query(StoreCategory).filter(StoreCategory.store_id == store_id).all()
    if not categories:
        raise NO_CATEGORY_FOUND_ERROR

    return categories


async def get_all_relations_of_category(category_id: int, db: Session):
    category = db.query(Category).filter(Category.id == category_id).first()
    if not category:
        raise CATEGORY_NOT_FOUND_ERROR

    relations = db.query(CategoryRelation).filter(CategoryRelation.category_id == category_id).all()
    if not relations:
        raise NO_CATEGORY_FOUND_ERROR

    return relations
