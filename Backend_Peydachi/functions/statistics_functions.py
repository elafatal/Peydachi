from database.models import Region, City, Store, User, StoreComment, ProductComment, Notification, StoreRating, ProductRating
from sqlalchemy.orm import Session
from sqlalchemy import and_



async def get_general_stats(db: Session):
    number_of_regions = db.query(Region).count()
    number_of_cities = db.query(City).count()
    number_of_stores = db.query(Store).count()
    number_of_products = db.query(Store).count()
    number_of_active_stores = db.query(Store).filter(Store.is_banned == False).count()
    number_of_active_products = db.query(Store).filter(Store.is_banned == False).count()
    number_of_users = db.query(User).count()
    number_of_active_users = db.query(User).filter(User.is_banned == False).count()
    number_of_sellers = db.query(User).filter(User.is_seller == True).count()
    number_of_active_sellers = db.query(User).filter(and_(User.is_seller == True, User.is_banned == False)).count()
    number_of_admins = db.query(User).filter(User.is_admin == True).count()
    number_of_active_admins = db.query(User).filter(and_(User.is_admin == True, User.is_banned == False)).count()
    number_of_super_admins = db.query(User).filter(User.is_super_admin == True).count()
    number_of_active_super_admins = db.query(User).filter(and_(User.is_super_admin == True, User.is_banned == False)).count()
    number_of_store_comments = db.query(StoreComment).count()
    number_of_product_comments = db.query(ProductComment).count()
    number_of_comments = number_of_store_comments + number_of_product_comments
    number_of_notifications = db.query(Notification).count()
    number_of_unseen_notifications = db.query(Notification).filter(Notification.has_seen == False).count()
    number_of_seen_notifications = db.query(Notification).filter(Notification.has_seen == True).count()
    number_of_store_ratings = db.query(StoreRating).count()
    number_of_product_ratings = db.query(ProductRating).count()
    number_of_ratings = number_of_store_ratings + number_of_product_ratings



    stats = {
        'total_regions': number_of_regions,
        'total_cities': number_of_cities,
        'total_stores': number_of_stores,
        'total_products': number_of_products,
        'total_active_stores': number_of_active_stores,
        'total_active_products': number_of_active_products,
        'total_users': number_of_users,
        'total_active_users': number_of_active_users,
        'total_sellers': number_of_sellers,
        'total_active_sellers': number_of_active_sellers,
        'total_admins': number_of_admins,
        'total_active_admins': number_of_active_admins,
        'total_super_admins': number_of_super_admins,
        'total_active_super_admins': number_of_active_super_admins,
        'total_store_comments': number_of_store_comments,
        'total_product_comments': number_of_product_comments,
        'total_comments': number_of_comments,
        'number_of_notifications': number_of_notifications,
        'total_unseen_notifications': number_of_unseen_notifications,
        'total_seen_notifications': number_of_seen_notifications,
        'total_store_ratings': number_of_store_ratings,
        'total_product_ratings': number_of_product_ratings,
        'total_ratings': number_of_ratings
    }


    return stats

