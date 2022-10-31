

const weatherAPIKey = "0f87f7930ed9ae3d9a321c614c64f22c";
const inputCity = document.getElementById('citySearch');
const citySearchBtn = document.getElementById('search');
const cityBtnContainer = document.querySelector("#search-history");
var searchHistory = []

//Allows use of javascript to have current date and dates 5 days from current date
const date1 = new Date();
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const time = days[date1.getDay()] + " " + months[date1.getMonth()] + ' ' + date1.getDate() + ', ' + date1.getFullYear();

//Function that responds to city search input to run other functions
function userCity() {
    let input = inputCity.value;
    saveToLocalStorage(input);
    getCityLatLon(input);
    inputCity.value = "";
}

//Function saves user input for city search in localStorage
function saveToLocalStorage(city) {
    //This pushes city input to the front of the searchHistory array 
    searchHistory.unshift(city)
    localStorage.setItem("search-history", JSON.stringify(searchHistory))
    cityHistory()
}

//When page reloads, function recalls info from local storage to generate buttons
function cityHistory() {
    cityBtnContainer.innerHTML = ''
    for (var i = 0; i <= 4; i++) {
        var cityBtn = document.createElement("button");
        cityBtn.textContent = searchHistory[i]
        //Condition prevents empty buttons from being appended 
        if(cityBtn.textContent===''){
            return
        }else{
        cityBtn.setAttribute('value', searchHistory[i])
        //Event listener that runs the getcitylatlon function on specific citybtn clicked 
        cityBtn.addEventListener('click', cityBtnClick)
        cityBtnContainer.append(cityBtn)
        }
    } 
}

//Function that checks for search history in local storage
function pageLoad() {
    var localStore = localStorage.getItem('search-history')
    if (localStore) {
        searchHistory = JSON.parse(localStore)
    }
    cityHistory()
    //Pulls from local storage and gets last searched city's weather conditions to be displayed on webpage
    getCityLatLon(searchHistory[0]);
}

//Functions that allow user to click on buttons of past searched cities and get their weather
function cityBtnClick() {
    //This refers to cityBtn
    getCityLatLon(this.value)
}

//Function to get user's searched city's latitude and longitude to use in displayCurrentWeather()
function getCityLatLon(input) {
    let city = input;
    let geocoderURL = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=5&appid=" + weatherAPIKey;

    fetch(geocoderURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (city) {
            displayCurrentWeather(city);
            displayFutureWeather(city[0].name);
        });
}

//Function that takes latitude and longitude data to return the city's current weather conditions
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
            document.querySelector("#name").textContent = currentWeather.name;
            document.getElementById("date").textContent = time;
            document.querySelector("#weather-desc").textContent = currentWeather.weather[0].description;
            document.querySelector("#w-icon").src = "https://openweathermap.org/img/wn/" + currentWeather.weather[0].icon + "@2x.png";
            document.querySelector("#weather-temp").textContent = "Temperature: " + currentWeather.main.temp + " °F";
            document.querySelector("#weather-speed").textContent = "Wind Speed: " + currentWeather.wind.speed + " mph";
            document.querySelector("#weather-humidity").textContent = "Humidity: " + currentWeather.main.humidity + " %";
        });
}

// Function that uses current searched city to display forecast for the next few days
function displayFutureWeather(cityName) {
    let forecastWeatherUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=" + weatherAPIKey;

    fetch(forecastWeatherUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (future) {
            //Array for 5 day forecast data from openWeather API
            forecast = [future.list[5], future.list[13], future.list[21], future.list[29], future.list[37]];
            //Assigning dates for the 5 day forecast
            const a = new Date(forecast[0].dt * 1000);
            const dayName = days[a.getDay()] + " " + months[a.getMonth()] + ' ' + [a.getDate()] + ', ' + [a.getFullYear()];
            const b = new Date(forecast[1].dt * 1000);
            const dayName1 = days[b.getDay()] + " " + months[b.getMonth()] + ' ' + [b.getDate()] + ', ' + [b.getFullYear()];
            const c = new Date(forecast[2].dt * 1000);
            const dayName2 = days[c.getDay()] + " " + months[c.getMonth()] + ' ' + [c.getDate()] + ', ' + [c.getFullYear()];
            const d = new Date(forecast[3].dt * 1000);
            const dayName3 = days[d.getDay()] + " " + months[d.getMonth()] + ' ' + [d.getDate()] + ', ' + [d.getFullYear()];
            const e = new Date(forecast[4].dt * 1000);
            const dayName4 = days[e.getDay()] + " " + months[e.getMonth()] + ' ' + [e.getDate()] + ', ' + [e.getFullYear()];
            document.querySelector("#day2").textContent = dayName;
            document.querySelector("#day3").textContent = dayName1;
            document.querySelector("#day4").textContent = dayName2;
            document.querySelector("#day5").textContent = dayName3;
            document.querySelector("#day6").textContent = dayName4;
            //Assigning icons for next 5 day forecast based off array data            
            document.querySelector(".w-icon-2").src = "https://openweathermap.org/img/wn/" + forecast[0].weather[0].icon + "@2x.png";
            document.querySelector(".w-icon-3").src = "https://openweathermap.org/img/wn/" + forecast[1].weather[0].icon + "@2x.png";
            document.querySelector(".w-icon-4").src = "https://openweathermap.org/img/wn/" + forecast[2].weather[0].icon + "@2x.png";
            document.querySelector(".w-icon-5").src = "https://openweathermap.org/img/wn/" + forecast[3].weather[0].icon + "@2x.png";
            document.querySelector(".w-icon-6").src = "https://openweathermap.org/img/wn/" + forecast[4].weather[0].icon + "@2x.png";
            //Assigning weather condition description to each specific day based off array data
            document.querySelector("#weather-desc-2").textContent = forecast[0].weather[0].description;
            document.querySelector("#weather-desc-3").textContent = forecast[1].weather[0].description;
            document.querySelector("#weather-desc-4").textContent = forecast[2].weather[0].description;
            document.querySelector("#weather-desc-5").textContent = forecast[3].weather[0].description;
            document.querySelector("#weather-desc-6").textContent = forecast[4].weather[0].description;
            //Assigning temperature to each specific day based off array data
            document.querySelector("#day2-t").textContent = "Temperature: " + forecast[0].main.temp + " °F";
            document.querySelector("#day3-t").textContent = "Temperature: " + forecast[1].main.temp + " °F";
            document.querySelector("#day4-t").textContent = "Temperature: " + forecast[2].main.temp + " °F";
            document.querySelector("#day5-t").textContent = "Temperature: " + forecast[3].main.temp + " °F";
            document.querySelector("#day6-t").textContent = "Temperature: " + forecast[4].main.temp + " °F";
            //Assigning wind speed to each specific day based off array data
            document.querySelector("#day2-w").textContent = "Wind Speed: " + forecast[0].wind.speed + " mph";
            document.querySelector("#day3-w").textContent = "Wind Speed: " + forecast[1].wind.speed + " mph";
            document.querySelector("#day4-w").textContent = "Wind Speed: " + forecast[2].wind.speed + " mph";
            document.querySelector("#day5-w").textContent = "Wind Speed: " + forecast[3].wind.speed + " mph";
            document.querySelector("#day6-w").textContent = "Wind Speed: " + forecast[4].wind.speed + " mph";
            //Assigning humidity to each specific day based off array data
            document.querySelector("#day2-h").textContent = "Humidity: " + forecast[0].main.humidity + " %";
            document.querySelector("#day3-h").textContent = "Humidity: " + forecast[1].main.humidity + " %";
            document.querySelector("#day4-h").textContent = "Humidity: " + forecast[2].main.humidity + " %";
            document.querySelector("#day5-h").textContent = "Humidity: " + forecast[3].main.humidity + " %";
            document.querySelector("#day6-h").textContent = "Humidity: " + forecast[4].main.humidity + " %";
        });
}

pageLoad()
//Event listener-When user types in city and clicks search
citySearchBtn.addEventListener('click', userCity);
