from fastapi import APIRouter
from models.request_models import CircuitRequest
from services.ai_service import generate_ai_suggestions
from services.circuit_service import generate_circuit

router = APIRouter()

@router.post("/generate")

async def generate(request: CircuitRequest):

    circuit = generate_circuit(
        request.description,
        request.tool
    )

    suggestions = generate_ai_suggestions(
        request.description
    )

    return {
        "status": "success",
        "image_url": circuit["image_url"],
        "suggestions": suggestions
    }