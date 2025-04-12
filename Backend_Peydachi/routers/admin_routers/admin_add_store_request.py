from fastapi import APIRouter
from functions import add_store_request_functions
from dependencies.dependencies import DB_DEPENDENCY
from dependencies.body_dependencies import ID_BODY, NAME_BODY
from dependencies.access_dependencies import ROUTER_ADMIN_DEPENDENCY
from schemas.add_store_request_schemas import AddStoreRequestDisplay, AddAddStoreRequestModel


router = APIRouter(
    prefix='/admin/add_store_request',
    tags=['Admin Add Store Request'],
    dependencies=[ROUTER_ADMIN_DEPENDENCY]
)


@router.post('/get_add_store_request', status_code=200, response_model=AddStoreRequestDisplay)
async def get_add_store_request(request_id: ID_BODY, db: DB_DEPENDENCY):
    return await add_store_request_functions.get_add_store_request(request_id, db)


@router.get('/get_requests_to_review', status_code=200, response_model=list[AddStoreRequestDisplay])
async def get_requests_to_review(db: DB_DEPENDENCY):
    return await add_store_request_functions.get_requests_to_review(db)


@router.get('/get_all_add_store_requests', status_code=200, response_model=list[AddStoreRequestDisplay])
async def get_all_add_store_requests(db: DB_DEPENDENCY):
    return await add_store_request_functions.get_all_add_store_requests(db)


@router.post('/search_add_store_requests', status_code=200, response_model=list[AddStoreRequestDisplay])
async def search_add_store_requests(request_text: NAME_BODY, db: DB_DEPENDENCY):
    return await add_store_request_functions.search_add_store_requests(request_text=request_text, db=db)


@router.post('/search_reviewed_add_store_requests', status_code=200, response_model=list[AddStoreRequestDisplay])
async def search_reviewed_add_store_requests(request_text: NAME_BODY, db: DB_DEPENDENCY):
    return await add_store_request_functions.search_reviewed_add_store_requests(request_text=request_text, db=db)


@router.post('/search_not_reviewed_add_store_requests', status_code=200, response_model=list[AddStoreRequestDisplay])
async def search_not_reviewed_add_store_requests(request_text: NAME_BODY, db: DB_DEPENDENCY):
    return await add_store_request_functions.search_not_reviewed_add_store_requests(request_text=request_text, db=db)


@router.get('/get_all_reviewed_add_store_requests', status_code=200, response_model=list[AddStoreRequestDisplay])
async def get_all_reviewed_add_store_requests(db: DB_DEPENDENCY):
    return await add_store_request_functions.get_all_reviewed_add_store_requests(db)


@router.put('/review_add_store_request', status_code=200, response_model=AddStoreRequestDisplay)
async def review_add_store_request(request_id: ID_BODY, db: DB_DEPENDENCY):
    return await add_store_request_functions.review_add_store_request(request_id=request_id, db=db)


@router.delete('/remove_add_store_request', status_code=200)
async def remove_add_store_request(request_id: ID_BODY, db: DB_DEPENDENCY):
    return await add_store_request_functions.remove_add_store_request(request_id=request_id, db=db)


@router.delete('/remove_all_reviewed_add_store_requests', status_code=200)
async def remove_all_reviewed_add_store_requests(db: DB_DEPENDENCY):
    return await add_store_request_functions.remove_all_reviewed_add_store_requests(db=db)


@router.post('/get_all_add_store_requests_of_region', status_code=200, response_model=list[AddStoreRequestDisplay])
async def get_all_add_store_requests_of_region(region_id: ID_BODY, db: DB_DEPENDENCY):
    return await add_store_request_functions.get_all_add_store_requests_of_region(region_id=region_id, db=db)


@router.post('/get_all_add_store_requests_of_region_to_review', status_code=200, response_model=list[AddStoreRequestDisplay])
async def get_all_add_store_requests_of_region_to_review(region_id: ID_BODY, db: DB_DEPENDENCY):
    return await add_store_request_functions.get_all_add_store_requests_of_region_to_review(region_id=region_id, db=db)


@router.post('/get_all_add_store_requests_of_city', status_code=200, response_model=list[AddStoreRequestDisplay])
async def get_all_add_store_requests_of_city(city_id: ID_BODY, db: DB_DEPENDENCY):
    return await add_store_request_functions.get_all_add_store_requests_of_city(city_id=city_id, db=db)


@router.post('/get_all_add_store_requests_of_city_to_review', status_code=200, response_model=list[AddStoreRequestDisplay])
async def get_all_add_store_requests_of_city_to_review(city_id: ID_BODY, db: DB_DEPENDENCY):
    return await add_store_request_functions.get_all_add_store_requests_of_city_to_review(city_id=city_id, db=db)


@router.post('/get_all_reviewed_add_store_requests_of_region', status_code=200, response_model=list[AddStoreRequestDisplay])
async def get_all_reviewed_add_store_requests_of_region(region_id: ID_BODY, db: DB_DEPENDENCY):
    return await add_store_request_functions.get_all_reviewed_add_store_requests_of_region(region_id=region_id, db=db)


@router.post('/get_all_reviewed_add_store_requests_of_city', status_code=200, response_model=list[AddStoreRequestDisplay])
async def get_all_reviewed_add_store_requests_of_city(city_id: ID_BODY, db: DB_DEPENDENCY):
    return await add_store_request_functions.get_all_reviewed_add_store_requests_of_city(city_id=city_id, db=db)