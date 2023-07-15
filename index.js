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


// get postion coordinate for longitude and latitude 
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



const successCallback = (position) => {
    
const latitude = position.coords.latitude;
const longitude = position.coords.longitude;

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
        const currentCity = location.name;
        const currentState = location.state;

        // apply city name from array to html id

        firstTabCity.textContent = `${currentCity}`; // display city name in HTML
        firstTabState.textContent = `${currentState}`; //display state name in HTML


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

                //FORECAST WEATHER
                
                const weatherTextA = data.forecast.forecastday[0].day.condition.text;
                const weatherTextB = data.forecast.forecastday[1].day.condition.text;
                const weatherTextC = data.forecast.forecastday[2].day.condition.text;
                const weatherTextD = data.forecast.forecastday[3].day.condition.text;
                const weatherTextE = data.forecast.forecastday[4].day.condition.text;
                const weatherTextF = data.forecast.forecastday[5].day.condition.text;

                const forecastA = document.getElementById('forecast-weather-img-a');
                const forecastB = document.getElementById('forecast-weather-img-b');
                const forecastC = document.getElementById('forecast-weather-img-c');
                const forecastD = document.getElementById('forecast-weather-img-d');
                const forecastE = document.getElementById('forecast-weather-img-e');
                const forecastF = document.getElementById('forecast-weather-img-f');

                const imageSrcForecastA = setWeatherImage(weatherTextA);
                forecastA.src = imageSrcForecastA;
                const imageSrcForecastB = setWeatherImage(weatherTextB);
                forecastB.src = imageSrcForecastB;
                // const imageSrcForecast = setWeatherImage(weatherTextA);
                // forecastC.src = imageSrcForecast;
                // const imageSrcForecast = setWeatherImage(weatherTextA);
                // forecastD.src = imageSrcForecast;
                // const imageSrcForecast = setWeatherImage(weatherTextA);
                // forecastE.src = imageSrcForecast;
                // const imageSrcForecast = setWeatherImage(weatherTextA);
                // forecastF.src = imageSrcForecast;

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

const navContent = ["New City"];
let ulCounter = 1;

function generateNav() {
  const navContainer = document.getElementById("nav-container");

  // Create a new nav-ul element
  const navUl = document.createElement("ul");
  navUl.id = `navUl${ulCounter}`;

  // Add content to the nav-ul
  navContent.forEach(item => {
    const li = document.createElement("li");

    // Create the search box
    const searchBox = document.createElement("input");
    searchBox.type = "text";
    searchBox.placeholder = "Enter City";
    searchBox.className = "search-box"
    li.appendChild(searchBox);

    navUl.appendChild(li);
  });

  // Append the nav-ul to the navContainer
  navContainer.appendChild(navUl);

  ulCounter++;
}

const generateButton = document.getElementById("generateButton");
generateButton.addEventListener("click", generateNav);