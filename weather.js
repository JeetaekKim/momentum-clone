const API_KEY = "0893bf6be0afa6207a5ac2dfeac25b6c";
const COORDS = "coords";
const weatherInfo = document.querySelector(".js-weatherInfo"),
  weatherImg = document.querySelector(".js-weatherImg");

function getWeather(lat, lng) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      const temp = json.main.temp;
      const weatherDt = json.weather[0].main;
      const weatherIcon = `http://openweathermap.org/img/w/${json.weather[0].icon}.png`;
      const place = json.name;
      weatherInfo.innerText = `${temp}°C, ${place}, ${weatherDt}`;
      weatherImg.src = `${weatherIcon}`;
      console.log(json);
      console.log(weatherImg.src);
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
  console.log(position);
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude: latitude,
    longitude: longitude,
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError() {
  console.log("Can`t access geo location");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parseCoords = JSON.parse(loadedCoords); // localStorage 저장된 데이터 형식 : String임
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();
