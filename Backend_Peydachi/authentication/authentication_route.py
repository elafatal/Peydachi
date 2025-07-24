from fastapi import APIRouter
from dependencies.dependencies import AUTHENTICATION_DEPENDENCY, DB_DEPENDENCY, TOKEN_DEPENDENCY
from dependencies.limiter_dependencies import LIMIT_5_PER_3MIN_DEPENDENCY
from authentication import access

router = APIRouter(
    prefix='/authentication',
    tags=['Authentication'],
    dependencies=[LIMIT_5_PER_3MIN_DEPENDENCY]
)


@router.post('/token')
async def login(request: AUTHENTICATION_DEPENDENCY, db: DB_DEPENDENCY):
    return await access.login(request=request, db=db)


@router.post('/refresh_token')
async def get_new_access_token(token: TOKEN_DEPENDENCY):
    return await access.get_new_access_token(token=token)

