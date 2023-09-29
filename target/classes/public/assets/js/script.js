const apiKey = "d102ce6f8a7f8c61a416505fdeb98697";
const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

const url = (city) => `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

async function getWeatherByLocation(location) {
  const response = await fetch(url(location), {
    origin: "cros"
  });
  const responseData = await response.json();
  addWeatherToPage(responseData);
}

function addWeatherToPage(data) {
  main.innerHTML = '';

  for (let i = 0; i < 5; i++) {
    const weatherData = data.list[i];
    const temp = Ktoc(weatherData.main.temp);
    const weather = document.createElement('div');
    weather.classList.add('weather');

    const weatherIcon = document.createElement('i');
    weatherIcon.classList.add('fas');

    switch (weatherData.weather[0].main) {
      case 'Clear':
        weatherIcon.classList.add('fa-sun', 'sun-animation');
        document.body.style.backgroundImage = 'url("weather_images/sunnyday.jpg")';
        break;
      case 'Clouds':
        weatherIcon.classList.add('fa-cloud', 'cloud-animation');
        document.body.style.backgroundImage = 'url("weather_images/cloudysky.jpg")';
        break;
      case 'Rain':
        weatherIcon.classList.add('fa-cloud-showers-heavy', 'rain-animation');
        document.body.style.backgroundImage = 'url("weather_images/rain.jpg")';
        break;
      case 'Snow':
        weatherIcon.classList.add('fa-snowflake', 'snow-animation');
        document.body.style.backgroundImage = 'url("weather_images/snow.jpg")';
        break;
      default:
        weatherIcon.classList.add('fa-question-circle');
        document.body.style.backgroundImage = 'url("weather_images/default.jpg")';
        break;
    }

    const weatherDetails = document.createElement('div');
    weatherDetails.innerHTML = `
      <h2>${temp}°C</h2>
      <small>${weatherData.weather[0].main}</small>
    `;

    weather.appendChild(weatherIcon);
    weather.appendChild(weatherDetails);
    main.appendChild(weather);
  }
}

function Ktoc(K) {
  return Math.floor(K - 273.15);
}

// Function to get the weather data based on latitude and longitude
async function getWeatherByCoordinates(latitude, longitude) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    const responseData = await response.json();
    addWeatherToPage(responseData);
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}

// Function to get the user's current location
function getCurrentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        getWeatherByCoordinates(latitude, longitude);
      },
      (error) => {
        console.error('Error getting current location:', error);
      }
    );
  } else {
    console.error('Geolocation is not supported by this browser.');
  }
}

function createRaindrops() {
  const raindropsContainer = document.createElement('div');
  raindropsContainer.classList.add('raindrops-container');

  for (let i = 0; i < 20; i++) {
    const raindrop = document.createElement('div');
    raindrop.classList.add('raindrop');
    raindrop.style.animationDelay = `${Math.random() * 2}s`;
    raindropsContainer.appendChild(raindrop);
  }

  main.appendChild(raindropsContainer);
}

// Add a variable to store the current location data
let currentLocationData = null;

// Function to show the "Go to Home" button
function showHomeButton() {
  const homeButton = document.getElementById('homeButton');
  homeButton.style.display = 'block';
}

// Function to hide the "Go to Home" button
function hideHomeButton() {
  const homeButton = document.getElementById('homeButton');
  homeButton.style.display = 'none';
}

// Function to handle the "Go to Home" button click
function goToHome() {
  if (currentLocationData) {
    addWeatherToPage(currentLocationData);
    hideHomeButton();
  }
}

// Update the getWeatherByCoordinates function to store the current location data
async function getWeatherByCoordinates(latitude, longitude) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    const responseData = await response.json();
    addWeatherToPage(responseData);
    currentLocationData = responseData; // Store the current location data
    showHomeButton();
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}

// Update the getCurrentLocation function to store the current location data
function getCurrentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        getWeatherByCoordinates(latitude, longitude);
      },
      (error) => {
        console.error('Error getting current location:', error);
      }
    );
  } else {
    console.error('Geolocation is not supported by this browser.');
  }
}

// Call getCurrentLocation when the page loads
window.addEventListener('load', getCurrentLocation);

// Add an event listener to the home button
const homeButton = document.getElementById('homeButton');
homeButton.addEventListener('click', goToHome);

// Call getCurrentLocation when the page loads
window.addEventListener('load', getCurrentLocation);

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = search.value.trim();

  if (location) {
    getWeatherByLocation(location);
  }
});
