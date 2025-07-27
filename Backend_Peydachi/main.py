import os
from fastapi import FastAPI
from database import models
from database.database import Base, engine
from authentication import authentication_route, phone_verification_route
from fastapi.middleware.cors import CORSMiddleware
from limiter.limiter_init import init_rate_limiter
from limiter.limiter_message import custom_rate_limit_exception_handler
from fastapi.exceptions import HTTPException
from routers.seller_routers import seller_store, seller_product
from routers.super_admin_routers import (
    super_admin,
    admin,
    deleted_pics,
    super_admin_notifications,
    super_admin_add_store_request,
    super_admin_reports,
    super_admin_city,
    super_admin_city_center,
    super_admin_region
)
from routers.general_routers import (
    user,
    region,
    city,
    reports,
    comment_report,
    store,
    product,
    category,
    notification,
    store_rating,
    product_rating,
    add_store_request,
    store_comment,
    product_comment,
    city_center
)
from routers.admin_routers import (
    admin_user,
    admin_reports,
    admin_comment_report,
    admin_store,
    admin_product,
    admin_category,
    admin_notification,
    admin_store_rating,
    admin_product_rating,
    admin_add_store_request,
    admin_store_comment,
    admin_product_comment,
    admin_statistics
)



origins = [
    "http://localhost:*",
    "http://localhost:5173",
    "https://peydachi-frontend.liara.run",
    "https://peydachi-frontend.liara.run/",
    "https://peydachi-backend.liara.run/",
    "https://peydachi-backend.liara.run",
    "https://peydachi.liara.run",
    "https://peydachi.liara.run/",
    "http://peydachi.ir",
    "http://peydachi.ir/",
    "https://peydachi.ir",
    "https://peydachi.ir/",
]


ENV = os.getenv("ENV", "development")



app = FastAPI(
    title="Peydachi",
    version="0.0.1",
    debug=False,
    docs_url=None if ENV == "production" else "/docs",
    redoc_url=None if ENV == "production" else "/redoc",
    openapi_url=None if ENV == "production" else "/openapi.json",
)
app.add_middleware( 
    CORSMiddleware, 
    allow_origins=origins,  # Reflect the allowed origins 
    allow_credentials=True, 
    allow_methods=["*"],  # Allows all methods 
    allow_headers=["*"],  # Allows all headers
)
app.add_exception_handler(HTTPException, custom_rate_limit_exception_handler)
app.include_router(user.router)
app.include_router(region.router)
app.include_router(city.router)
app.include_router(reports.router)
app.include_router(comment_report.router)
app.include_router(store.router)
app.include_router(product.router)
app.include_router(category.router)
app.include_router(notification.router)
app.include_router(store_rating.router)
app.include_router(store_comment.router)
app.include_router(product_rating.router)
app.include_router(product_comment.router)
app.include_router(add_store_request.router)
app.include_router(city_center.router)
app.include_router(seller_store.router)
app.include_router(seller_product.router)
app.include_router(admin_user.router)
app.include_router(admin_reports.router)
app.include_router(admin_comment_report.router)
app.include_router(admin_store.router)
app.include_router(admin_product.router)
app.include_router(admin_category.router)
app.include_router(admin_notification.router)
app.include_router(admin_store_rating.router)
app.include_router(admin_store_comment.router)
app.include_router(admin_product_rating.router)
app.include_router(admin_product_comment.router)
app.include_router(admin_add_store_request.router)
app.include_router(admin_statistics.router)
app.include_router(super_admin.router)
app.include_router(super_admin_city.router)
app.include_router(super_admin_region.router)
app.include_router(super_admin_city_center.router)
app.include_router(super_admin_reports.router)
app.include_router(super_admin_notifications.router)
app.include_router(super_admin_add_store_request.router)
app.include_router(admin.router)
app.include_router(deleted_pics.router)
app.include_router(authentication_route.router)
app.include_router(phone_verification_route.router)



@app.on_event("startup")
async def startup():
    await init_rate_limiter()



@app.get("/")
async def peydachi():
    return "Welcome to Peydachi"




if __name__ == "__main__":
    Base.metadata.create_all(engine)
    
    import uvicorn
    try:
        uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True, log_level="debug")

    except Exception as first_error:
        print(f"Primary host failed: {first_error}")

        try:
            uvicorn.run("main:app", host="0.0.0.0", port=5000, reload=True, log_level="debug")

        except Exception as fallback_error:
            print(f"Fallback host also failed: {fallback_error}")

