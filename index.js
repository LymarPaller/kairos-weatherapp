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
const tempC = document.getElementById('temp-c');
const time = document.getElementById('widget-time');
const curDate = document.getElementById('widget-date');
const day = document.getElementById('widget-day');

// get postion coordinate for longitude and latitude 
const today = new Date(),
	weekday = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'),
	dayOfWeek = weekday[today.getDay()],
	dayOfMonth = ( today.getDate() < 10) ? '0' + today.getDate() : today.getDate(),
	months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'),
	curMonth = months[today.getMonth()],
	curYear = today.getFullYear(),
	curHour = today.getHours() > 12 ? today.getHours() - 12 : (today.getHours() < 10 ? "0" + today.getHours() : today.getHours()),
	curMinute = today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes(),
	curSeconds = today.getSeconds() < 10 ? "0" + today.getSeconds() : today.getSeconds(),
	curMeridiem = today.getHours() > 12 ? "PM" : "AM";
    const currentDay = curMonth + " " + dayOfMonth + ", " + curYear;
    
    getHours = (curHour % 12) || 12;
    

time.textContent = `${getHours}:${curMinute}`;
curDate.textContent = `${curMonth} ${dayOfMonth}, ${curYear}`;
day.textContent = `${dayOfWeek}`;

const successCallback = (position) => {
    
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

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
                const currentConditionText = current.condition.text; // set variable for weather
                const currentWindSpeed = current.wind_kph; //
                const currentHumidity = current.humidity;
                const currentTempC = current.temp_c;

                currentWeather.textContent = `${currentConditionText}`;
                windSpeed.textContent = `${currentWindSpeed}kph`;
                humidity.textContent = `${currentHumidity}%`;
                tempC.textContent = `${currentTempC}`;

            })

    });
};

const errorCallback = (err) => {
    console.log(err);
};

 if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    
};
