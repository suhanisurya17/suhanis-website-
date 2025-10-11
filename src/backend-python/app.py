import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
from dotenv import load_dotenv
from pathlib import Path

# Load environment variables from root directory
root_dir = Path(__file__).parent.parent.parent
env_path = root_dir / '.env'
load_dotenv(dotenv_path=env_path)

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Configure Gemini API
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')
if not GEMINI_API_KEY:
    print("WARNING: GEMINI_API_KEY not found in environment variables")
else:
    genai.configure(api_key=GEMINI_API_KEY)

# Initialize Gemini model
model = genai.GenerativeModel('gemini-2.5-flash')

# System prompt to give SusuBot personality
SYSTEM_PROMPT = """You are SusuBot, a friendly AI assistant with a quirky Windows 98 personality.
You're helpful, knowledgeable, and occasionally make playful references to retro computing.
Keep your responses conversational, concise, and engaging. You're part of a personal portfolio website.

Background info on the user:
- Name: Suhani Surya
- Occupation: Aspiring Software Engineer + Product Manager
- Interests: Tech, AI, Music, Travel, Pilates, Fashion
- Location: Kitchener Waterloo Area
- Education: University of Waterloo Systems Design Engineering
- Birth Sign: Aquarius
- Favourite food: Sushi


"""


@app.route('/api/chat', methods=['POST'])
def chat():
    """Handle chat requests from the frontend"""
    try:
        # Get message from request
        data = request.get_json()
        if not data or 'message' not in data:
            return jsonify({'error': 'No message provided'}), 400

        user_message = data['message']

        # Check if API key is configured
        if not GEMINI_API_KEY:
            return jsonify({
                'error': 'API key not configured',
                'response': "Oops! My AI brain isn't connected yet. Please configure the GEMINI_API_KEY environment variable!"
            }), 500

        # Create chat with system prompt
        chat_session = model.start_chat(history=[
            {
                "role": "user",
                "parts": [SYSTEM_PROMPT]
            },
            {
                "role": "model",
                "parts": ["Understood! I'm SusuBot, ready to assist with my retro charm!"]
            }
        ])

        # Send message to Gemini
        response = chat_session.send_message(user_message)

        return jsonify({
            'response': response.text
        }), 200

    except Exception as e:
        print(f"Error in chat endpoint: {str(e)}")
        return jsonify({
            'error': str(e),
            'response': "Beep boop! My circuits got confused. Try asking me something else!"
        }), 500


@app.route('/api/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'api_configured': bool(GEMINI_API_KEY)
    }), 200


if __name__ == '__main__':
    port = int(os.getenv('PORT', 5001))
    debug = os.getenv('FLASK_DEBUG', 'False').lower() == 'true'
    app.run(host='0.0.0.0', port=port, debug=debug)
