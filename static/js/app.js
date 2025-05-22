// Auto-detect user city using IP geolocation
window.addEventListener("DOMContentLoaded", () => {
  fetch("http://ip-api.com/json/")
    .then(res => res.json())
    .then(location => {
      const city = location.city;
      document.getElementById("city").value = city;
      fetchWeather(city);
    })
    .catch(() => {
      document.getElementById("city").value = "New York";
      fetchWeather("New York");
    });
});

// Handle form submit to fetch weather
document.getElementById('weather-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const city = document.getElementById('city').value;
  fetchWeather(city);
});

// Fetch weather data from Flask backend
async function fetchWeather(city) {
  const loading = document.getElementById("loading");
  loading.style.display = "block";

  try {
    const res = await fetch('/api/weather', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ city })
    });

    const data = await res.json();
    loading.style.display = "none";

    if (!data || !data.list || !Array.isArray(data.list)) {
      displayError("Weather data not available. Try another city.");
      return;
    }

    displayWeather(data);
    setWeatherAnimation(data.list[0].weather[0].main);
  } catch (error) {
    loading.style.display = "none";
    displayError("Failed to fetch weather data.");
    console.error(error);
  }
}

// Display error message
function displayError(message) {
  const container = document.getElementById('weather-display');
  container.innerHTML = `<p>${message}</p>`;
}

// Display 7-day forecast cards
function displayWeather(data) {
  const container = document.getElementById('weather-display');
  container.innerHTML = '';

  const dailyData = getDailyForecast(data.list);

  dailyData.forEach(day => {
    const card = document.createElement('div');
    card.className = 'weather-card';

    card.innerHTML = `
      <h3>${formatDate(day.dt_txt)}</h3>
      <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" />
      <p>${day.weather[0].description}</p>
      <p><strong>${day.main.temp}°C</strong></p>
    `;

    container.appendChild(card);
  });
}

// Get 1 forecast per day (from 3-hour intervals)
function getDailyForecast(list) {
  if (!Array.isArray(list)) return [];

  const filtered = [];
  const seen = new Set();

  list.forEach(item => {
    const date = item.dt_txt.split(' ')[0];
    if (!seen.has(date)) {
      seen.add(date);
      filtered.push(item);
    }
  });

  return filtered;
}

// Format forecast date to readable format
function formatDate(dt_txt) {
  const d = new Date(dt_txt);
  return d.toDateString();
}

// Fetch and show city suggestions via Flask backend (secure)
document.getElementById('city').addEventListener('input', async function () {
  const query = this.value;
  const datalist = document.getElementById("suggestions");
  datalist.innerHTML = "";

  if (!query) return;

  try {
    const response = await fetch(`/api/cities?q=${query}`);
    const result = await response.json();

    if (result && result.data && Array.isArray(result.data)) {
      result.data.forEach(city => {
        const option = document.createElement("option");
        option.value = `${city.city}, ${city.countryCode}`;
        datalist.appendChild(option);
      });
    }
  } catch (err) {
    console.warn("City autocomplete failed.", err);
  }
});

// Toggle day/night theme
const themeToggle = document.getElementById("theme-toggle");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("night");

  // Switch icon based on theme
  if (document.body.classList.contains("night")) {
    themeToggle.textContent = "☀️"; // Light mode icon
  } else {
    themeToggle.textContent = "🌙"; // Dark mode icon
  }
});

