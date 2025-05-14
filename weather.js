// 🔹 API Key for OpenWeatherMap
const apiKey = "a25ae116766e7211e8c4ef3777fc45bd"; 

// 🔹 Base URL for OpenWeatherMap API (fetches weather data in metric units)
const apiUrl= "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// 🔹 Selecting the search input field and button elements from the DOM
const searchBox = document.querySelector(".search input");  // Input field where the user enters the city name
const searchBtn = document.querySelector(".search button"); // Search button to trigger the API call
const weatherIcon = document.querySelector(".weather-icon"); // Weather icon element to display appropriate image

// 🔹 Asynchronous function to fetch weather data based on the entered city
async function checkWeather(city) {
    // Fetching weather data from the API
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    // 🔹 Handling cases where the city is not found
    if(response.status == 404) {
        document.querySelector(".error").style.display = "block";  // Shows error message
        document.querySelector(".weather").style.display = "none"; // Hides weather details
    } else {
        // 🔹 Parsing the API response to JSON format
        var data = await response.json();

        // 🔹 Updating the weather details in the DOM
        document.querySelector('.city').innerHTML = data.name; // Display city name
        document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + "°C"; // Display temperature
        document.querySelector('.humidity').innerHTML = data.main.humidity + "%"; // Display humidity percentage
        document.querySelector('.wind').innerHTML = data.wind.speed + "km/h"; // Display wind speed

        // 🔹 Updating the weather icon based on the received weather condition
        if(data.weather[0].main == "Clouds") {
            weatherIcon.src = "images/clouds.png";
        }
        else if(data.weather[0].main == "Clear") {
            weatherIcon.src = "images/clear.png";
        }
        else if(data.weather[0].main == "Rain") {
            weatherIcon.src = "images/rain.png";
        }
        else if(data.weather[0].main == "Drizzle") {
            weatherIcon.src = "images/drizzle.png";
        }
        else if(data.weather[0].main == "Mist") {
            weatherIcon.src = "images/mist.png";
        }

        // 🔹 Making the weather details visible and hiding the error message
        document.querySelector(".weather").style.display = "block"; 
        document.querySelector(".error").style.display = "none"; 
    }
}

// 🔹 Adding an event listener to the search button
//    When clicked, it triggers the checkWeather function with the input field value
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});
// 🔹 Adding an event listener to detect when a key is pressed inside the input field
searchBox.addEventListener("keypress", (event) => {
    
    // 🔹 Checking if the pressed key is "Enter"
    if (event.key === "Enter") {
        
        // 🔹 Calling the checkWeather function with the current input value
        //    This allows the user to trigger the weather search by pressing Enter
        checkWeather(searchBox.value);
    }
});


