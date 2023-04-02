let apiKey = "9cb72bec958f8fb02391985ed7b219d2";
let date = new Date();
let currentDate = date.toDateString();
let time = date.toLocaleTimeString();
let celsiusTemp = null;

function dateAndTime() {
  let day = document.querySelector("#current-date");
  day.innerHTML = `${currentDate} ${time}`;
}

function searchCity() {
  let city = document.querySelector("#city");
  let citySearch = document.querySelector("#city-search");
  city.innerHTML = citySearch.value;
  searchLoc();
}
function displayWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let temp = document.querySelector("#current-temperature");
  temp.innerHTML = `${temperature}`;
  let currentDec = response.data.weather[0].description;
  let dec = document.querySelector("#weather-description");
  let weatherIcon = response.data.weather[0].icon;
  dec.innerHTML = `<img src="https://openweathermap.org/img/wn/${weatherIcon}.png" >${currentDec}`;
  time = date.toLocaleTimeString();
  celsiusTemp = response.data.main.temp;
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let humidityValue = response.data.main.humidity;
  let windValue = response.data.wind.speed;
  humidity.innerHTML = `Humidity: ${humidityValue}%`;
  wind.innerHTML = `Wind: ${windValue}m/s`;
  getForecast(response.data.coord);e
  e;
  e;
}
function searchLoc() {
  let citySearch = document.querySelector("#city-search");
  let city = citySearch.value;
  let cityUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(cityUrl).then(displayWeather);
}
function currentLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(displayWeather);
}
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(currentLocation);
  } else {
    alert("Your browser doesn't support this feature");
  }
}
let keySearch = document.querySelector("#city-search");
keySearch.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    searchCity();
  }
});
function displayFahrenheit() {
  let fahrenheitDegree = (celsiusTemp * 9) / 5 + 32;
  fahrenheitDegree = Math.round(fahrenheitDegree);
  let temperatureF = document.querySelector("#current-temperature");
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
  temperatureF.innerHTML = `${fahrenheitDegree}`;
}
function displayCelsius() {
  let celsiusDegree = Math.round(celsiusTemp);
  let temperatureC = document.querySelector("#current-temperature");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureC.innerHTML = `${celsiusDegree}`;
}
function currentCity(city) {
  let city2 = document.querySelector("#city");
  city2.innerHTML = `${city}`;

  let currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(currentUrl).then(displayWeather);
}
function displayForecast(response) {
  let forecast = response.data.daily;
  forecast.forEach(
    (day, index) =>
      (document.getElementById("day" + (index + 1)).innerHTML = day.dt)
  );
}
function getForecast(coords) {
  let forecastUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&units=metric&appid=${apiKey}`;
  axios.get(forecastUrl).then(displayForecast);e
  

  
}
dateAndTime();

let cityBtn = document.querySelector(".search-btn");
cityBtn.addEventListener("click", searchCity);
let currentBtn = document.querySelector(".current-btn");
currentBtn.addEventListener("click", getLocation);
let fahrenheitLink = document.querySelector("#fareinheit");
fahrenheitLink.addEventListener("click", displayFahrenheit);
let celsiusLink = document.querySelector("#celcius");
celsiusLink.addEventListener("click", displayCelsius);
currentCity("Johannesburg");
