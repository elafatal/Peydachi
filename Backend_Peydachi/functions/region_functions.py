from database.models import Region, City, Store
from sqlalchemy.orm import Session
from errors.region_errors import REGION_NOT_FOUND_ERROR, NO_REGION_FOUND_ERROR, REGION_ALREADY_EXISTS


async def get_region_by_id(region_id: int, db: Session):
    region = db.query(Region).filter(Region.id == region_id).first()

    if not region:
        raise REGION_NOT_FOUND_ERROR

    return region


async def get_all_regions(db: Session):
    regions = db.query(Region).all()

    if not regions:
        raise NO_REGION_FOUND_ERROR

    return regions


async def search_region_by_name(region_name: str, db: Session):
    regions = db.query(Region).filter(Region.name.contains(region_name)).all()

    if not regions:
        raise NO_REGION_FOUND_ERROR

    return regions


async def add_region(name: str, db: Session):
    check_name = db.query(Region).filter(Region.name == name).first()
    if check_name:
        raise REGION_ALREADY_EXISTS

    region = Region(
        name=name
    )

    db.add(region)
    db.commit()

    return region


async def delete_region(region_id: int, db: Session):
    region = db.query(Region).filter(Region.id == region_id).first()

    if not region:
        raise REGION_NOT_FOUND_ERROR
    
    cities = db.query(City).filter(City.region_id == region_id).all()
    for city in cities:
        db.query(Store).filter(Store.city_id == city.id).update({"city_id": None})
        db.delete(city)

    db.delete(region)
    db.commit()

    return f'Region deleted'



async def update_region(region_id: int, name: str, db: Session):
    region = db.query(Region).filter(Region.id == region_id).first()

    if not region:
        raise REGION_NOT_FOUND_ERROR

    region.name = name
    db.commit()

    return region