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
                    var togglebutt = document.getElementById("togglebutton");
                    if(isCelsius){
                        tempElement.textContent = "°C";
                        temp.textContent = `${currentTempC}`;
                        togglebutt.textContent = "to °F"
                    }
                    else{
                        tempElement.textContent = "°F";
                        temp.textContent = `${currentTempF}`;
                        togglebutt.textContent = "to °C"
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
                
                const weatherText = data.forecast.forecastday[0].day.condition.text;

                const forecastA = document.getElementById('forecast-weather-img-a');
                const forecastB = document.getElementById('forecast-weather-img-b');
                const forecastC = document.getElementById('forecast-weather-img-c');
                const forecastD = document.getElementById('forecast-weather-img-d');
                const forecastE = document.getElementById('forecast-weather-img-e');
                const forecastF = document.getElementById('forecast-weather-img-f');

                const imageSrcForecast = setWeatherImage(weatherText);
                forecastA.src = imageSrcForecast;
                forecastB.src = imageSrcForecast;
                forecastC.src = imageSrcForecast;
                forecastD.src = imageSrcForecast;
                forecastE.src = imageSrcForecast;
                forecastF.src = imageSrcForecast;

                function setWeatherImage(weatherText) {
                let lowercaseConditionText = weatherText.toLowerCase();
                let imageSrcForecast = '';

                if (lowercaseConditionText.includes('sunny')) {
                    imageSrcForecast = './photo/weather-images/weather-clear-day.svg';
                } else if (lowercaseConditionText.includes('clear')) {
                    imageSrcForecast = './photo/weather-images/weather-clear-night.svg';
                } else if (lowercaseConditionText.includes('cloudy')) {
                    imageSrcForecast = './photo/weather-images/weather-cloudy.svg';
                } else if (lowercaseConditionText.includes('overcast')) {
                    imageSrcForecast = './photo/weather-images/weather-overcast-day.svg';
                } else if (lowercaseConditionText.includes('mist') || lowercaseConditionText.includes('fog')) {
                    imageSrcForecast = './photo/weather-images/weather-mist-fog.svg';
                } else if (lowercaseConditionText.includes('snow') && lowercaseConditionText.includes('thunder')) {
                    imageSrcForecast = './photo/weather-images/weather-snow-thunder.svg';
                } else if (lowercaseConditionText.includes('rain') && lowercaseConditionText.includes('thunder')) {
                    imageSrcForecast = './photo/weather-images/weather-storm-thunder.svg';
                } else if (lowercaseConditionText.includes('thundery')) {
                    imageSrcForecast = './photo/weather-images/weather-storm-thunder.svg';
                } else if (
                    lowercaseConditionText.includes('rain') ||
                    lowercaseConditionText.includes('drizzle') ||
                    lowercaseConditionText.includes('overcast')
                ) {
                    imageSrcForecast = './photo/weather-images/weather-rain.svg';
                } else if (
                    lowercaseConditionText.includes('snow') ||
                    lowercaseConditionText.includes('blizzard') ||
                    lowercaseConditionText.includes('sleet') ||
                    lowercaseConditionText.includes('ice')
                ) {
                    imageSrcForecast = './photo/weather-images/weather-snow.svg';
                }

                return imageSrcForecast;
                }

            
                // SELECT IMAGE FOR CURRENT WEATHER
                
                const imageSrc = setWeatherImage(currentConditionText);
                weatherImageSrc.src = imageSrc;
            


                function setWeatherImage(currentConditionText) {
                    
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
