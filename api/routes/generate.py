from fastapi import APIRouter

from api.model.request_model import CircuitRequest
from api.services.ai_service import generate_ai_suggestions
from api.services.circuit_service import generate_circuit

router = APIRouter()

@router.post("/generate")
async def generate(request: CircuitRequest):

    circuit = generate_circuit(
        request.description,
        request.tool
    )

    ai_response = generate_ai_suggestions(
        request.description
    )
    print(ai_response)
    return {
        "status": "success",
        "image_url": circuit["image_url"],
        "suggestions": ai_response
           }