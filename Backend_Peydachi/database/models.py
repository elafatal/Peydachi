from database.database import Base
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Boolean, Float, CheckConstraint, JSON


# ID Class ==============================================================================================
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


# Region Class ==============================================================================================
class Region(ID, Base):
    __tablename__ = "region"
    name = Column(String(150), nullable=False)


# City Class ================================================================================================
class City(ID, Base):
    __tablename__ = "city"
    name = Column(String(150), nullable=False)
    region_id = Column(Integer, ForeignKey("region.id"), nullable=False)


# Store Class ===============================================================================================
class Store(ID, Base):
    __tablename__ = "store"
    name = Column(String(150), nullable=False)
    owner_id = Column(Integer, ForeignKey("user.id"), nullable=True)
    contact_info = Column(JSON, nullable=True)
    description = Column(String(500), nullable=True)
    location_longitude = Column(String, nullable=True)
    location_latitude = Column(String, nullable=True)
    average_rating = Column(Float, nullable=True)
    average_product_rating = Column(Float, nullable=True)
    date_added = Column(DateTime, nullable=False)
    is_banned = Column(Boolean, default=False)
    city_id = Column(Integer, ForeignKey("city.id"), nullable=True)


# Product Class =============================================================================================
class Product(ID, Base):
    __tablename__ = "product"
    store_id = Column(Integer, ForeignKey("store.id"), nullable=False)
    name = Column(String(150), nullable=False)
    description = Column(String(500), nullable=True)
    pic_url = Column(String(500), nullable=True)
    average_rating = Column(Float, nullable=True)
    date_added = Column(DateTime, nullable=False)
    quantity = Column(Integer, nullable=False)
    city_id = Column(Integer, ForeignKey("city.id"), nullable=False)


# Store Comments Class ======================================================================================
class StoreComment(ID, Base):
    __tablename__ = "store_comment"
    store_id = Column(Integer, ForeignKey("store.id"), nullable=False)
    user_id = Column(Integer, ForeignKey("user.id"), nullable=False)
    text = Column(String(500), nullable=False)
    date_added = Column(DateTime, nullable=False)


# Product Comments Class ===================================================================================
class ProductComment(ID, Base):
    __tablename__ = "product_comment"
    product_id = Column(Integer, ForeignKey("product.id"), nullable=False)
    user_id = Column(Integer, ForeignKey("user.id"), nullable=False)
    text = Column(String(500), nullable=False)
    date_added = Column(DateTime, nullable=False)


# Category Class ===========================================================================================
class Category(ID, Base):
    __tablename__ = "category"
    name = Column(String(150), nullable=False)


# Store Category Class =====================================================================================
class StoreCategory(ID, Base):
    __tablename__ = "store_category"
    store_id = Column(Integer, ForeignKey("store.id"), nullable=False)
    category_id = Column(Integer, ForeignKey("category.id"), nullable=False)


# Category Relation Class =================================================================================
class CategoryRelation(ID, Base):
    __tablename__ = "category_relation"
    category_id = Column(Integer, ForeignKey("category.id"), nullable=False)
    word = Column(String, nullable=False)



# Product Rating Class ====================================================================================
class ProductRating(ID, Base):
    __tablename__ = "product_rating"
    product_id = Column(Integer, ForeignKey("product.id"), nullable=False)
    user_id = Column(Integer, ForeignKey("user.id"), nullable=False)
    store_id = Column(Integer, ForeignKey("store.id"), nullable=False)
    rating = Column(Integer, nullable=False)


# Store Rating Class ======================================================================================
class StoreRating(ID, Base):
    __tablename__ = "store_rating"
    store_id = Column(Integer, ForeignKey("store.id"), nullable=False)
    user_id = Column(Integer, ForeignKey("user.id"), nullable=False)
    rating = Column(Integer, nullable=False)


# Notification Class ======================================================================================
class Notification(ID, Base):
    __tablename__ = "notification"
    user_id = Column(Integer, ForeignKey("user.id"), nullable=False)
    text = Column(String(500), nullable=False)
    admin_id = Column(Integer, ForeignKey("user.id"), nullable=True)
    has_seen = Column(Boolean, default=False)
    date_added = Column(DateTime, nullable=False)


# Report Class ============================================================================================
class Report(ID, Base):
    __tablename__ = "report"
    text = Column(String, nullable=False)
    is_reviewed = Column(Boolean, default=False)
    date_added = Column(DateTime, nullable=False)


# Comment Report Class ====================================================================================
class CommentReport(ID, Base):
    __tablename__ = "comment_report"
    comment_id = Column(Integer, ForeignKey("store_comment.id"), nullable=False)
    text = Column(String, nullable=False)
    is_reviewed = Column(Boolean, default=False)
    is_store = Column(Boolean, default=False) # True: It's store comment , False: It's product comment
    date_added = Column(DateTime, nullable=False)