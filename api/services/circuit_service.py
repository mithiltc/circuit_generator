from api.services.schemdraw_service import generate_schematic

def generate_circuit(description, tool):

    image = generate_schematic(description)

    return {
        "image_url": image
    }