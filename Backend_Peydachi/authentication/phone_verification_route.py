from fastapi import APIRouter
from dependencies.dependencies import REDIS_DEPENDENCY, DB_DEPENDENCY
from dependencies.body_dependencies import NAME_BODY
from authentication import phone_verification_functions
from schemas.phone_verification_schemas import PhoneVerifyCheckModel, ForgetPasswordVerifyCheck

router = APIRouter(
    prefix='/phone_verification',
    tags=['Phone Verification']
)


@router.post('/user_sign_up_phone_verification', status_code=200)
async def user_sign_up_phone_verification(phone_number: NAME_BODY, redis_db: REDIS_DEPENDENCY, db: DB_DEPENDENCY):
    return await phone_verification_functions.user_sign_up_phone_verification(phone_number=phone_number, redis_db=redis_db, db=db)


@router.post('/user_signup_phone_verification_check', status_code=200)
async def user_signup_phone_verification_check(verification_info: PhoneVerifyCheckModel, redis_db: REDIS_DEPENDENCY):
    return await phone_verification_functions.user_signup_phone_verification_check(verification_info=verification_info, redis_db=redis_db)


@router.post('/user_forget_password', status_code=200)
async def user_forget_password(username:NAME_BODY, redis_db: REDIS_DEPENDENCY, db: DB_DEPENDENCY):
    return await phone_verification_functions.user_forget_password(username=username, redis_db=redis_db, db=db)


@router.post('/user_forget_password_check', status_code=200)
async def user_forget_password_check(verification_info: ForgetPasswordVerifyCheck, redis_db: REDIS_DEPENDENCY, db: DB_DEPENDENCY):
    return await phone_verification_functions.user_forget_password_check(verification_info=verification_info, redis_db=redis_db, db=db)