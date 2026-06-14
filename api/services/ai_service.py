from groq import Groq
from dotenv import load_dotenv
import os

load_dotenv()

print("GROQ KEY LOADED:", os.getenv("GROQ_API_KEY"))

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
                    You are an electronics circuit design expert.

                    Analyze this circuit request:

                    {description}

                    Provide:
                    1. Required Components
                    2. Circuit Working
                    3. Design Suggestions
                    4. Simulation Steps
                    5. Viva Questions
                    """
                }
            ],
            temperature=0.4
        )

        result = response.choices[0].message.content

        print("AI RESPONSE RECEIVED")
        return result

    except Exception as e:

        print("GROQ ERROR:", e)

        return f"ERROR: {str(e)}"