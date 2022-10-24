var weatherAPIKey = "0f87f7930ed9ae3d9a321c614c64f22c";
var inputCity = document.getElementById('citySearch');
var citySearchBtn = document.getElementById('search');
var inputHistory=document.querySelector("#search-history");
//need three API from openweather

//Function to respond to user city search and create buttons with past city searches for later use
function handleUserInput(){
    var userInput = inputCity.value;
    var userHistory=document.createElement("button");
    userHistory.textContent=userInput;
    inputHistory.append(userHistory);
    getWeather(userInput);
}

function getWeather(city) {
    var city= "riverside";
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
    var currentDay =[ 
     {sunrise, sunset} = data.city,
     {icon, description} = data.weather[0],
     {temp, humidity}= data.main,
     {speed}= data.wind,
    ]
    console.log(currentDay);
    var futureDay = [
    {city, sunrise, sunset} = data.city,
    {icon, description} = data.weather[0],
    {temp, humidity}= data.main,
    {speed}= data.wind,
    ]
}

getWeather();
citySearchBtn.addEventListener('click', handleUserInput)