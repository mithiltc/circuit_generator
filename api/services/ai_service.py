from groq import Groq
from dotenv import load_dotenv
import os
import json

load_dotenv()

print(
    "GROQ KEY LOADED:",
    os.getenv("GROQ_API_KEY")
)

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

def generate_ai_suggestions(description):

    print("AI SERVICE CALLED")
    print("DESCRIPTION:", description)

    try:
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "user",
                    "content": f"""
You are an Electronics Circuit Design Expert.

Analyze the following circuit:

{description}

Return ONLY valid JSON.

Format:

{{
  "components": [
    "minimum of 5 components if applicable"
  ],
  "working": "Detailed working explanation with multiple paragraphs",
  "design_suggestions": [
    "Provide at least 10 design suggestions"
  ],
  "simulation_steps": [
    "Provide at least 10 simulation steps"
  ],
  "viva_questions": [
   "Provide at least 10 viva questions"
  ]
}}

Rules:

1. Return JSON only.
2. No markdown.
3. No explanations outside JSON.
4. Ensure valid JSON syntax.
"""
                }
            ],
            temperature=0.3
        )

        result = response.choices[0].message.content

        print("AI RESPONSE RECEIVED")

        try:
            return json.loads(result)

        except Exception:
            print("JSON PARSE ERROR")

            return {
                "components": [
                    "Unable to parse AI response"
                ],
                "working": result,
                "design_suggestions": [],
                "simulation_steps": [],
                "viva_questions": []
            }

    except Exception as e:
        print("GROQ ERROR:", e)

        return {
            "components": [],
            "working": f"ERROR: {str(e)}",
            "design_suggestions": [],
            "simulation_steps": [],
            "viva_questions": []
        }