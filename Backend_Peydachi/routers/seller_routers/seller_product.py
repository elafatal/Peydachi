from fastapi import APIRouter, UploadFile, Form
from functions import product_functions
from dependencies.dependencies import DB_DEPENDENCY
from dependencies.body_dependencies import ID_BODY
from dependencies.access_dependencies import SELLER_DEPENDENCY
from dependencies.limiter_dependencies import LIMIT_10_PER_MINUTE_DEPENDENCY
from schemas.product_schemas import ProductDisplay, UpdateProductModel


router = APIRouter(
    prefix='/seller/product',
    tags=['Seller Product'],
    dependencies=[LIMIT_10_PER_MINUTE_DEPENDENCY]
)

@router.post('/add_product', status_code=201, response_model=ProductDisplay)
async def add_product(db: DB_DEPENDENCY, seller: SELLER_DEPENDENCY, name: str = Form(...), description: str = Form(None),  quantity: int = Form(None),  pic: UploadFile | None = None):
    return await product_functions.add_product(name=name, db=db, owner_id=seller.id, description=description, quantity=quantity, pic=pic)


@router.put('/update_product', status_code=200, response_model=ProductDisplay)
async def update_product(product_info: UpdateProductModel, db: DB_DEPENDENCY, seller: SELLER_DEPENDENCY):
    return await product_functions.update_product(product_info=product_info, db=db, owner_id=seller.id)


@router.put('/add_product_pic', status_code=200, response_model=ProductDisplay)
async def add_product_pic(product_id: ID_BODY, pic: UploadFile, db: DB_DEPENDENCY, seller: SELLER_DEPENDENCY):
    return await product_functions.add_product_pic(product_id=product_id, pic=pic, db=db, owner_id=seller.id)


@router.put('/remove_product_pic', status_code=200, response_model=ProductDisplay)
async def remove_product_pic(product_id: ID_BODY, db: DB_DEPENDENCY, seller: SELLER_DEPENDENCY):
    return await product_functions.remove_product_pic(product_id=product_id, db=db, owner_id=seller.id)


@router.delete('/delete_product', status_code=200)
async def delete_product(product_id: ID_BODY, db: DB_DEPENDENCY, seller: SELLER_DEPENDENCY):
    return await product_functions.delete_product(product_id=product_id, db=db, owner_id=seller.id)


@router.put('/update_product_quantity', status_code=200, response_model=ProductDisplay)
async def update_product_quantity(product_id: ID_BODY, quantity: ID_BODY, db: DB_DEPENDENCY, seller: SELLER_DEPENDENCY):
    return await product_functions.update_product_quantity(product_id=product_id, quantity=quantity, db=db, owner_id=seller.id)


@router.get('/get_self_products', status_code=200, response_model=list[ProductDisplay])
async def get_self_products(db: DB_DEPENDENCY, seller: SELLER_DEPENDENCY):
    return await product_functions.get_self_products(user_id=seller.id, db=db)

