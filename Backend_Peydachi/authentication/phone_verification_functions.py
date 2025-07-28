from database.models import User
from sqlalchemy.orm import Session
from random import randint
from redis import Redis
from ippanel import Client
from errors.user_errors import USER_NOT_FOUND_ERROR, PHONE_NUMBER_DUPLICATE_ERROR, USER_HAS_NO_PHONE_NUMBER_ERROR, INVALID_PHONE_NUMBER_ERROR
from errors.phone_verification_errors import USER_PHONE_VERIFICATION_CODE_ERROR, USER_VERIFICATION_CODE_EXPIRED_ERROR, SMS_SERVICE_ERROR
from errors.general_errors import INTERNAL_ERROR
from schemas.phone_verification_schemas import PhoneVerifyCheckModel, ForgetPasswordVerifyCheck
from authentication.access import create_token
import logging
import os
from sms_service.sms_functions import send_verification_sms, phone_number_validation, send_forget_password_sms


VERIFICATION_CODE_TIME_LIMIT_SECONDS = 300

async def user_sign_up_phone_verification(phone_number: str, redis_db: Redis, db: Session, sms_service: Client):
    if not phone_number_validation(phone_number):
        raise INVALID_PHONE_NUMBER_ERROR
    
    user = db.query(User).filter(User.phone_number == phone_number).first()
    if user:
        raise PHONE_NUMBER_DUPLICATE_ERROR

    code = randint(10000, 99999)

    user_verification_code = {
        'code': code,
    }

    redis_db.hset(f'phone_verification:{phone_number}', mapping=user_verification_code)
    redis_db.expire(f'phone_verification:{phone_number}', VERIFICATION_CODE_TIME_LIMIT_SECONDS)


    # It should be a sms service, but we don't have money so we just show a log message
    # logging.basicConfig(
    #     level=logging.INFO,
    #     format='%(asctime)s - %(levelname)s - %(message)s',
    #     datefmt='%Y/%m/%d %H:%M:%S',
    #     filename=os.path.join('logs', 'signup_verification_logs', 'signup_verification_code_logs.log'),
    #     filemode='a'
    # )
    # logging.info("%s >>> Welocme to Peydachi. Your verification code is %s.", phone_number, code)


    try: 
        await send_verification_sms(phone_number=phone_number, code=code, sms_service=sms_service)
    except:
        raise SMS_SERVICE_ERROR



    return f'SMS Sent To {phone_number}'



async def user_signup_phone_verification_check(verification_info: PhoneVerifyCheckModel, redis_db: Redis):
    user_verification_code = redis_db.hget(f'phone_verification:{verification_info.phone_number}', 'code').decode('utf-8')
    if not user_verification_code:
        raise USER_VERIFICATION_CODE_EXPIRED_ERROR

    if user_verification_code == verification_info.code:
        return True
    else:
        raise USER_PHONE_VERIFICATION_CODE_ERROR


async def user_forget_password(username: str, redis_db: Redis, db: Session, sms_service: Client):
    user = db.query(User).filter(User.username == username).first()
    if not user:
        raise USER_NOT_FOUND_ERROR

    phone_number = user.phone_number
    if not phone_number:
        raise USER_HAS_NO_PHONE_NUMBER_ERROR
    
    code = randint(10000, 99999)

    
    user_verification_code = {
        'code': code,
    }

    redis_db.hset(f'phone_verification:{phone_number}', mapping=user_verification_code)
    redis_db.expire(f'phone_verification:{phone_number}', VERIFICATION_CODE_TIME_LIMIT_SECONDS)


    # logging.basicConfig(
    #     level=logging.INFO,
    #     format='%(asctime)s - %(levelname)s - %(message)s',
    #     datefmt='%Y/%m/%d %H:%M:%S',
    #     filename=os.path.join('logs', 'forget_password_verification_logs', 'forget_password_verification_code_logs.log'),
    #     filemode='a'
    # )
    # logging.info("%s >>> Hi %s Did you forget your password? Your verification code is %s.", phone_number, username, code)


    try: 
        await send_forget_password_sms(phone_number=phone_number, code=code, username=username, sms_service=sms_service)
    except:
        raise SMS_SERVICE_ERROR
    

    return f'SMS Sent To {phone_number}.'

    


async def user_forget_password_check(verification_info: ForgetPasswordVerifyCheck, redis_db: Redis, db: Session):
    user = db.query(User).filter(User.username == verification_info.username).first()
    if not user:
        raise USER_NOT_FOUND_ERROR

    phone_number = user.phone_number
    if not phone_number:
        raise USER_HAS_NO_PHONE_NUMBER_ERROR


    user_verification_code = redis_db.hget(f'phone_verification:{phone_number}', 'code')
    if not user_verification_code:
        raise USER_VERIFICATION_CODE_EXPIRED_ERROR

    if user_verification_code.decode('utf-8') == verification_info.code:

        access_token = create_token(data={'sub': user.username})
        refresh_token = create_token(data={'sub': user.username}, refresh=True)

        return {
            'access_token': access_token,
            'refresh_token': refresh_token,
            'type_token': 'bearer',
            'userID': user.id,
            'username': user.username,
            'is_admin': user.is_admin,
            'is_super_admin': user.is_super_admin,
            'is_seller': user.is_seller
        }
    else:
        raise USER_PHONE_VERIFICATION_CODE_ERROR