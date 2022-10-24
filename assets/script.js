var weatherAPIKey = "0f87f7930ed9ae3d9a321c614c64f22c";
var inputCity = document.getElementById('citySearch');
var citySearchBtn = document.getElementById('search')
//need three API from openweather
function handleUserInput(){
var userinput = inputCity.value;

getWeather(userinput);
}

function getWeather(city) {
    var currentWeatherURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + weatherAPIKey;
   fetch(currentWeatherURL)
        .then(function (response) {
        return response.json();
         })
        .then(function (data) {
        console.log(data);
         });
}


function displayWeather(data) {
    
    
}


citySearchBtn.addEventListener('click', handleUserInput)