# 🌦️ Weather - Weather App (Flask)

WeatherFX is a sleek, real-time animated weather application powered by Python Flask. It fetches 7-day weather forecasts, features animated Lottie visuals (rain, snow, etc.), city autocomplete using GeoDB, and a day/night theme toggle.

---

## 🚀 Features
- 📍 Auto-detects user city via IP
- ⛅ 7-day forecast with icons
- 🌦️ Lottie animations for rain, snow, clouds, clear
- 🔍 City autocomplete with GeoDB API
- 🌗 Day/night mode toggle
- 🎨 Stylish modern UI with animated backgrounds
- ✅ Secure backend with Flask & .env API key loading

---

## 🧰 Technologies
- Frontend: HTML, CSS, JavaScript
- Backend: Python Flask
- APIs: OpenWeatherMap, GeoDB (via RapidAPI)
- Animation: Lottie

---

## 📦 Installation & Run

```bash
git clone https://github.com/YOUR_USERNAME/weatherfx.git
cd weatherfx

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\\Scripts\\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file with your API keys
cp .env.example .env

# Run the app
python app.py
