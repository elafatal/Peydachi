from database.models import City, Region, Store
from sqlalchemy.orm import Session
from sqlalchemy import and_
from errors.city_errors import NO_CITY_FOUND_ERROR, CITY_NOT_FOUND_ERROR, CITY_ALREADY_EXISTS_ERROR
from errors.region_errors import REGION_NOT_FOUND_ERROR
from schemas.city_schemas import CityModel, CityUpdateModel


async def get_city_by_id(cit_id: int, db: Session):
    city = db.query(City).filter(City.id == cit_id).first()

    if not city:
        raise CITY_NOT_FOUND_ERROR

    return city

async def get_all_cities(db: Session):
    cities = db.query(City).all()

    if not cities:
        raise NO_CITY_FOUND_ERROR

    return cities


async def get_cities_of_region(region_id: int, db: Session):
    cities = db.query(City).filter(City.region_id == region_id).all()

    if not cities:
        raise NO_CITY_FOUND_ERROR

    return cities


async def search_city_by_name(city_name: str, db: Session):
    cities = db.query(City).filter(City.name.contains(city_name)).all()

    if not cities:
        raise NO_CITY_FOUND_ERROR

    return cities


async def search_city_in_region(city_name: str, region_id: int, db: Session):
    cities = db.query(City).filter(and_(City.name.contains(city_name), City.region_id == region_id)).all()

    if not cities:
        raise NO_CITY_FOUND_ERROR

    return cities


async def add_city(info: CityModel, db: Session):
    check_name = db.query(City).filter(and_(City.name == info.name, City.region_id == info.region_id)).first()
    if check_name:
        raise CITY_ALREADY_EXISTS_ERROR

    city = City(
        name=info.name,
        region_id=info.region_id
    )

    db.add(city)
    db.commit()

    return city


async def delete_city(city_id: int, db: Session):
    city = db.query(City).filter(City.id == city_id).first()

    if not city:
        raise CITY_NOT_FOUND_ERROR
    
    db.query(Store).filter(Store.city_id == city_id).update({"city_id": None})

    db.delete(city)
    db.commit()

    return f'City {city.name} deleted.'


async def update_city(info: CityUpdateModel, db: Session):
    city = db.query(City).filter(City.id == info.city_id).first()

    if not city:
        raise CITY_NOT_FOUND_ERROR

    if info.name:
        city.name = info.name

    if info.region_id:
        region = db.query(Region).filter(Region.id == info.region_id).first()

        if not region:
            raise REGION_NOT_FOUND_ERROR
        
        city.region_id = info.region_id

    db.commit()

    return city


