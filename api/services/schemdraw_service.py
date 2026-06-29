import os
import schemdraw
import schemdraw.elements as elm

OUTPUT_DIR = "api/static/generated"

def generate_schematic(description):

    os.makedirs(OUTPUT_DIR, exist_ok=True)

    image_path = os.path.join(
        OUTPUT_DIR,
        "generated_circuit.svg"
    )

    d = schemdraw.Drawing(show=False)

    d += elm.SourceV().label("Vin")

    d += elm.Resistor().right().label("10kΩ")

    d += elm.Capacitor().down().label("100nF")

    d += elm.Ground()

    d.save(image_path)

    return "/static/generated/generated_circuit.svg"