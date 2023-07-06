function toFahrenheit(event) {
  event.preventDefault();
  let degrees = document.querySelector("#degree-change");
  degrees.innerHTML = "66";
  let fahrenheitUnit = document.querySelector("#fahrenheit-link");
  fahrenheitUnit.classList.add("clicked-degrees");
}
let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", toFahrenheit);

function toCelcius(event) {
  event.preventDefault();
  let degrees = document.querySelector("#degree-change");
  degrees.innerHTML = "72";
  let celciusUnit = document.querySelector("#celcius-link");
  celciusUnit.classList.add("clicked-degrees");
}
let celcius = document.querySelector("#celcius-link");
celcius.addEventListener("click", toCelcius);

function displayCurrentTime(date) {
  let currentHour = date.getHours();
  let currentMinitue = date.getMinutes();
  let days = [
    "sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let currentDay = days[date.getDay()];

  return `${currentDay} ${currentHour}:${currentMinitue}`;
}
let currentTime = document.querySelector(".time");
let now = new Date();
currentTime.innerHTML = displayCurrentTime(now);

function displayTemperature(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.main.temp);
  let degreeNo = document.querySelector(".main-degree-no");
  degreeNo.innerHTML = `${temperature}`;
  let cityName = document.querySelector(".city-name");
  cityName.innerHTML = response.data.name;
  let Humidity = document.querySelector("#humidity-percentage");
  Humidity.innerHTML = Math.round(response.data.main.humidity);
  let Wind = document.querySelector("#wind-speed");
  Wind.innerHTML = Math.round(response.data.wind.speed);
}
function getCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let citySearched = searchInput.value;
  let apiKey = "c119ffef35b7245a5e03b6e5724ae961";
  let weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citySearched}&units=metric&appid=${apiKey}`;
  axios.get(weatherApiUrl).then(displayTemperature);
}
let searchForCityForm = document.querySelector("#search-form");
searchForCityForm.addEventListener("submit", getCity);

function getUsersGeolocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "c119ffef35b7245a5e03b6e5724ae961";
  let weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(weatherApiUrl).then(displayTemperature);
}
function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getUsersGeolocation);
}
let CurrentButton = document.querySelector("#current-button");
CurrentButton.addEventListener("click", getCurrentPosition);
