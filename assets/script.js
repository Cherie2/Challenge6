

const weatherAPIKey = "0f87f7930ed9ae3d9a321c614c64f22c";
const inputCity = document.getElementById('citySearch');
const citySearchBtn = document.getElementById('search');
const city1=document.querySelector("#city1");
const city2=document.querySelector("#city2");
const city3=document.querySelector("#city3");
const city4=document.querySelector("#city4");
const city5=document.querySelector("#city5");

//Allows use of javascript to have current date and dates 5 days from current date
const date1 = new Date();
const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const days =["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const time = days[date1.getDay()] + " " + months[date1.getMonth()] + ' ' + date1.getDate() + ', ' + date1.getFullYear();

//Function that responds to city search input and calls subsequent function when search button is engaged, appends button with city name, stores past cities in localStorage
function userCity() {
    let input = inputCity.value;
    if (localStorage.getItem("search-history")==null){
        localStorage.setItem("search-history", input);
        let userHistoryBtn = document.createElement("button");
        userHistoryBtn.textContent=input;
        city1.append(userHistoryBtn);
    } else if (localStorage.getItem("search-history")!=null && localStorage.getItem("search-history2")==null){
        localStorage.setItem("search-history2", input);
        let userHistoryBtn = document.createElement("button");
        userHistoryBtn.textContent=input;
        city2.append(userHistoryBtn);
    }  else if (localStorage.getItem("search-history2")!=null && localStorage.getItem("search-history3")==null){
        localStorage.setItem("search-history3", input);
        let userHistoryBtn = document.createElement("button");
        userHistoryBtn.textContent=input;
        city3.append(userHistoryBtn);
    }  else if (localStorage.getItem("search-history3")!=null && localStorage.getItem("search-history4")==null){
        localStorage.setItem("search-history4", input);
        let userHistoryBtn = document.createElement("button");
        userHistoryBtn.textContent=input;
        city4.append(userHistoryBtn);
    }  else if (localStorage.getItem("search-history4")!=null && localStorage.getItem("search-history5")==null){
        localStorage.setItem("search-history5", input);
        let userHistoryBtn = document.createElement("button");
        userHistoryBtn.textContent=input;
        city5.append(userHistoryBtn);
    } else if (localStorage.getItem("search-history5")!=null && localStorage.getItem("search-history")!=null){
        localStorage.setItem("search-history", input);
        let userHistoryBtn = document.createElement("button");
        userHistoryBtn.textContent=input;
        city1.replaceWith(userHistoryBtn);
    }
    getCityLatLon(input); 
    inputCity.value="";
}
//when page reloads, function recalls info from local storage to generate buttons
function cityHistory() {
    let cityH1=document.createElement("button");
    let cityH2=document.createElement("button");
    let cityH3=document.createElement("button");
    let cityH4=document.createElement("button");
    let cityH5=document.createElement("button");
    cityH1.textContent=localStorage.getItem("search-history");
    city1.append(cityH1);
    cityH2.textContent=localStorage.getItem("search-history2");
    city2.append(cityH2);
    cityH3.textContent=localStorage.getItem("search-history3");
    city3.append(cityH3);
    cityH4.textContent=localStorage.getItem("search-history4");
    city4.append(cityH4);
    cityH5.textContent=localStorage.getItem("search-history5");
    city5.append(cityH5);
    getCityLatLon(cityH1.textContent);
//Keeps from appending an empty button if there is no data
    if (cityH1.textContent==""){
        cityH1.setAttribute("style", "display:none")
    }
    if (cityH2.textContent==""){
        cityH2.setAttribute("style", "display:none")
    }
    if (cityH3.textContent==""){
        cityH3.setAttribute("style", "display:none")
    }
    if (cityH4.textContent==""){
        cityH4.setAttribute("style", "display:none")
    }
    if (cityH5.textContent==""){
        cityH5.setAttribute("style", "display:none")
    }
}  
//Functions that allow user to click on buttons of past searched cities and get their weather
function cityBtn1() { 
    let city1E = document.querySelector("#city1").textContent;
        getCityLatLon(city1E);
}

function cityBtn2() { 
        let city2E = document.querySelector("#city2").textContent;
            getCityLatLon(city2E);
} 

function cityBtn3() { 
    let city3E = document.querySelector("#city3").textContent;
        getCityLatLon(city3E);
} 

function cityBtn4() { 
    let city4E = document.querySelector("#city4").textContent;
        getCityLatLon(city4E);
}

function cityBtn5() { 
    let city5E = document.querySelector("#city5").textContent;
        getCityLatLon(city5E);
}  

//Function to get user's searched city's latitude and longitude to use in displayCurrentWeather()
function getCityLatLon(input) {
    let city=input;
    let geocoderURL = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=5&appid=" + weatherAPIKey;
    
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
    let longitude = city[0].lon
    let latitude = city[0].lat
    let currentWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&units=imperial&appid=" + weatherAPIKey;
    
    fetch(currentWeatherUrl)
        .then(function (response) {
            return response.json();
        })
//Function assigns city's current weather conditions and date
        .then(function (currentWeather) {
            document.querySelector("#name").textContent=currentWeather.name;
            document.getElementById("date").textContent=time;
            document.querySelector("#weather-desc").textContent=currentWeather.weather[0].description;  
            document.querySelector("#w-icon").src = "https://openweathermap.org/img/wn/" + currentWeather.weather[0].icon + "@2x.png";
            document.querySelector("#weather-temp").textContent="Temperature: " + currentWeather.main.temp + " °F";
            document.querySelector("#weather-speed").textContent="Wind Speed: " + currentWeather.wind.speed + " mph";
            document.querySelector("#weather-humidity").textContent="Humidity: " + currentWeather.main.humidity + " %";
            displayFutureWeather(currentWeather);
        });
}
// Function that uses current searched city to display forecast for the next few days
function displayFutureWeather(cityName) {
    var cityName=cityName.name;
    let forecastWeatherUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=" + weatherAPIKey;
    
    fetch(forecastWeatherUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (future) {     
//Array for 5 day forecast data from openWeather API
            forecast =[future.list[5], future.list[13], future.list[21], future.list[29], future.list[37]];
//Assigning dates for the 5 day forecast
            const a = new Date(forecast[0].dt * 1000);
            const dayName = days[a.getDay()]+ " " + months[a.getMonth()] + ' ' + [a.getDate()] + ', ' + [a.getFullYear()];
            const b = new Date(forecast[1].dt * 1000);
            const dayName1 = days[b.getDay()]+ " " + months[b.getMonth()] + ' ' + [b.getDate()] + ', ' + [b.getFullYear()];
            const c = new Date(forecast[2].dt * 1000);
            const dayName2 = days[c.getDay()]+ " " + months[c.getMonth()] + ' ' + [c.getDate()] + ', ' + [c.getFullYear()];
            const d = new Date(forecast[3].dt * 1000);
            const dayName3 = days[d.getDay()]+ " " + months[d.getMonth()] + ' ' + [d.getDate()] + ', ' + [d.getFullYear()];
            const e = new Date(forecast[4].dt * 1000);
            const dayName4 = days[e.getDay()]+ " " + months[e.getMonth()] + ' ' + [e.getDate()] + ', ' + [e.getFullYear()];
            document.querySelector("#day2").textContent=dayName;
            document.querySelector("#day3").textContent=dayName1;
            document.querySelector("#day4").textContent=dayName2;
            document.querySelector("#day5").textContent=dayName3;
            document.querySelector("#day6").textContent=dayName4;
//Assigning icons for next 5 day forecast based off array data            
            document.querySelector(".w-icon-2").src="https://openweathermap.org/img/wn/" + forecast[0].weather[0].icon + "@2x.png";
            document.querySelector(".w-icon-3").src="https://openweathermap.org/img/wn/" + forecast[1].weather[0].icon + "@2x.png";
            document.querySelector(".w-icon-4").src="https://openweathermap.org/img/wn/" + forecast[2].weather[0].icon + "@2x.png";
            document.querySelector(".w-icon-5").src="https://openweathermap.org/img/wn/" + forecast[3].weather[0].icon + "@2x.png";
            document.querySelector(".w-icon-6").src="https://openweathermap.org/img/wn/" + forecast[4].weather[0].icon + "@2x.png";
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
cityHistory();
//Event listener-When user types in city and clicks search, functions will run
citySearchBtn.addEventListener('click', userCity);
city1.addEventListener("click", cityBtn1);
city2.addEventListener("click", cityBtn2);
city3.addEventListener("click", cityBtn3);
city4.addEventListener("click", cityBtn4);
city5.addEventListener("click", cityBtn5);
