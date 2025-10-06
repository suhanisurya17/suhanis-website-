import os
import google.generativeai as genai
from dotenv import load_dotenv
from pathlib import Path

# Load environment variables from root directory
root_dir = Path(__file__).parent.parent.parent
env_path = root_dir / '.env'
print("Loading .env from:", env_path)
print("File exists:", env_path.exists())

load_dotenv(dotenv_path=env_path)

# Configure Gemini API
GEMINI_API_KEY = os.getenv('GwEMINI_API_KEY')
print("API Key loaded:", "Yes" if GEMINI_API_KEY else "No")
if GEMINI_API_KEY:
    print("API Key length:", len(GEMINI_API_KEY))

if not GEMINI_API_KEY:
    print("ERROR: GEMINI_API_KEY not found in .env file")
    exit(1)

genai.configure(api_key=GEMINI_API_KEY)

# Initialize model
model = genai.GenerativeModel('gemini-2.5-flash')

# System prompt
SYSTEM_PROMPT = """You are SusuBot, a friendly AI assistant with a quirky Windows 98 personality.
You're helpful, knowledgeable, and occasionally make playful references to retro computing.
Keep your responses conversational, concise, and engaging."""

print("🤖 SusuBot Terminal Test")
print("=" * 50)
print("Type 'quit' or 'exit' to stop\n")

# Create chat session
chat = model.start_chat(history=[
    {
        "role": "user",
        "parts": [SYSTEM_PROMPT]
    },
    {
        "role": "model",
        "parts": ["Understood! I'm SusuBot, ready to assist with my retro charm!"]
    }
])

while True:
    user_input = input("You: ")

    if user_input.lower() in ['quit', 'exit']:
        print("👋 Goodbye!")
        break

    if not user_input.strip():
        continue

    try:
        response = chat.send_message(user_input)
        print(f"\n🤖 SusuBot: {response.text}\n")
    except Exception as e:
        print(f"\n❌ Error: {str(e)}\n")
