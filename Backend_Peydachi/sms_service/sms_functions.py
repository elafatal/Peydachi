from database.models import User
from sqlalchemy.orm import Session
from dotenv import load_dotenv
from random import randint
from ippanel import Client
from redis import Redis
import os
import re
from errors.user_errors import PHONE_NUMBER_CAN_NOT_BE_EMPTY_ERROR, PHONE_NUMBER_DUPLICATE_ERROR

load_dotenv()


VERIFICATION_PATTERN = os.getenv('VERIFICATION_PATTERN')
FORGET_PASSWORD_PATTERN = os.getenv('FORGET_PASSWORD_PATTERN')
SENDER = os.getenv('SENDER')



def phone_number_validation(phone_number: str):
    if not phone_number:
        raise PHONE_NUMBER_CAN_NOT_BE_EMPTY_ERROR
    
    iran_national = re.match(r"^09\d{9}$", phone_number)
    iran_international = re.match(r"^\+989\d{9}$", phone_number)

    if not (iran_national or iran_international):
        return False
    else:
        return True
    


async def send_verification_sms(phone_number: str, code: int, sms_service: Client):
    pattern_values = {
        'verification-code': code,
    }

    sms_service.send_pattern(
        pattern_code=VERIFICATION_PATTERN,
        sender=SENDER,
        recipient=phone_number,
        values=pattern_values
    )
    

    return True


async def send_forget_password_sms(phone_number: str, code: int, username: str, sms_service: Client):
    pattern_values = {
            'verification-code': code,
            'username': username
        }


    sms_service.send_pattern(
        pattern_code=FORGET_PASSWORD_PATTERN,
        sender=SENDER,
        recipient=phone_number,
        values=pattern_values
    )
    
    return True