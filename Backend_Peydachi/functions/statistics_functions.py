from database.models import (
    Region,
    City,
    Store,
    Product,
    User,
    StoreComment,
    ProductComment,
    Notification,
    StoreRating,
    ProductRating,
    AddStoreRequest,
    Report,
    CommentReport
)
from sqlalchemy.orm import Session
from sqlalchemy import and_,func




async def get_general_stats(db: Session):
    number_of_regions = db.query(func.count(Region.id)).scalar()
    number_of_cities = db.query(func.count(City.id)).scalar()
    number_of_stores = db.query(func.count(Store.id)).scalar()
    number_of_products = db.query(func.count(Product.id)).scalar()
    number_of_active_stores = db.query(func.count(Store.id)).filter(Store.is_banned == False).scalar()
    number_of_active_products = db.query(func.count(Product.id)).filter(Store.is_banned == False).scalar()
    number_of_users = db.query(func.count(User.id)).scalar()
    number_of_active_users = db.query(func.count(User.id)).filter(User.is_banned == False).scalar()
    number_of_sellers = db.query(func.count(User.id)).filter(User.is_seller == True).scalar()
    number_of_active_sellers = db.query(func.count(User.id)).filter(and_(User.is_seller == True, User.is_banned == False)).scalar()
    number_of_admins = db.query(func.count(User.id)).filter(User.is_admin == True).scalar()
    number_of_active_admins = db.query(func.count(User.id)).filter(and_(User.is_admin == True, User.is_banned == False)).scalar()
    number_of_super_admins = db.query(func.count(User.id)).filter(User.is_super_admin == True).scalar()
    number_of_active_super_admins = db.query(func.count(User.id)).filter(and_(User.is_super_admin == True, User.is_banned == False)).scalar()
    number_of_store_comments = db.query(func.count(StoreComment.id)).scalar()
    number_of_product_comments = db.query(func.count(ProductComment.id)).scalar()
    number_of_comments = number_of_store_comments + number_of_product_comments
    number_of_notifications = db.query(func.count(Notification.id)).scalar()
    number_of_unseen_notifications = db.query(func.count(Notification.id)).filter(Notification.has_seen == False).scalar()
    number_of_seen_notifications = db.query(func.count(Notification.id)).filter(Notification.has_seen == True).scalar()
    number_of_store_ratings = db.query(func.count(StoreRating.id)).scalar()
    number_of_product_ratings = db.query(func.count(ProductRating.id)).scalar()
    number_of_ratings = number_of_store_ratings + number_of_product_ratings
    number_of_reports = db.query(func.count(Report.id)).scalar()
    number_of_reviewed_reports = db.query(func.count(Report.id)).filter(Report.is_reviewed == True).scalar()
    number_of_pending_review_reports = db.query(func.count(Report.id)).filter(Report.is_reviewed == False).scalar()

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
        'total_ratings': number_of_ratings,
        'total_reports': number_of_reports,
        'total_reviewed_reports': number_of_reviewed_reports,
        'total_pending_review_reports': number_of_pending_review_reports
    }

    return stats







async def get_add_store_request_stats(db: Session):
    number_of_add_store_requests = db.query(func.count(AddStoreRequest.id)).scalar()
    number_of_pending_review_add_store_requests = db.query(func.count(AddStoreRequest.id)).filter(AddStoreRequest.is_reviewed == False).scalar()
    number_of_reviewed_add_store_requests = db.query(func.count(AddStoreRequest.id)).filter(AddStoreRequest.is_reviewed == True).scalar()

    stats = {
        'total_add_store_requests': number_of_add_store_requests,
        'total_pending_review_add_store_requests': number_of_pending_review_add_store_requests,
        'total_reviewed_add_store_requests': number_of_reviewed_add_store_requests
    }

    return stats



async def get_pending_review_stats(db: Session):
    number_of_pending_review_add_store_requests = db.query(func.count(AddStoreRequest.id)).filter(AddStoreRequest.is_reviewed == False).scalar()
    number_of_pending_review_reports = db.query(func.count(Report.id)).filter(Report.is_reviewed == False).scalar()
    number_of_pending_review_comment_reports = db.query(func.count(CommentReport.id)).filter(CommentReport.is_reviewed == False).scalar()

    stats = {
        'total_pending_review_add_store_requests': number_of_pending_review_add_store_requests,
        'total_pending_review_reports': number_of_pending_review_reports,
        'total_pending_review_comment_reports': number_of_pending_review_comment_reports
    }

    return stats



async def get_store_distribution_by_city(db: Session):
    raw_stats = (
        db.query(City.name, func.count(Store.id))
        .join(Store, Store.city_id == City.id)
        .group_by(City.name)
        .order_by(func.count(Store.id).desc())
        .all()
    )

    top5 = raw_stats[:5]
    others = raw_stats[5:]

    result = [{"city": name, "store_count": count} for name, count in top5]

    if others:
        other_total = sum(count for _, count in others)
        result.append({"city": "بقیه شهر ها", "store_count": other_total})

    return result