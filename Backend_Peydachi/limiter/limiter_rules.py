from fastapi_limiter.depends import RateLimiter


LIMIT_3_PER_MINUTE = RateLimiter(times=3, seconds=60)
LIMIT_5_PER_MINUTE = RateLimiter(times=5, seconds=60)
LIMIT_10_PER_MINUTE = RateLimiter(times=10, seconds=60)
LIMIT_15_PER_MINUTE = RateLimiter(times=15, seconds=60)
LIMIT_20_PER_MINUTE = RateLimiter(times=20, seconds=60)
LIMIT_3_PER_2MIN = RateLimiter(times=3, seconds=120)
LIMIT_10_PER_2MIN = RateLimiter(times=10, seconds=120)
LIMIT_5_PER_3MIN = RateLimiter(times=5, seconds=180)
LIMIT_10_PER_5MIN = RateLimiter(times=10, seconds=300)
