import datetime
from sqlalchemy import and_
from sqlalchemy.orm import Session
from database.models import AddStoreRequest
from schemas.add_store_request_schemas import AddAddStoreRequestModel
from errors.add_store_request_errors import (
    ADD_STORE_REQUEST_ALREADY_REVIEWED_ERROR,
    NO_ADD_STORE_REQUEST_FOUND_ERROR,
    ADD_STORE_REQUEST_NOT_FOUND_ERROR
)


async def get_add_store_request(request_id: int, db: Session):
    request = db.query(AddStoreRequest).filter(AddStoreRequest.id == request_id).first()

    if not request:
        raise ADD_STORE_REQUEST_NOT_FOUND_ERROR

    return request


async def send_add_store_request(request: AddAddStoreRequestModel, db: Session):
    request = AddStoreRequest(
        store_name=request.store_name,
        phone_number=request.phone_number,
        region_id=request.region_id if request.region_id else None,
        city_id=request.city_id if request.city_id else None,
        description=request.description if request.description else None,
        address=request.address
    )

    db.add(request)
    db.commit()
    db.refresh(request)

    return request


async def get_requests_to_review(db: Session):
    requests = db.query(AddStoreRequest).filter(AddStoreRequest.is_reviewed == False).order_by(AddStoreRequest.date_added.asc()).all()

    if not requests:
        raise NO_ADD_STORE_REQUEST_FOUND_ERROR

    return requests


async def get_all_add_store_requests(db: Session):
    requests = db.query(AddStoreRequest).order_by(AddStoreRequest.date_added.asc()).all()

    if not requests:
        raise NO_ADD_STORE_REQUEST_FOUND_ERROR

    return requests


async def search_add_store_requests(request_text: str, db: Session):
    requests = db.query(AddStoreRequest).filter(AddStoreRequest.store_name.contains(request_text)).all()

    if not requests:
        raise NO_ADD_STORE_REQUEST_FOUND_ERROR

    return requests


async def search_reviewed_add_store_requests(request_text: str, db: Session):
    requests = db.query(AddStoreRequest).filter(and_(AddStoreRequest.store_name.contains(request_text), AddStoreRequest.is_reviewed == True)).all()

    if not requests:
        raise NO_ADD_STORE_REQUEST_FOUND_ERROR

    return requests


async def search_not_reviewed_add_store_requests(request_text: str, db: Session):
    requests = db.query(AddStoreRequest).filter(and_(AddStoreRequest.store_name.contains(request_text), AddStoreRequest.is_reviewed == False)).all()

    if not requests:
        raise NO_ADD_STORE_REQUEST_FOUND_ERROR

    return requests


async def get_all_reviewed_add_store_requests(db: Session):
    requests = db.query(AddStoreRequest).filter(AddStoreRequest.is_reviewed == True).all()

    if not requests:
        raise NO_ADD_STORE_REQUEST_FOUND_ERROR

    return requests


async def review_add_store_request(request_id: int, db: Session):
    request = db.query(AddStoreRequest).filter(AddStoreRequest.id == request_id).first()
    if not request:
        raise ADD_STORE_REQUEST_NOT_FOUND_ERROR

    if request.is_reviewed:
        raise ADD_STORE_REQUEST_ALREADY_REVIEWED_ERROR

    request.is_reviewed = True
    db.commit()

    return request


async def remove_add_store_request(request_id: int, db: Session):
    request = db.query(AddStoreRequest).filter(AddStoreRequest.id == request_id).first()
    if not request:
        raise ADD_STORE_REQUEST_NOT_FOUND_ERROR

    db.delete(request)
    db.commit()

    return 'Request Deleted.'


async def remove_all_reviewed_add_store_requests(db: Session):
    requests = db.query(AddStoreRequest).filter(AddStoreRequest.is_reviewed == True)
    if not requests:
        raise NO_ADD_STORE_REQUEST_FOUND_ERROR

    requests.delete(synchronize_session=False)
    db.commit()

    return 'All Reviewed Requests Deleted.'


async def get_all_add_store_requests_of_region(region_id: int, db: Session):
    requests = db.query(AddStoreRequest).filter(AddStoreRequest.region_id == region_id).all()

    if not requests:
        raise NO_ADD_STORE_REQUEST_FOUND_ERROR

    return requests


async def get_all_add_store_requests_of_region_to_review(region_id: int, db: Session):
    requests = db.query(AddStoreRequest).filter(and_(AddStoreRequest.region_id == region_id, AddStoreRequest.is_reviewed == False)).all()

    if not requests:
        raise NO_ADD_STORE_REQUEST_FOUND_ERROR

    return requests


async def get_all_add_store_requests_of_city(city_id: int, db: Session):
    requests = db.query(AddStoreRequest).filter(AddStoreRequest.city_id == city_id).all()

    if not requests:
        raise NO_ADD_STORE_REQUEST_FOUND_ERROR

    return requests


async def get_all_add_store_requests_of_city_to_review(city_id: int, db: Session):
    requests = db.query(AddStoreRequest).filter(and_(AddStoreRequest.city_id == city_id, AddStoreRequest.is_reviewed == False)).all()

    if not requests:
        raise NO_ADD_STORE_REQUEST_FOUND_ERROR

    return requests


async def get_all_reviewed_add_store_requests_of_region(region_id: int, db: Session):
    requests = db.query(AddStoreRequest).filter(and_(AddStoreRequest.region_id == region_id, AddStoreRequest.is_reviewed == True)).all()

    if not requests:
        raise NO_ADD_STORE_REQUEST_FOUND_ERROR

    return requests


async def get_all_reviewed_add_store_requests_of_city(city_id: int, db: Session):
    requests = db.query(AddStoreRequest).filter(and_(AddStoreRequest.city_id == city_id, AddStoreRequest.is_reviewed == True)).all()

    if not requests:
        raise NO_ADD_STORE_REQUEST_FOUND_ERROR

    return requests