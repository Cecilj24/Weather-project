var weatherKey = "d0c19ceab7f74c33d5bcc2a50f5f0296";
var weatherEndPoint = "https://api.openweathermap.org/data/2.5/weather?units=imperial&appid=" + weatherKey;
var monday = document.querySelector(".day1");
var tuesday = document.querySelector(".day2");
var wednesday = document.querySelector(".day3");
var thursday = document.querySelector(".day4");
var friday = document.querySelector(".day5");
var temp = document.querySelector(".temp");
var icons = document.querySelectorAll('.icons');
var windspeed = document.querySelectorAll('.windspeed');
var humidity = document.querySelectorAll('.humidity');
var search = document.querySelector(".search");
var searchBar = document.querySelector(".searchBar");
var cityName = document.querySelector(".cityName");



async function getWeatherByCity(cityName) {
    var endResult = weatherEndPoint + "&q=" + cityName;
    var respond = await fetch(endResult);
    var weather = await respond.json();

    console.log(weather);
    console.log(weather.main.humidity)
    console.log(weather.main.temp)
    console.log(weather.wind.speed)
    temp.textContent = 'temperature: ' + weather.main.temp
    windspeed.textContent = 'windspeed:' + weather.wind.speed + "mph"
    humidity.textContent = "humidity:" + weather.main.humidity
    var lat = weather.coord.lat
    var lon = weather.coord.lon
    // pull  city name form data and save it in an array of searches in local storage *remember only stings can be saved to local storage so you will need you JSON.stringify() when saving and JSON.parse() when retrieving 
    // localstorage.setItem(key, value)  localstorage.getItem(key)
    forcastWeather(lat, lon);
}

search.addEventListener("click", (event) => {
    if (event.type === "click") {
        console.log(searchBar.value)
        getWeatherByCity(searchBar.value);
    }
})

async function forcastWeather(lat, lon) {
    var respond = await fetch('https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=' + weatherKey);
    var data = await respond.json();

    console.log(data)
    var forecast = []
    for (let i = 7; i < data.list.length; i += 8) {

        console.log(data.list[i]);

        forecast.push(data.list[i])
    }
    for (let i = 0; i < icons.length; i++) {
        const children = icons[i].children;
        children[0].textContent = forecast[i].dt_txt
        children[1].textContent = forecast[i].main.temp + "\u00B0"
        children[2].textContent = forecast[i].wind.speed + "mph"
        children[3].textContent = forecast[i].main.humidity + "%"


    }
}

