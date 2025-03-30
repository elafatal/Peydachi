import datetime
from sqlalchemy import and_, delete
from sqlalchemy.orm import Session
from database.models import CommentReport
from errors.comment_report_errors import (
    COMMENT_REPORT_NOT_FOUND_ERROR,
    NO_COMMENT_REPORT_FOUND_ERROR,
    NO_PRODUCT_COMMENT_REPORT_FOUND_ERROR,
    NO_STORE_COMMENT_REPORT_FOUND_ERROR,
    COMMENT_REPORT_ALREADY_REVIEWED_ERROR
)
from schemas.comment_report_schemas import AddCommentReportModel




async def send_comment_report(comment_report: AddCommentReportModel, db: Session):
    report = CommentReport(
        comment_id=comment_report.comment_id,
        text=comment_report.text,
        is_store=comment_report.is_store,
        date_added=datetime.datetime.now(),
    )

    db.add(report)
    db.commit()

    return report


async def get_comment_report_by_id(report_id: int, db: Session):
    report = db.query(CommentReport).filter(CommentReport.id == report_id).first()

    if not report:
        raise COMMENT_REPORT_NOT_FOUND_ERROR

    return report


async def get_all_comment_reports(db: Session):
    reports = db.query(CommentReport).order_by(CommentReport.date_added.desc()).all()
    if not reports:
        raise NO_COMMENT_REPORT_FOUND_ERROR

    return reports


async def search_comment_reports(report_text: str, db: Session):
    reports = db.query(CommentReport).filter(CommentReport.text.contains(report_text)).all()
    if not reports:
        raise NO_COMMENT_REPORT_FOUND_ERROR

    return reports


async def search_not_reviewed_comment_reports(report_text: str, db: Session):
    reports = db.query(CommentReport).filter(and_(CommentReport.text.contains(report_text), CommentReport.is_reviewed == False)).all()
    if not reports:
        raise NO_COMMENT_REPORT_FOUND_ERROR

    return reports


async def search_reviewed_comment_reports(report_text: str, db: Session):
    reports = db.query(CommentReport).filter(and_(CommentReport.text.contains(report_text), CommentReport.is_reviewed == True)).all()
    if not reports:
        raise NO_COMMENT_REPORT_FOUND_ERROR

    return reports


async def get_all_reviewed_comment_reports(db: Session):
    reports = db.query(CommentReport).filter(CommentReport.is_reviewed == True).order_by(CommentReport.date_added.desc()).all()
    if not reports:
        raise NO_COMMENT_REPORT_FOUND_ERROR

    return reports


async def review_comment_report(report_id: int, db: Session):
    report = db.query(CommentReport).filter(CommentReport.id == report_id).first()
    if not report:
        raise COMMENT_REPORT_NOT_FOUND_ERROR

    if report.is_reviewed:
        raise COMMENT_REPORT_ALREADY_REVIEWED_ERROR

    report.is_reviewed = True
    db.commit()
    db.refresh(report)

    return report


async def delete_comment_report(report_id: int, db: Session):
    report = db.query(CommentReport).filter(CommentReport.id == report_id).first()
    if not report:
        raise COMMENT_REPORT_NOT_FOUND_ERROR

    db.delete(report)
    db.commit()

    return 'Comment Report Deleted.'


async def get_comment_reports_to_review(db: Session):
    reports = db.query(CommentReport).filter(CommentReport.is_reviewed == False).order_by(CommentReport.date_added.desc()).all()
    if not reports:
        raise NO_COMMENT_REPORT_FOUND_ERROR

    return reports


async def get_all_store_comment_reports(db: Session):
    reports = db.query(CommentReport).filter(CommentReport.is_store == True).order_by(CommentReport.date_added.desc()).all()
    if not reports:
        raise NO_STORE_COMMENT_REPORT_FOUND_ERROR

    return reports


async def get_all_store_comment_reports_to_review(db: Session):
    reports = db.query(CommentReport).filter(and_(CommentReport.is_store == True, CommentReport.is_reviewed == False)).order_by(CommentReport.date_added.desc()).all()
    if not reports:
        raise NO_STORE_COMMENT_REPORT_FOUND_ERROR

    return reports


async def get_all_product_comment_reports(db: Session):
    reports = db.query(CommentReport).filter(CommentReport.is_store == False).order_by(CommentReport.date_added.desc()).all()
    if not reports:
        raise NO_PRODUCT_COMMENT_REPORT_FOUND_ERROR

    return reports


async def get_all_product_comment_reports_to_review(db: Session):
    reports = db.query(CommentReport).filter(and_(CommentReport.is_store == False, CommentReport.is_reviewed == False)).order_by(CommentReport.date_added.desc()).all()
    if not reports:
        raise NO_PRODUCT_COMMENT_REPORT_FOUND_ERROR

    return reports


async def get_all_reviewed_store_comment_reports(db: Session):
    reports = db.query(CommentReport).filter(and_(CommentReport.is_store == True, CommentReport.is_reviewed == True)).order_by(CommentReport.date_added.desc()).all()
    if not reports:
        raise NO_STORE_COMMENT_REPORT_FOUND_ERROR

    return reports


async def get_all_reviewed_product_comment_reports(db: Session):
    reports = db.query(CommentReport).filter(and_(CommentReport.is_store == False, CommentReport.is_reviewed == True)).order_by(CommentReport.date_added.desc()).all()
    if not reports:
        raise NO_PRODUCT_COMMENT_REPORT_FOUND_ERROR

    return reports


async def delete_all_reviewed_comment_reports(db: Session):
    reports = delete(CommentReport).where(CommentReport.is_reviewed == True)
    db.execute(reports)

    return 'All Reviewed Comment Reports Deleted.'