from fastapi import APIRouter
from functions import add_store_request_functions
from dependencies.dependencies import DB_DEPENDENCY
from schemas.add_store_request_schemas import AddStoreRequestDisplay, AddAddStoreRequestModel


router = APIRouter(
    prefix='/add_store_request',
    tags=['Add Store Request']
)


@router.post('/send_add_store_request', status_code=201, response_model=AddStoreRequestDisplay)
async def send_add_store_request(request: AddAddStoreRequestModel, db: DB_DEPENDENCY):
    return await add_store_request_functions.send_add_store_request(request=request, db=db)