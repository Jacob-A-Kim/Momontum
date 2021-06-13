const weather = document.querySelector(".js-weather");
const COORDS = 'coords';
const myAPIkey = '6ab04bf10fe0f09781f52aafc018a3fb';
//

function getWeather(latitude, longitude){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${myAPIkey}&units=metric`).then(function(response){
        return response.json();
    }).then(function(json){
        const temp = json.main.temp;
        const loc = json.name;
        weather.innerText = `${temp}°C @ ${loc}`;
    });
}

function saveCoord(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoResult(result){
    const latitude = result.coords.latitude;
    const longitude = result.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    }
    saveCoord(coordsObj);
    getWeather(latitude, longitude);
}
function handleGeoFail(){
    console.log("Failed to get geo info.");
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoResult, handleGeoFail);
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null){
        askForCoords();
    }
    else{
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}
function init(){
    loadCoords();
}

init();
