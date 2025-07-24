from database.models import CityCenter, City
from sqlalchemy.orm import Session
from errors.city_center_errors import NO_CITY_CENTER_FOUND_ERROR, CITY_CENTER_NOT_FOUND_ERROR, CITY_CENTER_ALREADY_EXISTS_ERROR
from errors.city_errors import CITY_NOT_FOUND_ERROR, NO_CITY_FOUND_ERROR
from schemas.city_center_schemas import AddCityCenterModel




async def add_city_center(city_center: AddCityCenterModel, db: Session):
    city = db.query(City).filter(City.id == city_center.city_id).first()
    if not city:
        raise CITY_NOT_FOUND_ERROR


    city_center_check = db.query(CityCenter).filter(CityCenter.city_id == city_center.city_id).first()
    if city_center_check:
        raise CITY_CENTER_ALREADY_EXISTS_ERROR


    new_city_center = CityCenter(
        city_id=city_center.city_id,
        longitude=city_center.longitude,
        latitude=city_center.latitude
    )

    db.add(new_city_center)
    db.commit()

    return new_city_center



async def get_center_of_city(city_id: int, db: Session):
    city = db.query(CityCenter).filter(CityCenter.id == city_id).first()
    if not city:
        raise CITY_CENTER_NOT_FOUND_ERROR

    city_center = db.query(CityCenter).filter(CityCenter.city_id == city_id).first()
    if not city_center:
        raise CITY_CENTER_NOT_FOUND_ERROR

    return city_center


async def update_city_center(new_city_center: AddCityCenterModel, db: Session):
    city_center = db.query(CityCenter).filter(CityCenter.city_id == new_city_center.city_id).first()
    if not city_center:
        raise CITY_CENTER_NOT_FOUND_ERROR

    city_center.longitude = new_city_center.longitude
    city_center.latitude = new_city_center.latitude

    db.commit()
    db.refresh(city_center)

    return city_center



async def delete_city_center(city_id: int, db: Session):
    city_center = db.query(CityCenter).filter(CityCenter.city_id == city_id).first()
    if not city_center:
        raise CITY_CENTER_NOT_FOUND_ERROR

    db.delete(city_center)
    db.commit()

    return 'City center deleted'


async def get_city_centers_of_region(region_id: int, db: Session):
    city_ids_tuple = db.query(City.id).filter(City.region_id == region_id).all()
    if not city_ids_tuple:
        NO_CITY_FOUND_ERROR


    city_ids = []
    for city_id in city_ids_tuple:
        city_ids.append(city_id[0])

    city_centers = db.query(CityCenter).filter(CityCenter.city_id.in_(city_ids)).all()
    if not city_centers:
        NO_CITY_CENTER_FOUND_ERROR

    return city_centers