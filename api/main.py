from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from api.routes.generate import router as generate_router

app = FastAPI(
    title="CircuitAI"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.mount(
    "/static",
    StaticFiles(directory="api/static"),
    name="static"
)

app.include_router(generate_router)

@app.get("/")
async def home():
    return {
        "message": "CircuitAI Backend Running"
    }