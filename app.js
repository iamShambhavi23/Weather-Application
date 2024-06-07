let app = document.querySelector(".weather-app");
let temp = document.querySelector(".temp");
let dateOutput = document.querySelector(".date");
let timeOutput = document.querySelector(".time");
let conditionOutput = document.querySelector(".condition");
let nameOutput = document.querySelector(".name");
let icon = document.querySelector(".icon");
let cloudOutput = document.querySelector(".cloud");
let humidityOutput = document.querySelector(".humidity");
let windOutput = document.querySelector(".wind");
let feelsLikeOutput = document.querySelector(".feels-like");
let form = document.getElementById("locationInput");
let search = document.querySelector(".search");
let btn = document.querySelector(".submit");
let cities = document.querySelectorAll(".city");


// Default city when the page loads
let cityInput = "Patna";

// Add click event to each city in the panel
cities.forEach(city => {
    city.addEventListener('click', (e) => {
        // Change default city to the new one
        cityInput = e.target.innerHTML;
        fetchWeatherData();
        app.style.opacity = "0";
    });
});

// Add submit event to the form
form.addEventListener('submit', (e) => {
    if (search.value.length == 0) {
        alert('Please type in a city name');
    } else {
        cityInput = search.value;
        fetchWeatherData();
        search.value = "";
        app.style.opacity = "0";
    }
    e.preventDefault();
});

function dayOfTheWeek(day, month, year) {
    let weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return weekday[new Date(`${year}-${month}-${day}`).getDay()];
}

function fetchWeatherData() {
    const apiKey = '5688dad4c7fb4ab38bc195421240106';
    fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityInput}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            temp.innerHTML = data.current.temp_c + "&#176;C";
            conditionOutput.innerHTML = data.current.condition.text;
            let date = data.location.localtime;
            let y = parseInt(date.substr(0, 4));
            let m = parseInt(date.substr(5, 2));
            let d = parseInt(date.substr(8, 2));
            let time = date.substr(11);
            dateOutput.innerHTML = `${dayOfTheWeek(d, m, y)} (${d} - ${m} - ${y})`;
            timeOutput.innerHTML = time;
            nameOutput.innerHTML = data.location.name;
            const iconId = data.current.condition.icon.split("/").pop();
            icon.src = data.current.condition.icon.replace('http:', 'https:'); 
            cloudOutput.innerHTML = data.current.cloud + "%";
            humidityOutput.innerHTML = data.current.humidity + "%";
            windOutput.innerHTML = data.current.wind_kph + "km/h";
            let feelsLike = data.current.feelslike_c; // Assuming temperature is in Celsius
            feelsLikeOutput.innerHTML = ` ${feelsLike}&#176;C`;

            let timeOfDay = "day";
            const code = data.current.condition.code;

            if (!data.current.is_day) {
                timeOfDay = "night";
            }

            if (code == 1000) {
                let imageUrl;
                if (timeOfDay === 'day') {
                    imageUrl = `./day/sunny.png`;
                    btn.style.background = "#e5ba92";
                } else {
                    imageUrl = `./night/clear.avif`;
                    btn.style.background = "#181e27"; // or any other night color
                }
                app.style.backgroundImage = `url(${imageUrl})`;
                

            } else if (code >= 1003 && code <= 1009 || code >= 1030 && code <= 1135 || code >= 1273 && code <= 1282) {
                let imageUrl;
                if (timeOfDay === 'day') {
                    imageUrl = `./day/cloudy.png`;
                    btn.style.background = "#fa6d1b";
                } else {
                    imageUrl = `./night/cloudly.jpg`;
                    btn.style.background = "#181e27"; // or any other night color
                }
                app.style.backgroundImage = `url(${imageUrl})`;
                
            } else if (code >= 1063 && code <= 1207 || code >= 1240 && code <= 1252) {
                let imageUrl;
                if (timeOfDay === 'day') {
                    imageUrl = `./day/rainy.jpg`;
                    btn.style.background = "#647d75";
                } else {
                    imageUrl = `./night/rainy.jpg`;
                    btn.style.background = "#325c80"; // or any other night color
                }
                app.style.backgroundImage = `url(${imageUrl})`;
            } else {
                let imageUrl;
                if (timeOfDay === 'day') {
                    imageUrl = `./day/snow.jpg`;
                    btn.style.background = "#4d72aa";
                } else {
                    imageUrl = `./night/snow.jpg.webp`;
                    btn.style.background = "#1b1b1b"; // or any other night color
                }
                app.style.backgroundImage = `url(${imageUrl})`;
            }
            app.style.opacity = "1";
        })
        .catch(() => {
            alert('City not found, please try again');
            app.style.opacity = "1";
        });
}

fetchWeatherData();
app.style.opacity = "1";
