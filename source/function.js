// search and display location
function searchCity(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#city-input");
  let displayCity = document.querySelector(".display-city");
  displayCity.innerHTML = searchCity.value;
  let units = "imperial";
  let apiKey = "1f3e72f4f5dca90480ece5b2191a703a";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?q=${searchCity.value}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showCityTemp);
}
let form = document.querySelector("#enter-city-form");
form.addEventListener("submit", searchCity);

function showCityTemp(response) {
  console.log(response.data);
  document.querySelector(".display-city").innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let displayCityTemp = document.querySelector(".today-temp");
  displayCityTemp.innerHTML = `${temperature}`;
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
}

// Bonus Current Location Button
function displayGeoTemp(response) {
  let currentCity = document.querySelector(".display-city");
  let currentTemp = document.querySelector(".today-temp");
  let temperature = Math.round(response.data.main.temp);
  currentTemp.innerHTML = `${temperature}`;
  currentCity.innerHTML = `${response.data.name}`;
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getPosition);
}

function getPosition(position) {
  let apiKey = "1f3e72f4f5dca90480ece5b2191a703a";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "imperial";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayGeoTemp);
}
let button = document.querySelector("#current-location");
button.addEventListener("click", getCurrentLocation);

// day and time
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let currentTime = document.querySelector("#time");

currentTime.innerHTML = `${day} | ${hours}:${minutes}`;
