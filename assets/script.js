

var weatherAPIKey = "0f87f7930ed9ae3d9a321c614c64f22c";
var inputCity = document.getElementById('citySearch');
var citySearchBtn = document.getElementById('search');

//Allows use of javascript to have current date and dates 5 days from current date
var date1 = new Date();
var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
var days =["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];
var year = date1.getFullYear();
var day = date1.getDay();
var month = date1.getMonth();
var date = date1.getDate();
var time = days[day] + " " + months[month] + ' ' + date + ', ' + year;
var tomorrow = days[day + 1] + ' ' + months[month] + ' ' + (date + 1) + ', ' + year;
var day3 = days[day + 2] + ' ' + months[month] + ' ' + (date + 2) + ', ' + year;
var day4 = days[day + 3] + ' ' + months[month] + ' ' + (date + 3) + ', ' + year;
var day5 = days[day + 4] + ' ' + months[month] + ' ' + (date + 4) + ', ' + year;
var day6 = days[0] + ' ' + months[month] + ' ' + (date + 5) + ', ' + year;

//Function to respond to user city search and call subsequent functions after search button is engaged
function userCity() {
    var input = inputCity.value;
    getCityLatLon(input);
}

//Function to get user's searched city's latitude and longitude to use in displayCurrentWeather()
function getCityLatLon(input) {
    var city=input;
    var geocoderURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=5&appid=" + weatherAPIKey;
    
    fetch(geocoderURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (city) {
            displayCurrentWeather(city);
        });
}
//function that takes latitude and longitude data to return the city's current weather conditions
function displayCurrentWeather(city) {  
    var longitude = city[0].lon
    var latitude = city[0].lat
    var currentWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&units=imperial&appid=" + weatherAPIKey;
    
    fetch(currentWeatherUrl)
        .then(function (response) {
            return response.json();
        })
//Function assigns city's current weather conditions and date
        .then(function (currentWeather) {
            document.querySelector("#name").textContent=currentWeather.name;
            document.getElementById("date").textContent=time;
            document.querySelector("#weather-desc").textContent=currentWeather.weather[0].description;  
            document.querySelector("#w-icon").src = "http://openweathermap.org/img/wn/" + currentWeather.weather[0].icon + "@2x.png";
            document.querySelector("#weather-temp").textContent="Temperature: " + currentWeather.main.temp + " °F";
            document.querySelector("#weather-speed").textContent="Wind Speed: " + currentWeather.wind.speed + " mph";
            document.querySelector("#weather-humidity").textContent="Humidity: " + currentWeather.main.humidity + " %";
            displayFutureWeather(currentWeather);
        });
}
// Function that uses current searched city to display forecast for the next few days
function displayFutureWeather(cityName) {
    var cityName=cityName.name;
    var forecastWeatherUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=" + weatherAPIKey;
    fetch(forecastWeatherUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (future) {     
//Array for 5 day forecast data from openWeather API
            forecast =[future.list[5], future.list[13], future.list[21], future.list[29], future.list[37]];
//Assigning dates for the 5 day forecast
            document.querySelector("#day2").textContent=tomorrow;
            document.querySelector("#day3").textContent=day3;
            document.querySelector("#day4").textContent=day4;
            document.querySelector("#day5").textContent=day5;
            document.querySelector("#day6").textContent=day6;
//Assigning icons for next 5 day forecast based off array data            
            document.querySelector(".w-icon-2").src="http://openweathermap.org/img/wn/" + forecast[0].weather[0].icon + "@2x.png";
            document.querySelector(".w-icon-3").src="http://openweathermap.org/img/wn/" + forecast[1].weather[0].icon + "@2x.png";
            document.querySelector(".w-icon-4").src="http://openweathermap.org/img/wn/" + forecast[2].weather[0].icon + "@2x.png";
            document.querySelector(".w-icon-5").src="http://openweathermap.org/img/wn/" + forecast[3].weather[0].icon + "@2x.png";
            document.querySelector(".w-icon-6").src="http://openweathermap.org/img/wn/" + forecast[4].weather[0].icon + "@2x.png";
//Assigning weather condition description to each specific day based off array data
            document.querySelector("#weather-desc-2").textContent=forecast[0].weather[0].description;
            document.querySelector("#weather-desc-3").textContent=forecast[1].weather[0].description;
            document.querySelector("#weather-desc-4").textContent=forecast[2].weather[0].description;
            document.querySelector("#weather-desc-5").textContent=forecast[3].weather[0].description;
            document.querySelector("#weather-desc-6").textContent=forecast[4].weather[0].description;
//Assigning temperature to each specific day based off array data
            document.querySelector("#day2-t").textContent="Temperature: " + forecast[0].main.temp + " °F";
            document.querySelector("#day3-t").textContent="Temperature: " + forecast[1].main.temp + " °F";
            document.querySelector("#day4-t").textContent="Temperature: " + forecast[2].main.temp + " °F";
            document.querySelector("#day5-t").textContent="Temperature: " + forecast[3].main.temp + " °F";
            document.querySelector("#day6-t").textContent="Temperature: " + forecast[4].main.temp + " °F";
//Assigning wind speed to each specific day based off array data
            document.querySelector("#day2-w").textContent="Wind Speed: " + forecast[0].wind.speed + " mph";
            document.querySelector("#day3-w").textContent="Wind Speed: " + forecast[1].wind.speed + " mph";
            document.querySelector("#day4-w").textContent="Wind Speed: " + forecast[2].wind.speed + " mph";
            document.querySelector("#day5-w").textContent="Wind Speed: " + forecast[3].wind.speed + " mph";
            document.querySelector("#day6-w").textContent="Wind Speed: " + forecast[4].wind.speed + " mph";
//Assigning humidity to each specific day based off array data
            document.querySelector("#day2-h").textContent="Humidity: " + forecast[0].main.humidity + " %";
            document.querySelector("#day3-h").textContent="Humidity: " + forecast[1].main.humidity + " %";
            document.querySelector("#day4-h").textContent="Humidity: " + forecast[2].main.humidity + " %";
            document.querySelector("#day5-h").textContent="Humidity: " + forecast[3].main.humidity + " %";
            document.querySelector("#day6-h").textContent="Humidity: " + forecast[4].main.humidity + " %";
        });
}  
//need to add function to save user cities and add them as buttons for future use
function cityHistory() {
    if(citySearchBtn == "clicked"){
        var searchHistory=document.querySelector("#search-history");
        var userHistory = document.createElement("button");
        userHistory.textContent = inputCity.value;
        searchHistory.append(userHistory); 
        console.log(inputCity.value);
    }else if(userHistory > 5){

    }
    // localStorage.setItem(inputCity)
}
cityHistory();
//Event listener-When user types in city and clicks search, functions will run
citySearchBtn.addEventListener('click', userCity, cityHistory);
//userHistory.addEventListener("click",)

