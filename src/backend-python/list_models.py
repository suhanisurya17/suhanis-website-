import os
import google.generativeai as genai
from dotenv import load_dotenv
from pathlib import Path

# Load environment variables from root directory
root_dir = Path(__file__).parent.parent.parent
env_path = root_dir / '.env'
load_dotenv(dotenv_path=env_path)

# Configure Gemini API
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')
if not GEMINI_API_KEY:
    print("ERROR: GEMINI_API_KEY not found")
    exit(1)

genai.configure(api_key=GEMINI_API_KEY)

print("Available models:")
print("=" * 50)
try:
    for model in genai.list_models():
        if 'generateContent' in model.supported_generation_methods:
            print(f"- {model.name}")
except Exception as e:
    print(f"Error: {e}")
