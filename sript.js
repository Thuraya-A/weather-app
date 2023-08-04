function displayTime(timestamp) {
  let date = new Date(timestamp);
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = date.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];

  return `${day} ${hour}:${minute}`;
}

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

function displayTemperature(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.main.temp);
  celciusTemperature = temperature;
  let degreeNo = document.querySelector(".main-degree-no");
  degreeNo.innerHTML = `${temperature}`;
  let cityName = document.querySelector(".city-name");
  cityName.innerHTML = response.data.name;
  let Humidity = document.querySelector("#humidity-percentage");
  Humidity.innerHTML = Math.round(response.data.main.humidity);
  let Wind = document.querySelector("#wind-speed");
  Wind.innerHTML = Math.round(response.data.wind.speed);
  let date = document.querySelector("#weatherUpdateDate");
  date.innerHTML = displayTime(response.data.dt * 1000);
  let weatherDescription = document.querySelector("#weather-description");
  weatherDescription.innerHTML = response.data.weather[0].description;
  let mainIconElement = document.querySelector(`#mainWeatherIcon`);
  let iconCode = response.data.weather[0].icon;
  mainIconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${iconCode}@2x.png`
  );
  mainIconElement.setAttribute(
    "alt",
    `${response.data.weather[0].description}`
  );
  getForecast(response.data.coord);
}

let celciusTemperature = null;

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

function toFahrenheit(event) {
  event.preventDefault();
  let degrees = document.querySelector("#degree-change");
  let degreesInFahrenheit = Math.round((celciusTemperature * 9) / 5 + 32);
  degrees.innerHTML = degreesInFahrenheit;
  celcius.classList.remove("clicked");
  fahrenheit.classList.add("clicked");
}
let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", toFahrenheit);

function toCelcius(event) {
  event.preventDefault();
  let degrees = document.querySelector("#degree-change");
  degrees.innerHTML = celciusTemperature;
  celcius.classList.add("clicked");
  fahrenheit.classList.remove("clicked");
}
let celcius = document.querySelector("#celcius-link");
celcius.addEventListener("click", toCelcius);

function displayForecast(response) {
  let forecastElement = document.querySelector(`#forecast`);
  let forecastHTML = `<div class="row">`;

  let days = ["Fri", "Sat", "Sun", "Mon", "Tues"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col nextFiveDays">
                 <div class="row">
                  <div class="col-8">
                    <div>${day}</div>
                    <img src="images/partly_cloudy.png" alt="" />
                  </div>
                  <div class="col-4">
                    <div class="row mt-2 mb-4"><div class="col">19°</div></div>
                    <div class="row"><div class="col fahrenheit">20°</div></div>
                  </div>
                </div>
              </div>`;
  });
  forecastElement.innerHTML = forecastHTML + "</div>";
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "c119ffef35b7245a5e03b6e5724ae961";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayForecast);
}

getForecast();
