import datetime
from schemas.base_schemas import BaseSchema


class SendNotificationModel(BaseSchema):
    user_id: int
    text: str


class NotificationDisplay(SendNotificationModel):
    id: int
    date_added: datetime.datetime
    has_seen: bool


class AdminNotificationDisplay(NotificationDisplay):
    admin_id: int
