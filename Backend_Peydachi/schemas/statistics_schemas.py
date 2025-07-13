from schemas.base_schemas import BaseSchema

class StatisticsDisplay(BaseSchema):
    total_regions: int
    total_cities: int
    total_stores: int
    total_products: int
    total_active_stores: int
    total_active_products: int
    total_users: int
    total_active_users: int
    total_sellers: int
    total_active_sellers: int
    total_admins: int
    total_active_admins: int
    total_super_admins: int
    total_active_super_admins: int
    total_store_comments: int
    total_product_comments: int
    total_comments: int
    number_of_notifications: int
    total_unseen_notifications: int
    total_seen_notifications: int
    total_store_ratings: int
    total_product_ratings: int
    total_ratings: int