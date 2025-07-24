from fastapi_limiter import FastAPILimiter
from dotenv import load_dotenv
import os
import redis.asyncio as redis

load_dotenv()

REDIS_URL = os.getenv("REDIS_URL")

async def init_rate_limiter():
    redis_connection = redis.from_url(REDIS_URL, encoding="utf-8", decode_responses=True)
    await FastAPILimiter.init(redis_connection)