const API_KEY = '96cab56924eb6ba04b1a50c65075fd03';

function checkIfGeolocation() {
    if('geolocation' in navigator) {
        getLocation();
      } else {
        manualWeather();
      }
}

function getLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
        getCurrentWeather(position.coords.latitude, position.coords.longitude);
    }, (error) => console.log(error));
}

function getCurrentWeather(lat, long) {
    const promise = axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${API_KEY}&lang=pt_br`);

    promise.then(response => renderWeather(response.data));

    promise.catch(error => {
        console.log(error.response.status);
    });
}

function renderWeather(data) {
    console.log(data)
    const bannerInfo = document.querySelector('.current-weather .banner');
    bannerInfo.innerHTML = `
        <h2>Clima: ${data.weather[0].description}</h2>
    `;

    const weatherData = document.querySelector('.current-weather .weather-data');
    weatherData.innerHTML = `
        <p>Temperatura: ${data.main.temp}</p>
        <p>Sensação Térmica: ${data.main.feels_like}</p>
        <p>Umidade do ar: ${data.main.humidity}%</p>
        <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="weather icon">
        <p>Cidade: ${data.name}</p>
    `;
}

function manualWeather() {
    alert('Por favor, ṕreencha os dados para obter as informações do tempo :D');
}

function trocarTela(){
    const trocarTela1 = document.querySelector(".container1");
    const trocarTela2 = document.querySelector(".current-weather")
    trocarTela1.classList.add("hidden");
    trocarTela2.classList.remove("hidden");
    checkIfGeolocation();
}


