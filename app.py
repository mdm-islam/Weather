from flask import Flask, render_template, request, jsonify  # Flask modules
from utils.weather_api import get_weather_data              # Custom weather fetcher
from dotenv import load_dotenv                              # To load API keys from .env
import os
import requests

# Load environment variables from .env
load_dotenv()

# Get API key from .env
GEODB_KEY = os.getenv("GEODB_API_KEY")

# Initialize Flask app
app = Flask(__name__)

# Serve homepage
@app.route('/')
def home():
    return render_template('index.html')

# Route to fetch weather data
@app.route('/api/weather', methods=['POST'])
def weather():
    city = request.json.get('city')
    data = get_weather_data(city)
    return jsonify(data)

# Route to securely fetch city suggestions using GeoDB
@app.route('/api/cities', methods=['GET'])
def city_search():
    query = request.args.get('q')
    url = f"https://wft-geo-db.p.rapidapi.com/v1/geo/cities?limit=5&namePrefix={query}"
    headers = {
        "X-RapidAPI-Key": GEODB_KEY,
        "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com"
    }
    res = requests.get(url, headers=headers)
    return jsonify(res.json())

# Run the app in debug mode
if __name__ == '__main__':
    app.run(debug=True)
