import re
from datetime import datetime
from database.database import Base
from sqlalchemy.orm import validates
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Boolean, Float, JSON
from errors.user_errors import (
    USERNAME_CAN_NOT_HAVE_SPACE_ERROR, 
    USERNAME_MUST_BE_LONGER_THAN_3_CHARACTERS_ERROR,
    PASSWORD_MUST_BE_LONGER_THAN_6_CHARACTERS_ERROR,
    PHONE_NUMBER_CAN_NOT_BE_EMPTY_ERROR,
    INVALID_PHONE_NUMBER_ERROR,
)
from errors.store_errors import STORE_NAME_MUST_BE_LONGER_THAN_3_CHARACTERS_ERROR
from errors.product_errors import (
    PRODUCT_NAME_MUST_BE_LONGER_THAN_3_CHARACTERS_ERROR,
    PRODUCT_QUANTITY_CAN_NOT_BE_NEGATIVE_ERROR
)
    


# ID Class ==================================================================================================
class ID:
    __abstract__ = True
    id = Column(Integer, unique=True, index=True, primary_key=True)


# User Class ================================================================================================
class User(ID, Base):
    __tablename__ = "user"
    username = Column(String(150), unique=True, nullable=False)
    password = Column(String(150), nullable=False)
    phone_number = Column(String(50), unique=True, nullable=False)
    email = Column(String(50), unique=True, nullable=True)
    is_seller = Column(Boolean, default=False)
    is_admin = Column(Boolean, default=False)
    is_super_admin = Column(Boolean, default=False)
    is_banned = Column(Boolean, default=False)


    @validates("username")
    def validate_username(self, key, value):
        if not value or len(value.strip()) < 3:
            raise USERNAME_MUST_BE_LONGER_THAN_3_CHARACTERS_ERROR
        if " " in value:
            raise USERNAME_CAN_NOT_HAVE_SPACE_ERROR
        return value
    

    @validates("password")
    def validate_password(self, key, value):
        if not value or len(value) < 6:
            raise PASSWORD_MUST_BE_LONGER_THAN_6_CHARACTERS_ERROR
        return value
    
    
    @validates("phone_number")
    def validate_phone_number(self, key, value):

        if not value:
            raise PHONE_NUMBER_CAN_NOT_BE_EMPTY_ERROR

        iran_national = re.match(r"^09\d{9}$", value)
        iran_international = re.match(r"^\+989\d{9}$", value)

        if not (iran_national or iran_international):
            raise INVALID_PHONE_NUMBER_ERROR
        
        return value


# Region Class ==============================================================================================
class Region(ID, Base):
    __tablename__ = "region"
    name = Column(String(150), nullable=False)


# City Class ================================================================================================
class City(ID, Base):
    __tablename__ = "city"
    name = Column(String(150), nullable=False)
    region_id = Column(Integer, ForeignKey("region.id", ondelete="CASCADE"), nullable=False)


# Store Class ===============================================================================================
class Store(ID, Base):
    __tablename__ = "store"
    name = Column(String(150), nullable=False)
    owner_id = Column(Integer, ForeignKey("user.id", ondelete="SET NULL"), nullable=True)
    contact_info = Column(JSON, nullable=True)
    description = Column(String(500), nullable=True)
    location_longitude = Column(String, nullable=True)
    location_latitude = Column(String, nullable=True)
    average_rating = Column(Float, nullable=True)
    average_product_rating = Column(Float, nullable=True)
    date_added = Column(DateTime, nullable=False, default=datetime.utcnow)
    is_banned = Column(Boolean, default=False)
    city_id = Column(Integer, ForeignKey("city.id", ondelete="SET NULL"), nullable=True)


    @validates("name")
    def validate_name(self, key, value):
        if not value or len(value.strip()) <= 3:
            raise STORE_NAME_MUST_BE_LONGER_THAN_3_CHARACTERS_ERROR
        return value.strip()


# Product Class =============================================================================================
class Product(ID, Base):
    __tablename__ = "product"
    store_id = Column(Integer, ForeignKey("store.id", ondelete="CASCADE"), nullable=False)
    name = Column(String(150), nullable=False)
    description = Column(String(500), nullable=True)
    pic_url = Column(String(500), nullable=True)
    pic_name = Column(String, nullable=True)
    average_rating = Column(Float, nullable=True)
    date_added = Column(DateTime, nullable=False, default=datetime.utcnow)
    quantity = Column(Integer, nullable=False)
    city_id = Column(Integer, ForeignKey("city.id", ondelete="SET NULL"), nullable=False)


    @validates("name")
    def validate_name(self, key, value):
        if not value or len(value.strip()) <= 3:
            raise PRODUCT_NAME_MUST_BE_LONGER_THAN_3_CHARACTERS_ERROR
        return value.strip()
    

    @validates("quantity")
    def validate_quantity(self, key, value):
        if value is not None and value < 0:
            raise PRODUCT_QUANTITY_CAN_NOT_BE_NEGATIVE_ERROR
        return value


# Store Comments Class ======================================================================================
class StoreComment(ID, Base):
    __tablename__ = "store_comment"
    store_id = Column(Integer, ForeignKey("store.id", ondelete="CASCADE"), nullable=False)
    user_id = Column(Integer, ForeignKey("user.id", ondelete="CASCADE"), nullable=False)
    user_name = Column(String(150), nullable=False)
    text = Column(String(500), nullable=False)
    date_added = Column(DateTime, nullable=False, default=datetime.utcnow)


# Product Comments Class ===================================================================================
class ProductComment(ID, Base):
    __tablename__ = "product_comment"
    product_id = Column(Integer, ForeignKey("product.id", ondelete="CASCADE"), nullable=False)
    user_id = Column(Integer, ForeignKey("user.id", ondelete="CASCADE"), nullable=False)
    user_name = Column(String(150), nullable=False)
    text = Column(String(500), nullable=False)
    date_added = Column(DateTime, nullable=False, default=datetime.utcnow)


# Category Class ===========================================================================================
class Category(ID, Base):
    __tablename__ = "category"
    name = Column(String(150), nullable=False)


# Store Category Class =====================================================================================
class StoreCategory(ID, Base):
    __tablename__ = "store_category"
    store_id = Column(Integer, ForeignKey("store.id", ondelete="CASCADE"), nullable=False)
    category_id = Column(Integer, ForeignKey("category.id", ondelete="CASCADE"), nullable=False)


# Category Relation Class =================================================================================
class CategoryRelation(ID, Base):
    __tablename__ = "category_relation"
    category_id = Column(Integer, ForeignKey("category.id", ondelete="CASCADE"), nullable=False)
    word = Column(String, nullable=False)



# Product Rating Class ====================================================================================
class ProductRating(ID, Base):
    __tablename__ = "product_rating"
    product_id = Column(Integer, ForeignKey("product.id", ondelete="CASCADE"), nullable=False)
    user_id = Column(Integer, ForeignKey("user.id", ondelete="CASCADE"), nullable=False)
    store_id = Column(Integer, ForeignKey("store.id", ondelete="CASCADE"), nullable=False)
    rating = Column(Integer, nullable=False)


# Store Rating Class ======================================================================================
class StoreRating(ID, Base):
    __tablename__ = "store_rating"
    store_id = Column(Integer, ForeignKey("store.id", ondelete="CASCADE"), nullable=False)
    user_id = Column(Integer, ForeignKey("user.id", ondelete="CASCADE"), nullable=False)
    rating = Column(Integer, nullable=False)


# Notification Class ======================================================================================
class Notification(ID, Base):
    __tablename__ = "notification"
    user_id = Column(Integer, ForeignKey("user.id", ondelete="CASCADE"), nullable=False)
    title = Column(String(200), nullable=False)
    text = Column(String(500), nullable=False)
    admin_id = Column(Integer, ForeignKey("user.id", ondelete="SET NULL"), nullable=True)
    has_seen = Column(Boolean, default=False)
    date_added = Column(DateTime, nullable=False, default=datetime.utcnow)


# Report Class ============================================================================================
class Report(ID, Base):
    __tablename__ = "report"
    title = Column(String(200), nullable=False)
    text = Column(String, nullable=False)
    is_reviewed = Column(Boolean, default=False)
    date_added = Column(DateTime, nullable=False, default=datetime.utcnow)


# Comment Report Class ====================================================================================
class CommentReport(ID, Base):
    __tablename__ = "comment_report"
    comment_id = Column(Integer, ForeignKey("store_comment.id", ondelete="CASCADE"), nullable=False)
    text = Column(String, nullable=False)
    is_reviewed = Column(Boolean, default=False)
    is_store = Column(Boolean, default=False) # True: It's store comment , False: It's product comment
    date_added = Column(DateTime, nullable=False, default=datetime.utcnow)


# Add Store Request Class =================================================================================
class AddStoreRequest(ID, Base):
    __tablename__ = "add_store_request"
    store_name = Column(String(150), nullable=False)
    phone_number = Column(String(20), nullable=False)
    region_id = Column(Integer, ForeignKey("region.id", ondelete="SET NULL"), nullable=True)
    city_id = Column(Integer, ForeignKey("city.id", ondelete="SET NULL"), nullable=True)
    address = Column(String(500), nullable=False)
    date_added = Column(DateTime, nullable=False, default=datetime.utcnow)
    description = Column(String(600), nullable=True)
    is_reviewed = Column(Boolean, default=False)


# Deleted Picture Class ===================================================================================
class DeletedPics(Base, ID):
    __tablename__ = 'deleted_pics'
    name = Column(String, nullable=False)
    is_reviewed = Column(Boolean, default=False)


# City Center Class =======================================================================================
class CityCenter(ID, Base):
    __tablename__ = "city_center"
    city_id = Column(Integer, ForeignKey("city.id", ondelete="CASCADE"), nullable=False)
    longitude = Column(String, nullable=False)
    latitude = Column(String, nullable=False)
