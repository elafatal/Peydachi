from schemas.base_schemas import BaseSchema


class SendNotificationModel(BaseSchema):
    user_id: int
    text: str


class NotificationDisplay(BaseSchema):
    id: int
    text: str
    date_added: str
    has_seen: bool
    user_id: int


class AdminNotificationDisplay(NotificationDisplay):
    admin_id: int
