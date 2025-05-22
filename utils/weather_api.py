import requests
import os

API_KEY = os.getenv('WEATHER_API_KEY')

def get_weather_data(city):
    url = f"https://api.openweathermap.org/data/2.5/forecast?q={city}&units=metric&appid={API_KEY}"
    response = requests.get(url)
    return response.json()
