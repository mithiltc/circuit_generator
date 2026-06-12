from pydantic import BaseModel

class CircuitRequest(BaseModel):
    description: str
    tool: str