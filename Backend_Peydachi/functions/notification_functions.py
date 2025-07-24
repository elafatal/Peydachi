import datetime
from database.models import Notification
from sqlalchemy.orm import Session
from sqlalchemy import delete, and_, or_, update
from errors.notifications_errors import (
    NOTIFICATION_NOT_FOUND_ERROR,
    NO_NOTIFICATION_FOUND_ERROR,
    NOTIFICATION_ACCESS_ERROR
)
from schemas.notification_schemas import SendNotificationModel


async def admin_send_notification(notif_info: SendNotificationModel, admin_id: int, db: Session):
    notif = Notification(
        user_id=notif_info.user_id,
        admin_id=admin_id,
        title=notif_info.title,
        text=notif_info.text,
    )

    db.add(notif)
    db.commit()

    return notif


async def get_sent_notifications_of_admin(admin_id: int, db: Session):
    notifications = db.query(Notification).filter(Notification.admin_id == admin_id).order_by(Notification.date_added.desc()).all()
    if not notifications:
        raise NO_NOTIFICATION_FOUND_ERROR

    return notifications


async def get_last_n_sent_notifications_of_admin(admin_id: int, db: Session, n: int | None = 10):
    notifications = db.query(Notification).filter(Notification.admin_id == admin_id).order_by(Notification.date_added.desc()).limit(n).all()
    if not notifications:
        raise NO_NOTIFICATION_FOUND_ERROR

    return notifications


async def get_all_self_notifications(user_id: int, db: Session):
    notifications = db.query(Notification).filter(Notification.user_id == user_id).order_by(Notification.date_added.desc()).all()
    if not notifications:
        raise NO_NOTIFICATION_FOUND_ERROR

    return notifications


async def get_all_self_unread_notifications(user_id: int, db: Session):
    notifications = db.query(Notification).filter(and_(Notification.user_id == user_id, Notification.has_seen == False)).order_by(Notification.date_added.desc()).all()
    if not notifications:
        raise NO_NOTIFICATION_FOUND_ERROR

    return notifications


async def review_notification(notification_id: int, user_id: int, db: Session):
    notification = db.query(Notification).filter(Notification.id == notification_id).first()
    if not notification:
        raise NOTIFICATION_NOT_FOUND_ERROR

    if notification.user_id != user_id:
        raise NOTIFICATION_ACCESS_ERROR

    notification.has_seen = True
    db.commit()

    return notification



async def get_all_sent_notifications(db: Session):
    notifs = db.query(Notification).order_by(Notification.date_added.desc()).all()
    if not notifs:
        raise NO_NOTIFICATION_FOUND_ERROR

    return notifs


async def get_last_n_sent_notifications(db: Session, n: int | None = 10):
    notifs = db.query(Notification).order_by(Notification.date_added.desc()).limit(n).all()
    if not notifs:
        raise NO_NOTIFICATION_FOUND_ERROR

    return notifs


async def get_all_seen_notifications(db: Session):
    notifs = db.query(Notification).filter(Notification.has_seen == True).order_by(Notification.date_added.desc()).all()
    if not notifs:
        raise NO_NOTIFICATION_FOUND_ERROR

    return notifs


async def get_last_n_seen_notifications(db: Session, n: int | None = 10):
    notifs = db.query(Notification).filter(Notification.has_seen == True).order_by(Notification.date_added.desc()).limit(n).all()
    if not notifs:
        raise NO_NOTIFICATION_FOUND_ERROR

    return notifs


async def get_all_unseen_notifications(db: Session):
    notifs = db.query(Notification).filter(Notification.has_seen == False).order_by(Notification.date_added.desc()).all()
    if not notifs:
        raise NO_NOTIFICATION_FOUND_ERROR

    return notifs


async def get_last_n_unseen_notifications(db: Session, n: int | None = 10):
    notifs = db.query(Notification).filter(Notification.has_seen == False).order_by(Notification.date_added.desc()).limit(n).all()
    if not notifs:
        raise NO_NOTIFICATION_FOUND_ERROR

    return notifs


async def get_notification_by_id(notification_id: int, db: Session):
    notif = db.query(Notification).filter(Notification.id == notification_id).first()
    if not notif:
        raise NOTIFICATION_NOT_FOUND_ERROR

    return notif


async def get_all_user_notifications(user_id: int, db: Session):
    notifs = db.query(Notification).filter(Notification.user_id == user_id).order_by(Notification.date_added.desc()).all()
    if not notifs:
        raise NO_NOTIFICATION_FOUND_ERROR

    return notifs


async def get_all_user_unread_notifications(user_id: int, db: Session):
    notifs = db.query(Notification).filter(and_(Notification.user_id == user_id, Notification.has_seen == False)).order_by(Notification.date_added.desc()).all()
    if not notifs:
        raise NO_NOTIFICATION_FOUND_ERROR

    return notifs


async def get_all_user_seen_notifications(user_id: int, db: Session):
    notifs = db.query(Notification).filter(and_(Notification.user_id == user_id, Notification.has_seen == True)).order_by(Notification.date_added.desc()).all()
    if not notifs:
        raise NO_NOTIFICATION_FOUND_ERROR

    return notifs


async def search_notifications(search: str, db: Session):
    notifs = db.query(Notification).filter(or_(Notification.text.contains(search), Notification.title.contains(search))).order_by(Notification.date_added.desc()).all()
    if not notifs:
        raise NO_NOTIFICATION_FOUND_ERROR

    return notifs


async def search_unseen_notifications(search: str, db: Session):
    notifs = db.query(Notification).filter(and_(or_(Notification.text.contains(search), Notification.title.contains(search)), Notification.has_seen == False)).order_by(Notification.date_added.desc()).all()
    if not notifs:
        raise NO_NOTIFICATION_FOUND_ERROR

    return notifs


async def search_seen_notifications(search: str, db: Session):
    notifs = db.query(Notification).filter(and_(or_(Notification.text.contains(search), Notification.title.contains(search)), Notification.has_seen == True)).order_by(Notification.date_added.desc()).all()
    if not notifs:
        raise NO_NOTIFICATION_FOUND_ERROR

    return notifs


async def search_user_notifications(user_id: int, search: str, db: Session):
    notifs = db.query(Notification).filter(and_(or_(Notification.text.contains(search), Notification.title.contains(search)), Notification.user_id == user_id)).order_by(Notification.date_added.desc()).all()
    if not notifs:
        raise NO_NOTIFICATION_FOUND_ERROR

    return notifs


async def delete_notification(notification_id: int, db: Session):
    notif = db.query(Notification).filter(Notification.id == notification_id).first()
    if not notif:
        raise NOTIFICATION_NOT_FOUND_ERROR

    db.delete(notif)
    db.commit()

    return 'Notification deleted'


async def delete_all_user_notifications(user_id: int, db: Session):
    notifs = db.query(Notification).filter(Notification.user_id == user_id).all()
    if not notifs:
        raise NO_NOTIFICATION_FOUND_ERROR

    db.delete(notifs)
    db.commit()

    return 'Notifications deleted'


async def delete_all_seen_notifications(db: Session):
    notifs = db.query(Notification).filter(Notification.has_seen == True)
    if not notifs:
        raise NO_NOTIFICATION_FOUND_ERROR

    notifs.delete(synchronize_session=False)
    db.commit()

    return 'All Seen Notifications Deleted'


async def get_notif_count_and_first_three_notifs(user_id: int, db: Session):
    notifs = db.query(Notification).filter(and_(Notification.user_id == user_id, Notification.has_seen == False)).order_by(Notification.date_added.desc()).limit(3).all()

    unseen_notif_count = db.query(Notification).filter(and_(Notification.user_id == user_id, Notification.has_seen == False)).count()

    display_notif = {
        'notif_count': unseen_notif_count,
        'first_three_notifs': notifs
    }


    return display_notif


async def mark_all_notifs_as_seen(user_id: int, db: Session):
    seen_all_notifs = (update(Notification).where(and_(Notification.user_id == user_id, Notification.has_seen == False)).values(has_seen = True).execution_options(synchronize_session='fetch'))

    db.execute(seen_all_notifs)

    return 'All notifications marked as seen'


async def user_delete_self_notif(notif_id: int, user_id: int, db: Session):
    notif = db.query(Notification).filter(Notification.id == notif_id).first()

    if not notif:
        raise NOTIFICATION_NOT_FOUND_ERROR

    if user_id != notif.user_id:
        raise NOTIFICATION_ACCESS_ERROR

    db.delete(notif)
    db.commit()

    return 'Notification Deleted Successfully.'



