from fastapi import FastAPI
from database import models
from database.database import Base, engine
from authentication import authentication_route
from fastapi.middleware.cors import CORSMiddleware
from routers.super_admin_routers import super_admin, admin, deleted_pics
from routers.seller_routers import seller_store, seller_product
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
    product_comment
)
from routers.admin_routers import (
    admin_user,
    admin_region,
    admin_city,
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
    admin_product_comment
)



origins = [
    "http://localhost:*",
    "http://localhost:5173",
    "http://localhost:5174",
    "http://127.0.0.1:8000"
]


app = FastAPI(
    title="Peydachi",
    version="0.0.1",
    debug=True
)
app.add_middleware( 
    CORSMiddleware, 
    allow_origins=origins,  # Reflect the allowed origins 
    allow_credentials=True, 
    allow_methods=["*"],  # Allows all methods 
    allow_headers=["*"],  # Allows all headers
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Reflect the allowed origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)
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
app.include_router(seller_store.router)
app.include_router(seller_product.router)
app.include_router(admin_user.router)
app.include_router(admin_region.router)
app.include_router(admin_city.router)
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
app.include_router(super_admin.router)
app.include_router(admin.router)
app.include_router(deleted_pics.router)
app.include_router(authentication_route.router)






Base.metadata.create_all(engine)


@app.get("/")
async def peydachi():
    return "Welcome to Peydachi"




if __name__ == "__main__":
    import uvicorn
    try:
        uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True, log_level="debug")

    except Exception as first_error:
        print(f"Primary host failed: {first_error}")

        try:
            uvicorn.run("main:app", host="127.0.0.1", port=5000, reload=True, log_level="debug")

        except Exception as fallback_error:
            print(f"Fallback host also failed: {fallback_error}")

