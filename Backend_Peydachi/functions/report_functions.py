import datetime
from sqlalchemy import and_, or_
from sqlalchemy.orm import Session
from database.models import Report
from schemas.report_schemas import AddReportModel
from errors.report_errors import REPORT_NOT_FOUND_ERROR, NO_REPORT_FOUND_ERROR, REPORT_ALREADY_REVIEWED_ERROR


async def send_report(request: AddReportModel, db: Session):
    report = Report(
        title=request.title,
        text=request.text,
    )

    db.add(report)
    db.commit()

    return report


async def get_report_by_id(report_id: int, db: Session):
    report = db.query(Report).filter(Report.id == report_id).first()

    if not report:
        raise REPORT_NOT_FOUND_ERROR

    return report


async def get_reports_to_review(db: Session):
    reports = db.query(Report).filter(Report.is_reviewed == False).order_by(Report.date_added.desc()).all()
    if not reports:
        return NO_REPORT_FOUND_ERROR

    return reports


async def get_all_reports(db: Session):
    reports = db.query(Report).order_by(Report.date_added.desc()).all()
    if not reports:
        raise NO_REPORT_FOUND_ERROR

    return reports


async def search_reports(report_text: str, db: Session):
    reports = db.query(Report).filter(or_(Report.text.contains(report_text), Report.title.contains(report_text))).all()
    if not reports:
        raise NO_REPORT_FOUND_ERROR

    return reports


async def search_reviewed_reports(report_text: str, db: Session):
    reports = db.query(Report).filter(and_(or_(Report.text.contains(report_text), Report.title.contains(report_text)), Report.is_reviewed == True)).all()
    if not reports:
        raise NO_REPORT_FOUND_ERROR

    return reports


async def search_not_reviewed_reports(report_text: str, db: Session):
    reports = db.query(Report).filter(and_(or_(Report.text.contains(report_text), Report.title.contains(report_text)), Report.is_reviewed == False)).all()
    if not reports:
        raise NO_REPORT_FOUND_ERROR

    return reports


async def get_all_reviewed_reports(db: Session):
    reports = db.query(Report).filter(Report.is_reviewed == True).order_by(Report.date_added.desc()).all()
    if not reports:
        raise NO_REPORT_FOUND_ERROR

    return reports



async def review_report(report_id: int, db: Session):
    report = db.query(Report).filter(Report.id == report_id).first()
    if not report:
        raise REPORT_NOT_FOUND_ERROR

    if report.is_reviewed:
        return REPORT_ALREADY_REVIEWED_ERROR

    report.is_reviewed = True
    db.commit()
    db.refresh(report)

    return report


async def remove_report(report_id: int, db: Session):
    report = db.query(Report).filter(Report.id == report_id).first()
    if not report:
        raise REPORT_NOT_FOUND_ERROR

    db.delete(report)
    db.commit()

    return 'Request Deleted.'



async def delete_all_reviewed_reports(db: Session):
    reports = db.query(Report).filter(Report.is_reviewed == True)
    if not reports:
        raise NO_REPORT_FOUND_ERROR

    reports.delete(synchronize_session=False)
    db.commit()

    return 'Deleted reports deleted'








