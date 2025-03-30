from fastapi import FastAPI
from database import models
from database.database import Base, engine
from authentication import authentication_route
from routers.super_admin_routers import super_admin
from routers.general_routers import user
from routers.admin_routers import admin_user


app = FastAPI(
    title="Peydachi",
    version="0.0.1",
    debug=True
)
app.include_router(authentication_route.router)
app.include_router(super_admin.router)
app.include_router(admin_user.router)
app.include_router(user.router)


Base.metadata.create_all(engine)


@app.get("/")
async def peydachi():
    return "Welcome to Peydachi"




if __name__ == "__main__":
    import uvicorn
    try:
        uvicorn.run(app, host="127.0.0.1", port=8000, reload=True, log_level="debug")

    except Exception as first_error:
        print(f"Primary host failed: {first_error}")

        try:
            uvicorn.run(app, host="127.0.0.1", port=5000, reload=True, log_level="debug")

        except Exception as fallback_error:
            print(f"Fallback host also failed: {fallback_error}")

