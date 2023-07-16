// const forecastAPI = `https://api.weatherapi.com/v1/forecast.json?key=ad6a22d37a6e4fdeb45135830230707%20&q=${currentCity}&days=7&aqi=no&alerts=no`;

// cosnt geoLocAPI2 = `https://api.openweathermap.org/geo/1.0/reverse?lat=10.6066483&lon=123.0404676&appid=42207e457e3eb8b6df3dd8146f5bfc1b`


const geoLocAPIKEY = '42207e457e3eb8b6df3dd8146f5bfc1b';
const forecastAPIKEY = 'ad6a22d37a6e4fdeb45135830230707';


// variables for ID

const firstTabCity = document.getElementById('first-tab-city');
const firstTabState = document.getElementById('first-tab-state');
const currentWeather = document.getElementById('current-weather');
const currentWeatherContainer = document.getElementById('current-weather-container');
const windSpeed = document.getElementById('wind-speed');
const humidity = document.getElementById('chance-of-rain');
const temp = document.getElementById('temp_set');
const time = document.getElementById('widget-time');
const curDate = document.getElementById('widget-date');
const day = document.getElementById('widget-day');
const amPm = document.getElementById('am-pm');
const weatherImageSrc = document.getElementById('current-weather-img');
const firstDay = document.getElementById('first-day-forecast');
const secondDay =  document.getElementById('second-day-forecast');
const thirdDay =  document.getElementById('third-day-forecast');
const fourthDay =  document.getElementById('fourth-day-forecast');
const fifthDay =  document.getElementById('fifth-day-forecast');
const sixthDay =  document.getElementById('sixth-day-forecast');

// sets current time and current date

const today = new Date(),
weekday = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'),
dayOfWeek = weekday[today.getDay()],
dayOfMonth = ( today.getDate() < 10) ? '0' + today.getDate() : today.getDate(),
months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'),
curMonth = months[today.getMonth()],
curYear = today.getFullYear(),
curHour = today.getHours() > 12 ? today.getHours() - 12 : (today.getHours() < 10 ? "0" + today.getHours() : today.getHours()),
convertHour = (curHour%12) || 12,
curMinute = today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes(),
curSeconds = today.getSeconds() < 10 ? "0" + today.getSeconds() : today.getSeconds(),
curMeridiem = today.getHours() > 12 ? "PM" : "AM";
const currentDay = curMonth + " " + dayOfMonth + ", " + curYear;

console.log(`${curMeridiem}`);

time.textContent = `${curHour}:${curMinute}`;
amPm.textContent = `${curMeridiem}`;
curDate.textContent = `${curMonth} ${dayOfMonth}, ${curYear}`;
day.textContent = `${dayOfWeek}`;

// get postion coordinate for longitude and latitude 

const successCallback = (position) => {
    
const latitude = position.coords.latitude;
const longitude = position.coords.longitude;

// sets night and day background function

function setBackground(){
    var date = new Date();
    var hours = date.getHours();

    var body = document.body;
    if (hours >= 6 && hours < 18){
        document.body.style.backgroundImage = "url('./photo/background-day.jpg')";
        console.log("day");
    }
    else {
        document.body.style.backgroundImage = "url('./photo/background-night.jpg')";
        console.log("night");
    }
}

setBackground();
setInterval(setBackground,60000);

// var listItem = document.querySelectorAll('#listSelector li');

// listItem.forEach(function(item){
//     item.addEventListener('click', function(event){
//         highlightListItem(event.target);
//     });
// });

// highlight nav links in nav bar

// function highlightListItem(clickedItem) {
//     const listItem = document.querySelectorAll('li');
    
//     listItem.forEach(function (item) {
//         item.style.backgroundColor = '';
//         item.querySelector('h1').style.backgroundColor = '';
//         item.querySelector('p').style.backgroundColor = '';
//         item.style.filter = '';
//     });

//     clickedItem.style.backgroundColor = '#EAEAEA';
//     clickedItem.querySelector('h1').style.backgroundColor = '#EAEAEA';
//     clickedItem.querySelector('p').style.backgroundColor = '#EAEAEA';

//     listItem.forEach(function (item) {
//         if (item !== clickedItem) {
//             item.style.filter = 'blur(0px)';
//         }
//     });
// }

// fetch geoAPI and apply latitude and latitude to API URL

fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&appid=42207e457e3eb8b6df3dd8146f5bfc1b`)
    .then((result) => {
        if (result.ok) {
            return result.json();
        }
        else {
            console.log('error');
        }
     })

     // get DATA of GEO API array

    .then((arr) => {
        const location = arr[0];
        // console.log(location.name);
        // console.log(location.state);
        // console.log(location.country)
        let currentCity = location.name;
        let currentState = location.state;

        // apply city name from array to html id

        firstTabCity.textContent = `${currentCity}`;
        firstTabState.textContent = `${currentState}`;

        // fetch weather forecast API and apply current city and state in API URL
        
        fetch(`https://api.weatherapi.com/v1/forecast.json?key=ad6a22d37a6e4fdeb45135830230707%20&q=${currentCity},${currentState}&days=7&aqi=no&alerts=no`)
            .then((result) => {
                if (result.ok) {
                    return result.json();
                }
                else {
                    console.log('error');
                }
            })
            .then((data) => {
                const current = data.current;
                const forecast = data.forecast
                const currentConditionText = current.condition.text; // set variable for weather
                const currentWindSpeed = current.wind_kph; //
                const currentHumidity = current.humidity;
                const currentTempC = current.temp_c;
                const currentTempF = current.temp_f;

                currentWeather.textContent = `${currentConditionText}`;
                windSpeed.textContent = `${currentWindSpeed}kph`;
                humidity.textContent = `${currentHumidity}%`;
                var isCelsius = true;
                temp.textContent = `${currentTempC}`;
                function displayTemperature() {
                    var tempElement = document.getElementById("setForC");
                    if(isCelsius){
                        tempElement.textContent = "°C";
                        temp.textContent = `${currentTempC}`;
                    }
                    else{
                        tempElement.textContent = "°F";
                        temp.textContent = `${currentTempF}`;
                    }
                }

                function toggleUnits(){
                    isCelsius = !isCelsius;
                    displayTemperature();
                }

                document.getElementById("widget-temp").addEventListener("click",toggleUnits);

                //FORECAST
                const forecastDays = [];

                for (let i = 1; i <= 6; i++) {
                const dayForecast = forecast.forecastday[i];
                forecastDays.push(dayForecast.date);

                const dateStr = dayForecast.date;
                const date = new Date(dateStr);
                const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });

                const dayElement = document.getElementById(`day-${i}`);
                dayElement.textContent = dayOfWeek;
                
                }

                // STORES FORECAST CONDITION TO CORRESPONDING DAY
                
                const weatherTextA = data.forecast.forecastday[0].day.condition.text;
                const weatherTextB = data.forecast.forecastday[1].day.condition.text;
                const weatherTextC = data.forecast.forecastday[2].day.condition.text;
                const weatherTextD = data.forecast.forecastday[3].day.condition.text;
                const weatherTextE = data.forecast.forecastday[4].day.condition.text;
                const weatherTextF = data.forecast.forecastday[5].day.condition.text;

                // STORE VARIABLE NAME FROM HTML IMG ID

                const forecastA = document.getElementById('forecast-weather-img-a');
                const forecastB = document.getElementById('forecast-weather-img-b');
                const forecastC = document.getElementById('forecast-weather-img-c');
                const forecastD = document.getElementById('forecast-weather-img-d');
                const forecastE = document.getElementById('forecast-weather-img-e');
                const forecastF = document.getElementById('forecast-weather-img-f');

                // SETS IMAGE SOURCE FOR EACH FORECAST

                const imageSrcForecastA = setWeatherImage(weatherTextA);
                forecastA.src = imageSrcForecastA;
                const imageSrcForecastB = setWeatherImage(weatherTextB);
                forecastB.src = imageSrcForecastB;
                const imageSrcForecastC = setWeatherImage(weatherTextC);
                forecastC.src = imageSrcForecastC;
                const imageSrcForecastD = setWeatherImage(weatherTextD);
                forecastD.src = imageSrcForecastD;
                const imageSrcForecastE = setWeatherImage(weatherTextE);
                forecastE.src = imageSrcForecastE;
                const imageSrcForecastF = setWeatherImage(weatherTextF);
                forecastF.src = imageSrcForecastF;

                //SET WEATHERFORECAST IMAGE FOR FORECAST A
                function setWeatherImage(weatherText) {
                let lowercaseConditionText = weatherText.toLowerCase();
                let imageSrcForecastA = '';

                if (lowercaseConditionText.includes('sunny')) {
                    imageSrcForecastA = './photo/weather-images/weather-clear-day.svg';
                } else if (lowercaseConditionText.includes('clear')) {
                    imageSrcForecastA = './photo/weather-images/weather-clear-night.svg';
                } else if (lowercaseConditionText.includes('cloudy')) {
                    imageSrcForecastA = './photo/weather-images/weather-cloudy.svg';
                } else if (lowercaseConditionText.includes('overcast')) {
                    imageSrcForecastA = './photo/weather-images/weather-overcast-day.svg';
                } else if (lowercaseConditionText.includes('mist') || lowercaseConditionText.includes('fog')) {
                    imageSrcForecastA = './photo/weather-images/weather-mist-fog.svg';
                } else if (lowercaseConditionText.includes('snow') && lowercaseConditionText.includes('thunder')) {
                    imageSrcForecastA = './photo/weather-images/weather-snow-thunder.svg';
                } else if (lowercaseConditionText.includes('rain') && lowercaseConditionText.includes('thunder')) {
                    imageSrcForecastA = './photo/weather-images/weather-storm-thunder.svg';
                } else if (lowercaseConditionText.includes('thundery')) {
                    imageSrcForecastA = './photo/weather-images/weather-storm-thunder.svg';
                } else if (
                    lowercaseConditionText.includes('rain') ||
                    lowercaseConditionText.includes('drizzle') ||
                    lowercaseConditionText.includes('overcast')
                ) {
                    imageSrcForecastA = './photo/weather-images/weather-rain.svg';
                } else if (
                    lowercaseConditionText.includes('snow') ||
                    lowercaseConditionText.includes('blizzard') ||
                    lowercaseConditionText.includes('sleet') ||
                    lowercaseConditionText.includes('ice')
                ) {
                    imageSrcForecastA = './photo/weather-images/weather-snow.svg';
                }

                return imageSrcForecastA;
                }

                //SET WEATHERFORECAST IMAGE FOR FORECAST B
                function setWeatherImage(weatherText) {
                    let lowercaseConditionText = weatherText.toLowerCase();
                    let imageSrcForecastB = '';
    
                    if (lowercaseConditionText.includes('sunny')) {
                        imageSrcForecastB = './photo/weather-images/weather-clear-day.svg';
                    } else if (lowercaseConditionText.includes('clear')) {
                        imageSrcForecastB = './photo/weather-images/weather-clear-night.svg';
                    } else if (lowercaseConditionText.includes('cloudy')) {
                        imageSrcForecastB = './photo/weather-images/weather-cloudy.svg';
                    } else if (lowercaseConditionText.includes('overcast')) {
                        imageSrcForecastB = './photo/weather-images/weather-overcast-day.svg';
                    } else if (lowercaseConditionText.includes('mist') || lowercaseConditionText.includes('fog')) {
                        imageSrcForecastB = './photo/weather-images/weather-mist-fog.svg';
                    } else if (lowercaseConditionText.includes('snow') && lowercaseConditionText.includes('thunder')) {
                        imageSrcForecastB = './photo/weather-images/weather-snow-thunder.svg';
                    } else if (lowercaseConditionText.includes('rain') && lowercaseConditionText.includes('thunder')) {
                        imageSrcForecastB = './photo/weather-images/weather-storm-thunder.svg';
                    } else if (lowercaseConditionText.includes('thundery')) {
                        imageSrcForecastB = './photo/weather-images/weather-storm-thunder.svg';
                    } else if (
                        lowercaseConditionText.includes('rain') ||
                        lowercaseConditionText.includes('drizzle') ||
                        lowercaseConditionText.includes('overcast')
                    ) {
                        imageSrcForecastB = './photo/weather-images/weather-rain.svg';
                    } else if (
                        lowercaseConditionText.includes('snow') ||
                        lowercaseConditionText.includes('blizzard') ||
                        lowercaseConditionText.includes('sleet') ||
                        lowercaseConditionText.includes('ice')
                    ) {
                        imageSrcForecastB = './photo/weather-images/weather-snow.svg';
                    }
    
                    return imageSrcForecastB;
                    }

                //SET WEATHERFORECAST IMAGE FOR FORECAST C
                function setWeatherImage(weatherText) {
                    let lowercaseConditionText = weatherText.toLowerCase();
                    let imageSrcForecastC = '';
    
                    if (lowercaseConditionText.includes('sunny')) {
                        imageSrcForecastC = './photo/weather-images/weather-clear-day.svg';
                    } else if (lowercaseConditionText.includes('clear')) {
                        imageSrcForecastC = './photo/weather-images/weather-clear-night.svg';
                    } else if (lowercaseConditionText.includes('cloudy')) {
                        imageSrcForecastC = './photo/weather-images/weather-cloudy.svg';
                    } else if (lowercaseConditionText.includes('overcast')) {
                        imageSrcForecastC = './photo/weather-images/weather-overcast-day.svg';
                    } else if (lowercaseConditionText.includes('mist') || lowercaseConditionText.includes('fog')) {
                        imageSrcForecastC = './photo/weather-images/weather-mist-fog.svg';
                    } else if (lowercaseConditionText.includes('snow') && lowercaseConditionText.includes('thunder')) {
                        imageSrcForecastC = './photo/weather-images/weather-snow-thunder.svg';
                    } else if (lowercaseConditionText.includes('rain') && lowercaseConditionText.includes('thunder')) {
                        imageSrcForecastC = './photo/weather-images/weather-storm-thunder.svg';
                    } else if (lowercaseConditionText.includes('thundery')) {
                        imageSrcForecastC = './photo/weather-images/weather-storm-thunder.svg';
                    } else if (
                        lowercaseConditionText.includes('rain') ||
                        lowercaseConditionText.includes('drizzle') ||
                        lowercaseConditionText.includes('overcast')
                    ) {
                        imageSrcForecastC = './photo/weather-images/weather-rain.svg';
                    } else if (
                        lowercaseConditionText.includes('snow') ||
                        lowercaseConditionText.includes('blizzard') ||
                        lowercaseConditionText.includes('sleet') ||
                        lowercaseConditionText.includes('ice')
                    ) {
                        imageSrcForecastC = './photo/weather-images/weather-snow.svg';
                    }
    
                    return imageSrcForecastC;
                    }

                //SET WEATHERFORECAST IMAGE FOR FORECAST D
                function setWeatherImage(weatherText) {
                    let lowercaseConditionText = weatherText.toLowerCase();
                    let imageSrcForecastD = '';
    
                    if (lowercaseConditionText.includes('sunny')) {
                        imageSrcForecastD = './photo/weather-images/weather-clear-day.svg';
                    } else if (lowercaseConditionText.includes('clear')) {
                        imageSrcForecastD = './photo/weather-images/weather-clear-night.svg';
                    } else if (lowercaseConditionText.includes('cloudy')) {
                        imageSrcForecastD = './photo/weather-images/weather-cloudy.svg';
                    } else if (lowercaseConditionText.includes('overcast')) {
                        imageSrcForecastD = './photo/weather-images/weather-overcast-day.svg';
                    } else if (lowercaseConditionText.includes('mist') || lowercaseConditionText.includes('fog')) {
                        imageSrcForecastD = './photo/weather-images/weather-mist-fog.svg';
                    } else if (lowercaseConditionText.includes('snow') && lowercaseConditionText.includes('thunder')) {
                        imageSrcForecastD = './photo/weather-images/weather-snow-thunder.svg';
                    } else if (lowercaseConditionText.includes('rain') && lowercaseConditionText.includes('thunder')) {
                        imageSrcForecastD = './photo/weather-images/weather-storm-thunder.svg';
                    } else if (lowercaseConditionText.includes('thundery')) {
                        imageSrcForecastD = './photo/weather-images/weather-storm-thunder.svg';
                    } else if (
                        lowercaseConditionText.includes('rain') ||
                        lowercaseConditionText.includes('drizzle') ||
                        lowercaseConditionText.includes('overcast')
                    ) {
                        imageSrcForecastD = './photo/weather-images/weather-rain.svg';
                    } else if (
                        lowercaseConditionText.includes('snow') ||
                        lowercaseConditionText.includes('blizzard') ||
                        lowercaseConditionText.includes('sleet') ||
                        lowercaseConditionText.includes('ice')
                    ) {
                        imageSrcForecastD = './photo/weather-images/weather-snow.svg';
                    }
    
                    return imageSrcForecastD;
                    }

                //SET WEATHERFORECAST IMAGE FOR FORECAST E
                function setWeatherImage(weatherText) {
                    let lowercaseConditionText = weatherText.toLowerCase();
                    let imageSrcForecastE = '';
    
                    if (lowercaseConditionText.includes('sunny')) {
                        imageSrcForecastE = './photo/weather-images/weather-clear-day.svg';
                    } else if (lowercaseConditionText.includes('clear')) {
                        imageSrcForecastE = './photo/weather-images/weather-clear-night.svg';
                    } else if (lowercaseConditionText.includes('cloudy')) {
                        imageSrcForecastE = './photo/weather-images/weather-cloudy.svg';
                    } else if (lowercaseConditionText.includes('overcast')) {
                        imageSrcForecastE = './photo/weather-images/weather-overcast-day.svg';
                    } else if (lowercaseConditionText.includes('mist') || lowercaseConditionText.includes('fog')) {
                        imageSrcForecastE = './photo/weather-images/weather-mist-fog.svg';
                    } else if (lowercaseConditionText.includes('snow') && lowercaseConditionText.includes('thunder')) {
                        imageSrcForecastE = './photo/weather-images/weather-snow-thunder.svg';
                    } else if (lowercaseConditionText.includes('rain') && lowercaseConditionText.includes('thunder')) {
                        imageSrcForecastE = './photo/weather-images/weather-storm-thunder.svg';
                    } else if (lowercaseConditionText.includes('thundery')) {
                        imageSrcForecastE = './photo/weather-images/weather-storm-thunder.svg';
                    } else if (
                        lowercaseConditionText.includes('rain') ||
                        lowercaseConditionText.includes('drizzle') ||
                        lowercaseConditionText.includes('overcast')
                    ) {
                        imageSrcForecastE = './photo/weather-images/weather-rain.svg';
                    } else if (
                        lowercaseConditionText.includes('snow') ||
                        lowercaseConditionText.includes('blizzard') ||
                        lowercaseConditionText.includes('sleet') ||
                        lowercaseConditionText.includes('ice')
                    ) {
                        imageSrcForecastE = './photo/weather-images/weather-snow.svg';
                    }
    
                    return imageSrcForecastE;
                    }

                //SET WEATHERFORECAST IMAGE FOR FORECAST F
                function setWeatherImage(weatherText) {
                    let lowercaseConditionText = weatherText.toLowerCase();
                    let imageSrcForecastF = '';
    
                    if (lowercaseConditionText.includes('sunny')) {
                        imageSrcForecastF = './photo/weather-images/weather-clear-day.svg';
                    } else if (lowercaseConditionText.includes('clear')) {
                        imageSrcForecastF = './photo/weather-images/weather-clear-night.svg';
                    } else if (lowercaseConditionText.includes('cloudy')) {
                        imageSrcForecastF = './photo/weather-images/weather-cloudy.svg';
                    } else if (lowercaseConditionText.includes('overcast')) {
                        imageSrcForecastF = './photo/weather-images/weather-overcast-day.svg';
                    } else if (lowercaseConditionText.includes('mist') || lowercaseConditionText.includes('fog')) {
                        imageSrcForecastF = './photo/weather-images/weather-mist-fog.svg';
                    } else if (lowercaseConditionText.includes('snow') && lowercaseConditionText.includes('thunder')) {
                        imageSrcForecastF = './photo/weather-images/weather-snow-thunder.svg';
                    } else if (lowercaseConditionText.includes('rain') && lowercaseConditionText.includes('thunder')) {
                        imageSrcForecastF = './photo/weather-images/weather-storm-thunder.svg';
                    } else if (lowercaseConditionText.includes('thundery')) {
                        imageSrcForecastF = './photo/weather-images/weather-storm-thunder.svg';
                    } else if (
                        lowercaseConditionText.includes('rain') ||
                        lowercaseConditionText.includes('drizzle') ||
                        lowercaseConditionText.includes('overcast')
                    ) {
                        imageSrcForecastF = './photo/weather-images/weather-rain.svg';
                    } else if (
                        lowercaseConditionText.includes('snow') ||
                        lowercaseConditionText.includes('blizzard') ||
                        lowercaseConditionText.includes('sleet') ||
                        lowercaseConditionText.includes('ice')
                    ) {
                        imageSrcForecastF = './photo/weather-images/weather-snow.svg';
                    }
    
                    return imageSrcForecastF;
                    }

                // SELECT IMAGE FOR CURRENT WEATHER
                
                const imageSrc = setCurrentWeatherImage(currentConditionText);
                weatherImageSrc.src = imageSrc;
            
                function setCurrentWeatherImage(currentConditionText) {
                    
                    let lowercaseConditionText = currentConditionText.toLowerCase();
                    let imageSrc = '';
            
                    if (lowercaseConditionText.includes('sunny')) {
                        imageSrc = './photo/weather-images/weather-clear-day.svg';
                    } else if (lowercaseConditionText.includes('clear')) {
                        imageSrc = './photo/weather-images/weather-clear-night.svg';
                    } else if (lowercaseConditionText.includes('cloudy')) {
                        imageSrc = './photo/weather-images/weather-cloudy.svg';
                    } else if (lowercaseConditionText.includes('overcast')) {
                        imageSrc = './photo/weather-images/weather-overcast-day.svg';
                    } else if (lowercaseConditionText.includes('mist') || lowercaseConditionText.includes('fog')) {
                        imageSrc = './photo/weather-images/weather-mist-fog.svg';
                    } else if (lowercaseConditionText.includes('snow') && lowercaseConditionText.includes('thunder')) {
                        imageSrc = './photo/weather-images/weather-snow-thunder.svg';
                    } else if (lowercaseConditionText.includes('rain') && lowercaseConditionText.includes('thunder')) {
                        imageSrc = './photo/weather-images/weather-storm-thunder.svg';
                    } else if (lowercaseConditionText.includes('Thundery')) {
                        imageSrc = './photo/weather-images/weather-storm-thunder.svg';
                    } else if (
                        lowercaseConditionText.includes('rain') ||
                        lowercaseConditionText.includes('drizzle') ||
                        lowercaseConditionText.includes('overcast')
                    ) {
                        imageSrc = './photo/weather-images/weather-rain.svg';
                    } else if (
                        lowercaseConditionText.includes('snow') ||
                        lowercaseConditionText.includes('blizzard') ||
                        lowercaseConditionText.includes('sleet') ||
                        lowercaseConditionText.includes('ice')
                    ) {
                        imageSrc = './photo/weather-images/weather-snow.svg';
                    }
                
                    return imageSrc;
                }

                
            })

    });
};

const errorCallback = (err) => {
    console.log(err);
};

 if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    
};

// REMADE THE ADD CITY BUTTON IT CAN SHOW 3 NAVBAR AT A TIME

document.addEventListener("DOMContentLoaded", function() {
    const cities = document.querySelectorAll(".second-city, .third-city, .fourth-city");
    const closeButtons = document.querySelectorAll(".close-button");
    const showCityButton = document.getElementById("show-city-button");
  
    closeButtons.forEach(function(closeButton) {
      closeButton.addEventListener("click", function(event) {
        const listItem = event.target.parentElement;
        listItem.style.display = "none";
      });
    });
  
    showCityButton.addEventListener("click", function() {
      // Find the first hidden city and show it
      const hiddenCity = [...cities].find(city => city.style.display === "none");
      if (hiddenCity) {
        hiddenCity.style.display = "list-item";
      }
    });
  });

  // show divs

document.addEventListener("DOMContentLoaded", function() {
    const mainCityLink = document.getElementById("main-city-link");
    const listItems = document.querySelectorAll(".row li");
    const pages = document.querySelectorAll(".city-one, .city-two, .city-three");
    const mainPage = document.getElementById("main-city");
  
    mainCityLink.addEventListener("click", function() {
      // Show the main city page and hide others
      mainPage.style.display = "block";
      pages.forEach(function(page) {
        page.style.display = "none";
      });
    });
  
    listItems.forEach(function(item, index) {
      item.addEventListener("click", function() {
        if (item === mainCityLink) {
          // If the main city link is clicked, show the main city page and hide others
          mainPage.style.display = "block";
        } else {
          // Hide the main city page and show the corresponding page
          mainPage.style.display = "none";
          pages.forEach(function(page) {
            page.style.display = "none";
          });
          pages[index - 1].style.display = "block";
        }
      });
    });
  });

// set variables for 2nd city div
const secondState = document.getElementById('second-tab-state')
const secondCurrentWeather = document.getElementById('current-weather-second');
const secondCurrentTemp = document.getElementById('temp_set-second');
const secondWindSpeed = document.getElementById('wind-speed-second');
const secondHumidity = document.getElementById('chance-of-rain-second');

const getCityName = () => {
    const secondCityName = document.getElementById('first-search-box').value;

    if (secondCityName === '') return;

    fetch(`https://api.weatherapi.com/v1/forecast.json?key=ad6a22d37a6e4fdeb45135830230707%20&q=${secondCityName}&days=7&aqi=no&alerts=no`)
        .then((result) => {
            if (result.ok) {
                return result.json();
            } else {
                console.log('error');
            }
        })
        .then((data) => {
        
            const current = data.current;
            const localDate = data.location.localtime;
            const forecast = data.forecast;
            const country = data.location.country;
            const currentConditionText = current.condition.text; // set variable for weather
            const currentWindSpeed = current.wind_kph; //
            const currentHumidity = current.humidity;
            const currentTempC = current.temp_c;
            const currentTempF = current.temp_f;

            secondState.textContent = `${country}`;
            secondCurrentWeather.textContent = `${currentConditionText}`;
            secondCurrentTemp.textContent=`${currentTempC}`;
            secondWindSpeed.textContent = `${currentWindSpeed}kph`;
            secondHumidity.textContent = `${currentHumidity}%`;

            // sets current time and current date

            const localTime = new Date(data.location.localtime);

            const weekday = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
            const dayOfWeek = weekday[localTime.getDay()];
            const dayOfMonth = (localTime.getDate() < 10) ? '0' + localTime.getDate() : localTime.getDate();
            const months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
            const curMonth = months[localTime.getMonth()];
            const curYear = localTime.getFullYear();
            const curHour = localTime.getHours() > 12 ? localTime.getHours() - 12 : (localTime.getHours() < 10 ? "0" + localTime.getHours() : localTime.getHours());
            const convertHour = (curHour % 12) || 12;
            const curMinute = localTime.getMinutes() < 10 ? "0" + localTime.getMinutes() : localTime.getMinutes();
            const curSeconds = localTime.getSeconds() < 10 ? "0" + localTime.getSeconds() : localTime.getSeconds();
            const curMeridiem = localTime.getHours() >= 12 ? "PM" : "AM";
            const currentDay = curMonth + " " + dayOfMonth + ", " + curYear;

            console.log(`${curHour}:${curMinute}`)

            // time.textContent = `${curHour}:${curMinute}`;
            // amPm.textContent = `${curMeridiem}`;
            // curDate.textContent = `${curMonth} ${dayOfMonth}, ${curYear}`;
            // day.textContent = `${dayOfWeek}`;

        });
};

const searchBox = document.getElementById('first-search-box');

searchBox.addEventListener('input', getCityName);
  
// fetch weather forecast API and apply current city and state in API URL
   
// fetch(`https://api.weatherapi.com/v1/forecast.json?key=ad6a22d37a6e4fdeb45135830230707%20&q=${secondCity}&days=7&aqi=no&alerts=no`)
// .then((result) => {
//     if (result.ok) {
//         return result.json();
//     }
//     else {
//         console.log('error');
//     }
// })
// .then((data) => {
//     const current = data.current;
//     const forecast = data.forecast;
//     const country = data.location.country;
//     const currentConditionText = current.condition.text; // set variable for weather
//     const currentWindSpeed = current.wind_kph; //
//     const currentHumidity = current.humidity;
//     const currentTempC = current.temp_c;
//     const currentTempF = current.temp_f;

//     secondState.textContent = `${country}`;
//     currentWeather.textContent = `${currentConditionText}`;
//     windSpeed.textContent = `${currentWindSpeed}kph`;
//     humidity.textContent = `${currentHumidity}%`;
//     const isCelsius = true;
//     temp.textContent = `${currentTempC}`;
//     function displayTemperature() {
//         const tempElement = document.getElementById("setForC");
//         if(isCelsius){
//             tempElement.textContent = "°C";
//             temp.textContent = `${currentTempC}`;
//         }
//         else{
//             tempElement.textContent = "°F";
//             temp.textContent = `${currentTempF}`;
//         }
//     }

//     function toggleUnits(){
//         isCelsius = !isCelsius;
//         displayTemperature();
//     }

//     document.getElementById("widget-temp").addEventListener("click",toggleUnits);

//     //FORECAST
//     const forecastDays = [];

//     for (let i = 1; i <= 6; i++) {
//     const dayForecast = forecast.forecastday[i];
//     forecastDays.push(dayForecast.date);

//     const dateStr = dayForecast.date;
//     const date = new Date(dateStr);
//     const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });

//     const dayElement = document.getElementById(`day-${i}`);
//     dayElement.textContent = dayOfWeek;
    
//     }

//     // STORES FORECAST CONDITION TO CORRESPONDING DAY
    
//     const weatherTextA = data.forecast.forecastday[0].day.condition.text;
//     const weatherTextB = data.forecast.forecastday[1].day.condition.text;
//     const weatherTextC = data.forecast.forecastday[2].day.condition.text;
//     const weatherTextD = data.forecast.forecastday[3].day.condition.text;
//     const weatherTextE = data.forecast.forecastday[4].day.condition.text;
//     const weatherTextF = data.forecast.forecastday[5].day.condition.text;

//     // STORE VARIABLE NAME FROM HTML IMG ID

//     const forecastA = document.getElementById('forecast-weather-img-a');
//     const forecastB = document.getElementById('forecast-weather-img-b');
//     const forecastC = document.getElementById('forecast-weather-img-c');
//     const forecastD = document.getElementById('forecast-weather-img-d');
//     const forecastE = document.getElementById('forecast-weather-img-e');
//     const forecastF = document.getElementById('forecast-weather-img-f');

//     // SETS IMAGE SOURCE FOR EACH FORECAST

//     const imageSrcForecastA = setWeatherImage(weatherTextA);
//     forecastA.src = imageSrcForecastA;
//     const imageSrcForecastB = setWeatherImage(weatherTextB);
//     forecastB.src = imageSrcForecastB;
//     const imageSrcForecastC = setWeatherImage(weatherTextC);
//     forecastC.src = imageSrcForecastC;
//     const imageSrcForecastD = setWeatherImage(weatherTextD);
//     forecastD.src = imageSrcForecastD;
//     const imageSrcForecastE = setWeatherImage(weatherTextE);
//     forecastE.src = imageSrcForecastE;
//     const imageSrcForecastF = setWeatherImage(weatherTextF);
//     forecastF.src = imageSrcForecastF;

//     //SET WEATHERFORECAST IMAGE FOR FORECAST A
//     function setWeatherImage(weatherText) {
//     let lowercaseConditionText = weatherText.toLowerCase();
//     let imageSrcForecastA = '';

//     if (lowercaseConditionText.includes('sunny')) {
//         imageSrcForecastA = './photo/weather-images/weather-clear-day.svg';
//     } else if (lowercaseConditionText.includes('clear')) {
//         imageSrcForecastA = './photo/weather-images/weather-clear-night.svg';
//     } else if (lowercaseConditionText.includes('cloudy')) {
//         imageSrcForecastA = './photo/weather-images/weather-cloudy.svg';
//     } else if (lowercaseConditionText.includes('overcast')) {
//         imageSrcForecastA = './photo/weather-images/weather-overcast-day.svg';
//     } else if (lowercaseConditionText.includes('mist') || lowercaseConditionText.includes('fog')) {
//         imageSrcForecastA = './photo/weather-images/weather-mist-fog.svg';
//     } else if (lowercaseConditionText.includes('snow') && lowercaseConditionText.includes('thunder')) {
//         imageSrcForecastA = './photo/weather-images/weather-snow-thunder.svg';
//     } else if (lowercaseConditionText.includes('rain') && lowercaseConditionText.includes('thunder')) {
//         imageSrcForecastA = './photo/weather-images/weather-storm-thunder.svg';
//     } else if (lowercaseConditionText.includes('thundery')) {
//         imageSrcForecastA = './photo/weather-images/weather-storm-thunder.svg';
//     } else if (
//         lowercaseConditionText.includes('rain') ||
//         lowercaseConditionText.includes('drizzle') ||
//         lowercaseConditionText.includes('overcast')
//     ) {
//         imageSrcForecastA = './photo/weather-images/weather-rain.svg';
//     } else if (
//         lowercaseConditionText.includes('snow') ||
//         lowercaseConditionText.includes('blizzard') ||
//         lowercaseConditionText.includes('sleet') ||
//         lowercaseConditionText.includes('ice')
//     ) {
//         imageSrcForecastA = './photo/weather-images/weather-snow.svg';
//     }

//     return imageSrcForecastA;
//     }

//     //SET WEATHERFORECAST IMAGE FOR FORECAST B
//     function setWeatherImage(weatherText) {
//         let lowercaseConditionText = weatherText.toLowerCase();
//         let imageSrcForecastB = '';

//         if (lowercaseConditionText.includes('sunny')) {
//             imageSrcForecastB = './photo/weather-images/weather-clear-day.svg';
//         } else if (lowercaseConditionText.includes('clear')) {
//             imageSrcForecastB = './photo/weather-images/weather-clear-night.svg';
//         } else if (lowercaseConditionText.includes('cloudy')) {
//             imageSrcForecastB = './photo/weather-images/weather-cloudy.svg';
//         } else if (lowercaseConditionText.includes('overcast')) {
//             imageSrcForecastB = './photo/weather-images/weather-overcast-day.svg';
//         } else if (lowercaseConditionText.includes('mist') || lowercaseConditionText.includes('fog')) {
//             imageSrcForecastB = './photo/weather-images/weather-mist-fog.svg';
//         } else if (lowercaseConditionText.includes('snow') && lowercaseConditionText.includes('thunder')) {
//             imageSrcForecastB = './photo/weather-images/weather-snow-thunder.svg';
//         } else if (lowercaseConditionText.includes('rain') && lowercaseConditionText.includes('thunder')) {
//             imageSrcForecastB = './photo/weather-images/weather-storm-thunder.svg';
//         } else if (lowercaseConditionText.includes('thundery')) {
//             imageSrcForecastB = './photo/weather-images/weather-storm-thunder.svg';
//         } else if (
//             lowercaseConditionText.includes('rain') ||
//             lowercaseConditionText.includes('drizzle') ||
//             lowercaseConditionText.includes('overcast')
//         ) {
//             imageSrcForecastB = './photo/weather-images/weather-rain.svg';
//         } else if (
//             lowercaseConditionText.includes('snow') ||
//             lowercaseConditionText.includes('blizzard') ||
//             lowercaseConditionText.includes('sleet') ||
//             lowercaseConditionText.includes('ice')
//         ) {
//             imageSrcForecastB = './photo/weather-images/weather-snow.svg';
//         }

//         return imageSrcForecastB;
//         }

//     //SET WEATHERFORECAST IMAGE FOR FORECAST C
//     function setWeatherImage(weatherText) {
//         let lowercaseConditionText = weatherText.toLowerCase();
//         let imageSrcForecastC = '';

//         if (lowercaseConditionText.includes('sunny')) {
//             imageSrcForecastC = './photo/weather-images/weather-clear-day.svg';
//         } else if (lowercaseConditionText.includes('clear')) {
//             imageSrcForecastC = './photo/weather-images/weather-clear-night.svg';
//         } else if (lowercaseConditionText.includes('cloudy')) {
//             imageSrcForecastC = './photo/weather-images/weather-cloudy.svg';
//         } else if (lowercaseConditionText.includes('overcast')) {
//             imageSrcForecastC = './photo/weather-images/weather-overcast-day.svg';
//         } else if (lowercaseConditionText.includes('mist') || lowercaseConditionText.includes('fog')) {
//             imageSrcForecastC = './photo/weather-images/weather-mist-fog.svg';
//         } else if (lowercaseConditionText.includes('snow') && lowercaseConditionText.includes('thunder')) {
//             imageSrcForecastC = './photo/weather-images/weather-snow-thunder.svg';
//         } else if (lowercaseConditionText.includes('rain') && lowercaseConditionText.includes('thunder')) {
//             imageSrcForecastC = './photo/weather-images/weather-storm-thunder.svg';
//         } else if (lowercaseConditionText.includes('thundery')) {
//             imageSrcForecastC = './photo/weather-images/weather-storm-thunder.svg';
//         } else if (
//             lowercaseConditionText.includes('rain') ||
//             lowercaseConditionText.includes('drizzle') ||
//             lowercaseConditionText.includes('overcast')
//         ) {
//             imageSrcForecastC = './photo/weather-images/weather-rain.svg';
//         } else if (
//             lowercaseConditionText.includes('snow') ||
//             lowercaseConditionText.includes('blizzard') ||
//             lowercaseConditionText.includes('sleet') ||
//             lowercaseConditionText.includes('ice')
//         ) {
//             imageSrcForecastC = './photo/weather-images/weather-snow.svg';
//         }

//         return imageSrcForecastC;
//         }

//     //SET WEATHERFORECAST IMAGE FOR FORECAST D
//     function setWeatherImage(weatherText) {
//         let lowercaseConditionText = weatherText.toLowerCase();
//         let imageSrcForecastD = '';

//         if (lowercaseConditionText.includes('sunny')) {
//             imageSrcForecastD = './photo/weather-images/weather-clear-day.svg';
//         } else if (lowercaseConditionText.includes('clear')) {
//             imageSrcForecastD = './photo/weather-images/weather-clear-night.svg';
//         } else if (lowercaseConditionText.includes('cloudy')) {
//             imageSrcForecastD = './photo/weather-images/weather-cloudy.svg';
//         } else if (lowercaseConditionText.includes('overcast')) {
//             imageSrcForecastD = './photo/weather-images/weather-overcast-day.svg';
//         } else if (lowercaseConditionText.includes('mist') || lowercaseConditionText.includes('fog')) {
//             imageSrcForecastD = './photo/weather-images/weather-mist-fog.svg';
//         } else if (lowercaseConditionText.includes('snow') && lowercaseConditionText.includes('thunder')) {
//             imageSrcForecastD = './photo/weather-images/weather-snow-thunder.svg';
//         } else if (lowercaseConditionText.includes('rain') && lowercaseConditionText.includes('thunder')) {
//             imageSrcForecastD = './photo/weather-images/weather-storm-thunder.svg';
//         } else if (lowercaseConditionText.includes('thundery')) {
//             imageSrcForecastD = './photo/weather-images/weather-storm-thunder.svg';
//         } else if (
//             lowercaseConditionText.includes('rain') ||
//             lowercaseConditionText.includes('drizzle') ||
//             lowercaseConditionText.includes('overcast')
//         ) {
//             imageSrcForecastD = './photo/weather-images/weather-rain.svg';
//         } else if (
//             lowercaseConditionText.includes('snow') ||
//             lowercaseConditionText.includes('blizzard') ||
//             lowercaseConditionText.includes('sleet') ||
//             lowercaseConditionText.includes('ice')
//         ) {
//             imageSrcForecastD = './photo/weather-images/weather-snow.svg';
//         }

//         return imageSrcForecastD;
//         }

//     //SET WEATHERFORECAST IMAGE FOR FORECAST E
//     function setWeatherImage(weatherText) {
//         let lowercaseConditionText = weatherText.toLowerCase();
//         let imageSrcForecastE = '';

//         if (lowercaseConditionText.includes('sunny')) {
//             imageSrcForecastE = './photo/weather-images/weather-clear-day.svg';
//         } else if (lowercaseConditionText.includes('clear')) {
//             imageSrcForecastE = './photo/weather-images/weather-clear-night.svg';
//         } else if (lowercaseConditionText.includes('cloudy')) {
//             imageSrcForecastE = './photo/weather-images/weather-cloudy.svg';
//         } else if (lowercaseConditionText.includes('overcast')) {
//             imageSrcForecastE = './photo/weather-images/weather-overcast-day.svg';
//         } else if (lowercaseConditionText.includes('mist') || lowercaseConditionText.includes('fog')) {
//             imageSrcForecastE = './photo/weather-images/weather-mist-fog.svg';
//         } else if (lowercaseConditionText.includes('snow') && lowercaseConditionText.includes('thunder')) {
//             imageSrcForecastE = './photo/weather-images/weather-snow-thunder.svg';
//         } else if (lowercaseConditionText.includes('rain') && lowercaseConditionText.includes('thunder')) {
//             imageSrcForecastE = './photo/weather-images/weather-storm-thunder.svg';
//         } else if (lowercaseConditionText.includes('thundery')) {
//             imageSrcForecastE = './photo/weather-images/weather-storm-thunder.svg';
//         } else if (
//             lowercaseConditionText.includes('rain') ||
//             lowercaseConditionText.includes('drizzle') ||
//             lowercaseConditionText.includes('overcast')
//         ) {
//             imageSrcForecastE = './photo/weather-images/weather-rain.svg';
//         } else if (
//             lowercaseConditionText.includes('snow') ||
//             lowercaseConditionText.includes('blizzard') ||
//             lowercaseConditionText.includes('sleet') ||
//             lowercaseConditionText.includes('ice')
//         ) {
//             imageSrcForecastE = './photo/weather-images/weather-snow.svg';
//         }

//         return imageSrcForecastE;
//         }

//     //SET WEATHERFORECAST IMAGE FOR FORECAST F
//     function setWeatherImage(weatherText) {
//         let lowercaseConditionText = weatherText.toLowerCase();
//         let imageSrcForecastF = '';

//         if (lowercaseConditionText.includes('sunny')) {
//             imageSrcForecastF = './photo/weather-images/weather-clear-day.svg';
//         } else if (lowercaseConditionText.includes('clear')) {
//             imageSrcForecastF = './photo/weather-images/weather-clear-night.svg';
//         } else if (lowercaseConditionText.includes('cloudy')) {
//             imageSrcForecastF = './photo/weather-images/weather-cloudy.svg';
//         } else if (lowercaseConditionText.includes('overcast')) {
//             imageSrcForecastF = './photo/weather-images/weather-overcast-day.svg';
//         } else if (lowercaseConditionText.includes('mist') || lowercaseConditionText.includes('fog')) {
//             imageSrcForecastF = './photo/weather-images/weather-mist-fog.svg';
//         } else if (lowercaseConditionText.includes('snow') && lowercaseConditionText.includes('thunder')) {
//             imageSrcForecastF = './photo/weather-images/weather-snow-thunder.svg';
//         } else if (lowercaseConditionText.includes('rain') && lowercaseConditionText.includes('thunder')) {
//             imageSrcForecastF = './photo/weather-images/weather-storm-thunder.svg';
//         } else if (lowercaseConditionText.includes('thundery')) {
//             imageSrcForecastF = './photo/weather-images/weather-storm-thunder.svg';
//         } else if (
//             lowercaseConditionText.includes('rain') ||
//             lowercaseConditionText.includes('drizzle') ||
//             lowercaseConditionText.includes('overcast')
//         ) {
//             imageSrcForecastF = './photo/weather-images/weather-rain.svg';
//         } else if (
//             lowercaseConditionText.includes('snow') ||
//             lowercaseConditionText.includes('blizzard') ||
//             lowercaseConditionText.includes('sleet') ||
//             lowercaseConditionText.includes('ice')
//         ) {
//             imageSrcForecastF = './photo/weather-images/weather-snow.svg';
//         }

//         return imageSrcForecastF;
//         }

//     // SELECT IMAGE FOR CURRENT WEATHER
    
//     const imageSrc = setCurrentWeatherImage(currentConditionText);
//     weatherImageSrc.src = imageSrc;

//     function setCurrentWeatherImage(currentConditionText) {
        
//         let lowercaseConditionText = currentConditionText.toLowerCase();
//         let imageSrc = '';

//         if (lowercaseConditionText.includes('sunny')) {
//             imageSrc = './photo/weather-images/weather-clear-day.svg';
//         } else if (lowercaseConditionText.includes('clear')) {
//             imageSrc = './photo/weather-images/weather-clear-night.svg';
//         } else if (lowercaseConditionText.includes('cloudy')) {
//             imageSrc = './photo/weather-images/weather-cloudy.svg';
//         } else if (lowercaseConditionText.includes('overcast')) {
//             imageSrc = './photo/weather-images/weather-overcast-day.svg';
//         } else if (lowercaseConditionText.includes('mist') || lowercaseConditionText.includes('fog')) {
//             imageSrc = './photo/weather-images/weather-mist-fog.svg';
//         } else if (lowercaseConditionText.includes('snow') && lowercaseConditionText.includes('thunder')) {
//             imageSrc = './photo/weather-images/weather-snow-thunder.svg';
//         } else if (lowercaseConditionText.includes('rain') && lowercaseConditionText.includes('thunder')) {
//             imageSrc = './photo/weather-images/weather-storm-thunder.svg';
//         } else if (lowercaseConditionText.includes('Thundery')) {
//             imageSrc = './photo/weather-images/weather-storm-thunder.svg';
//         } else if (
//             lowercaseConditionText.includes('rain') ||
//             lowercaseConditionText.includes('drizzle') ||
//             lowercaseConditionText.includes('overcast')
//         ) {
//             imageSrc = './photo/weather-images/weather-rain.svg';
//         } else if (
//             lowercaseConditionText.includes('snow') ||
//             lowercaseConditionText.includes('blizzard') ||
//             lowercaseConditionText.includes('sleet') ||
//             lowercaseConditionText.includes('ice')
//         ) {
//             imageSrc = './photo/weather-images/weather-snow.svg';
//         }
    
//         return imageSrc;
//     }

    
// })