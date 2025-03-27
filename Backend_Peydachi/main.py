from fastapi import FastAPI


app = FastAPI(
    title="Peydachi",
    version="0.0.1",
    debug=True
)



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

