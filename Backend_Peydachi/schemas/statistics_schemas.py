from schemas.base_schemas import BaseSchema

class GeneralStatisticsDisplay(BaseSchema):
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


class AddStoreRequestStatisticsDisplay(BaseSchema):
    total_add_store_requests: int
    total_pending_review_add_store_requests: int
    total_reviewed_add_store_requests: int


class PendingReviewStatisticsDisplay(BaseSchema):
    total_pending_review_add_store_requests: int
    total_pending_review_reports: int
    total_pending_review_comment_reports: int