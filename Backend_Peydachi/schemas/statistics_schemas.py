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
    total_reports: int
    total_reviewed_reports: int
    total_pending_review_reports: int


class AddStoreRequestAndReportStatisticsDisplay(BaseSchema):
    total_add_store_requests: int
    total_pending_review_add_store_requests: int
    total_reviewed_add_store_requests: int
    total_reports: int
    total_reviewed_reports: int
    total_pending_review_reports: int


class PendingReviewStatisticsDisplay(BaseSchema):
    total_pending_review_add_store_requests: int
    total_pending_review_reports: int
    total_pending_review_comment_reports: int


class StoreDistributionByCity(BaseSchema):
    city: str
    store_count: int


class StoreDistributionByRegion(BaseSchema):
    region: str
    store_count: int


class TopCommenterDisplay(BaseSchema):
    username: str
    total_comments: int

class TopRaterDisplay(BaseSchema):
    username: str
    total_ratings: int


class AllDashboardStatisticsDisplay(BaseSchema):
    general_statistics: GeneralStatisticsDisplay
    add_store_request_and_report_stats: AddStoreRequestAndReportStatisticsDisplay
    pending_review_statistics: PendingReviewStatisticsDisplay
    store_distribution_by_city: list[StoreDistributionByCity] | None
    store_distribution_by_region: list[StoreDistributionByRegion] | None
    top_commenters: list[TopCommenterDisplay] | None
    top_raters: list[TopRaterDisplay] | None
