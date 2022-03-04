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
    const promise = axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${API_KEY}`);

    promise.then(response => {
        console.log(response.data);
    });

    promise.catch(error => {
        console.log(error.response.status);
    });
}

function manualWeather() {
    alert('Por favor, ṕreencha os dados para obter as informações do tempo :D');
}

checkIfGeolocation();
