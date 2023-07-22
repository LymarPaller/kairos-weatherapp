// const forecastAPI = `https://api.weatherapi.com/v1/forecast.json?key=ad6a22d37a6e4fdeb45135830230707%20&q=${currentCity}&days=7&aqi=no&alerts=no`;

// cosnt geoLocAPI2 = `https://api.openweathermap.org/geo/1.0/reverse?lat=10.6066483&lon=123.0404676&appid=42207e457e3eb8b6df3dd8146f5bfc1b`


const geoLocAPIKEY = '42207e457e3eb8b6df3dd8146f5bfc1b';
const forecastAPIKEY = 'b949fd5cf08a4f2496f14101231907';


// variables for MAIN div

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
const currentSunriseTime = document.getElementById('sunrise-main');
const currentSunsetTime = document.getElementById('sunset-main');
const tempElement = document.getElementById("setForC");
tempElement.textContent = "°C";

// variable for 2nd City div

const secondState = document.getElementById('second-tab-state')
const secondCurrentWeather = document.getElementById('current-weather-second');
const secondCurrentTemp = document.getElementById('temp_set-second');
const secondWindSpeed = document.getElementById('wind-speed-second');
const secondHumidity = document.getElementById('chance-of-rain-second');
const secondDate = document.getElementById('widget-date-second');
const secondCurrentDay = document.getElementById('widget-day-second');
const secondtAMPM = document.getElementById('am-pm-second');
const secondCurrentTime = document.getElementById('widget-time-second');
const weatherImageSrcSecond = document.getElementById('current-weather-img-second');
const tempSecond = document.getElementById('temp_set-second');
const sunriseSecond = document.getElementById('sunrise-second');
const sunsetSecond = document.getElementById('sunset-second');

// set variables for 3rd city div

const thirdState = document.getElementById('third-tab-state')
const thirdCurrentWeather = document.getElementById('current-weather-third');
const thirdCurrentTemp = document.getElementById('temp_set-third');
const thirdWindSpeed = document.getElementById('wind-speed-third');
const thirdHumidity = document.getElementById('chance-of-rain-third');
const thirdDate = document.getElementById('widget-date-third');
const thirdCurrentDay = document.getElementById('widget-day-third');
const thirdtAMPM = document.getElementById('am-pm-third');
const thirdCurrentTime = document.getElementById('widget-time-third');
const weatherImageSrcThird = document.getElementById('current-weather-img-third')
const tempThird = document.getElementById('temp_set-third');
const sunriseThird = document.getElementById('sunrise-third');
const sunsetThird = document.getElementById('sunset-third');


// set variables for 4th city div

const fourthState = document.getElementById('fourth-tab-state')
const fourthCurrentWeather = document.getElementById('current-weather-fourth');
const fourthCurrentTemp = document.getElementById('temp_set-fourth');
const fourthWindSpeed = document.getElementById('wind-speed-fourth');
const fourthHumidity = document.getElementById('chance-of-rain-fourth');
const fourthDate = document.getElementById('widget-date-fourth');
const fourthCurrentDay = document.getElementById('widget-day-fourth');
const fourthtAMPM = document.getElementById('am-pm-fourth');
const fourthCurrentTime = document.getElementById('widget-time-fourth');
const weatherImageSrcFourth = document.getElementById('current-weather-img-fourth')
const tempFourth = document.getElementById('temp_set-fourth')
const sunriseFourth = document.getElementById('sunrise-fourth');
const sunsetFourth = document.getElementById('sunset-fourth');
                                
//ANIMATIONS 
const timeWidget = document.querySelector(".status-widget-1")
const forecastDayAnim = document.querySelectorAll(".forecast-container .forecast-day")
const forecastImgAnimA = document.querySelectorAll("#main-city .forecast-container #forecast-weather-img-a")
const forecastImgAnimB = document.querySelectorAll("#main-city .forecast-container #forecast-weather-img-b")
const forecastImgAnimC = document.querySelectorAll("#main-city .forecast-container #forecast-weather-img-c")
const forecastImgAnimD = document.querySelectorAll("#main-city .forecast-container #forecast-weather-img-d")
const forecastImgAnimE = document.querySelectorAll("#main-city .forecast-container #forecast-weather-img-e")
const forecastImgAnimF = document.querySelectorAll("#main-city .forecast-container #forecast-weather-img-f")

const tl = new TimelineMax();

tl.fromTo(timeWidget,2, {opacity: "0"}, {opacity: "1", ease: Power2.easeInOut})
.fromTo(weatherImageSrc,3, {opacity: "0"}, {opacity: "1", ease: Power2.easeInOut}, "-=2")
.fromTo(currentWeather,3, {opacity: "0"}, {opacity: "1", ease: Power2.easeInOut}, "-=2")
.fromTo(forecastDayAnim,2, {opacity: "0"}, {opacity: "1", ease: Power2.easeInOut}, "-=3")
.fromTo(forecastImgAnimA,2, {opacity: "0"}, {opacity: "1", ease: Power2.easeInOut}, "-=2.5")
.fromTo(forecastImgAnimB,2.25, {opacity: "0"}, {opacity: "1", ease: Power2.easeInOut}, "-=2.5")
.fromTo(forecastImgAnimC,2.50, {opacity: "0"}, {opacity: "1", ease: Power2.easeInOut}, "-=2.5")
.fromTo(forecastImgAnimD,2.75, {opacity: "0"}, {opacity: "1", ease: Power2.easeInOut}, "-=2.5")
.fromTo(forecastImgAnimE,3, {opacity: "0"}, {opacity: "1", ease: Power2.easeInOut}, "-=2.5")
.fromTo(forecastImgAnimF,3.25, {opacity: "0"}, {opacity: "1", ease: Power2.easeInOut}, "-=2.5")

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


// ASSIGN VARIABLES

time.textContent = `${curHour}:${curMinute}`;
amPm.textContent = `${curMeridiem}`;
curDate.textContent = `${curMonth} ${dayOfMonth}, ${curYear}`;
day.textContent = `${dayOfWeek}`;

// SELECT IMAGE FOR CURRENT WEATHER

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

// GET FORECAST DATA

function getForecastWeatherConditions(forecastData) {
    const weatherConditions = [];
    for (let i = 0; i < 6; i++) {
        const weatherText = forecastData.forecast.forecastday[i].day.condition.text;
        weatherConditions.push(weatherText);
    }
    return weatherConditions;
}

//SET DAY AND NIGHT BACKGROUND BASED ON USERS CURRENT TIME

function setBackground(){
    const hours = today.getHours();

    const body = document.body;
    if (hours >= 6 && hours < 18) {
      document.body.style.backgroundImage = "url('./photo/background-day.jpg')";
      console.log("day");
    } else {
      document.body.style.backgroundImage =
        "url('./photo/background-night.jpg')";
      onsole.log("night");
    }
    else {
        body.style.backgroundImage = "url('./photo/background-night.jpg')";
        console.log("night");
    }
}


// get postion coordinate for longitude and latitude 

const successCallback = (position) => {
    
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // sets night and day background functio

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

      fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${forecastAPIKEY}%20&q=${currentCity},${currentState}&days=7&aqi=no&alerts=no`
      )
        .then((result) => {
          if (result.ok) {
            return result.json();
          } else {
            console.log("error");
          }
        })

        .then((data) => {
          // assign data to variables

                    const current = data.current;
                    const forecast = data.forecast
                    const currentConditionText = current.condition.text; // set variable for weather
                    const currentWindSpeed = current.wind_kph; //
                    const currentHumidity = current.humidity;
                    const currentTempC = current.temp_c;
                    const currentTempF = current.temp_f;
                    const currentSunRise = forecast.forecastday[0].astro.sunrise;
                    const currentSunSet = forecast.forecastday[0].astro.sunset;

                    const imageSrc = setCurrentWeatherImage(currentConditionText);
                    weatherImageSrc.src = imageSrc;
                    
                    currentWeather.textContent = `${currentConditionText}`;
                    windSpeed.textContent = `${currentWindSpeed}kph`;
                    humidity.textContent = `${currentHumidity}%`;
                    currentSunriseTime.textContent = `${currentSunRise}`;
                    currentSunsetTime.textContent = `${currentSunSet}`;

          const isCelsius = true;
          temp.textContent = `${currentTempC}`;

          function displayTemperature() {
            const tempElement = document.getElementById("setForC");
            if (isCelsius) {
              tempElement.textContent = "°C";
              temp.textContent = `${currentTempC}`;
            } else {
              tempElement.textContent = "°F";
              temp.textContent = `${currentTempF}`;
            }
          }

          function toggleUnits() {
            isCelsius = !isCelsius;
            displayTemperature();
          }

          document
            .getElementById("widget-temp")
            .addEventListener("click", toggleUnits);

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

                    const weatherConditions = getForecastWeatherConditions(data);

                    // STORE VARIABLE NAME FROM HTML IMG ID

                    const forecastA = document.getElementById('forecast-weather-img-a');
                    const forecastB = document.getElementById('forecast-weather-img-b');
                    const forecastC = document.getElementById('forecast-weather-img-c');
                    const forecastD = document.getElementById('forecast-weather-img-d');
                    const forecastE = document.getElementById('forecast-weather-img-e');
                    const forecastF = document.getElementById('forecast-weather-img-f');

                    // SETS IMAGE SOURCE FOR EACH FORECAST

                    forecastA.src = setCurrentWeatherImage(weatherConditions[0]);
                    forecastB.src = setCurrentWeatherImage(weatherConditions[1]);
                    forecastC.src = setCurrentWeatherImage(weatherConditions[2]);
                    forecastD.src = setCurrentWeatherImage(weatherConditions[3]);
                    forecastE.src = setCurrentWeatherImage(weatherConditions[4]);
                    forecastF.src = setCurrentWeatherImage(weatherConditions[5]);
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
          mainPage.style.display = "block";
        } else {
          mainPage.style.display = "none";
          pages.forEach(function(page) {
            page.style.display = "none";
          });
          pages[index - 1].style.display = "block";
        }
      });
    });
  });


// search box 1

const getCityName = () => {
    const secondCityName = document.getElementById('first-search-box').value;

    if (secondCityName === '') return;

    fetch(`https://api.weatherapi.com/v1/forecast.json?key=${forecastAPIKEY}%20&q=${secondCityName}&days=7&aqi=no&alerts=no`)
        .then((result) => {
            if (result.ok) {
                return result.json();
            } else {
                console.log('error');
            }
        })
        .then((data) => {
        
            const current = data.current;
            const forecast = data.forecast;
            const country = data.location.country;
            const currentConditionTextSecond = current.condition.text; // set variable for weather  
            const currentWindSpeed = current.wind_kph; //
            const currentHumidity = current.humidity;
            const currentTempC = current.temp_c;
            const imageSrc = setCurrentWeatherImage(currentConditionTextSecond);
            const currentTempF = current.temp_f;
            const currentSunRise = forecast.forecastday[0].astro.sunrise;
            const currentSunSet = forecast.forecastday[0].astro.sunset;

            
            sunriseSecond.textContent = `${currentSunRise}`;
            sunsetSecond.textContent = `${currentSunSet}`;

            //ANIMATIONS 
            const timeWidget = document.querySelector(".city-one .status-widget-1")
            const forecastDayAnim = document.querySelectorAll(".city-one .forecast-container .forecast-day")
            const forecastImgAnimA = document.querySelectorAll(".city-one .forecast-container #second-forecast-weather-img-a")
            const forecastImgAnimB = document.querySelectorAll(".city-one .forecast-container #second-forecast-weather-img-b")
            const forecastImgAnimC = document.querySelectorAll(".city-one .forecast-container #second-forecast-weather-img-c")
            const forecastImgAnimD = document.querySelectorAll(".city-one .forecast-container #second-forecast-weather-img-d")
            const forecastImgAnimE = document.querySelectorAll(".city-one .forecast-container #second-forecast-weather-img-e")
            const forecastImgAnimF = document.querySelectorAll(".city-one .forecast-container #second-forecast-weather-img-f")

            const tl = new TimelineMax();

            tl.fromTo(timeWidget,2, {opacity: "0"}, {opacity: "1", ease: Power2.easeInOut})
            .fromTo(weatherImageSrcSecond,3, {opacity: "0"}, {opacity: "1", ease: Power2.easeInOut}, "-=2")
            .fromTo(secondCurrentWeather,3, {opacity: "0"}, {opacity: "1", ease: Power2.easeInOut}, "-=2")
            .fromTo(forecastDayAnim,2, {opacity: "0"}, {opacity: "1", ease: Power2.easeInOut}, "-=3")
            .fromTo(forecastImgAnimA,2, {opacity: "0"}, {opacity: "1", ease: Power2.easeInOut}, "-=2.5")
            .fromTo(forecastImgAnimB,2.25, {opacity: "0"}, {opacity: "1", ease: Power2.easeInOut}, "-=2.5")
            .fromTo(forecastImgAnimC,2.50, {opacity: "0"}, {opacity: "1", ease: Power2.easeInOut}, "-=2.5")
            .fromTo(forecastImgAnimD,2.75, {opacity: "0"}, {opacity: "1", ease: Power2.easeInOut}, "-=2.5")
            .fromTo(forecastImgAnimE,3, {opacity: "0"}, {opacity: "1", ease: Power2.easeInOut}, "-=2.5")
            .fromTo(forecastImgAnimF,3.25, {opacity: "0"}, {opacity: "1", ease: Power2.easeInOut}, "-=2.5")
            
            //DISPLAY TEMPERATURE C AND F
            let isCelsius = true;
            tempSecond.textContent = `${currentTempC}°C`;
            const tempElement = document.getElementById("setForC-second");
            tempElement.textContent = "°C";

            function displayTemperature() {
                const tempElement = document.getElementById("setForC-second");
                if(isCelsius){
                    tempElement.textContent = "°C";
                    tempSecond.textContent = `${currentTempC}`;
                }
                else{
                    tempElement.textContent = "°F";
                    tempSecond.textContent = `${currentTempF}`;
                }
            }

            function toggleUnits(){
                isCelsius = !isCelsius;
                displayTemperature();
            }

            document.getElementById("widget-temp-second").addEventListener("click",toggleUnits);
            
            //FORECAST

            
            
            const forecastDays2 = [];

            for (let i = 1; i <= 6; i++) {
            const dayForecast = forecast.forecastday[i];
            forecastDays2.push(dayForecast.date);

            const dateStr = dayForecast.date;
            const date = new Date(dateStr);
            const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });

        const dayElement = document.getElementById(`day-${i}-second`);
        dayElement.textContent = dayOfWeek;
      }

      function setBackground() {
        const date = new Date();
        const hours = date.getHours();

        const body = document.body;
        if (hours >= 6 && hours < 18) {
          document.body.style.backgroundImage =
            "url('./photo/background-day.jpg')";
          console.log("day");
        } else {
          document.body.style.backgroundImage =
            "url('./photo/background-night.jpg')";
          console.log("night");
        }
      }

      setBackground();
      setInterval(setBackground, 60000);

            // STORES FORECAST CONDITION TO CORRESPONDING DAY
            
            const weatherConditions = getForecastWeatherConditions(data);

            // STORE VARIABLE NAME FROM HTML IMG ID

            const forecastA = document.getElementById('second-forecast-weather-img-a');
            const forecastB = document.getElementById('second-forecast-weather-img-b');
            const forecastC = document.getElementById('second-forecast-weather-img-c');
            const forecastD = document.getElementById('second-forecast-weather-img-d');
            const forecastE = document.getElementById('second-forecast-weather-img-e');
            const forecastF = document.getElementById('second-forecast-weather-img-f');
            // SETS IMAGE SOURCE FOR EACH FORECAST

            forecastA.src = setCurrentWeatherImage(weatherConditions[0]);
            forecastB.src = setCurrentWeatherImage(weatherConditions[1]);
            forecastC.src = setCurrentWeatherImage(weatherConditions[2]);
            forecastD.src = setCurrentWeatherImage(weatherConditions[3]);
            forecastE.src = setCurrentWeatherImage(weatherConditions[4]);
            forecastF.src = setCurrentWeatherImage(weatherConditions[5]);

            secondState.textContent = `${country}`;
            secondCurrentWeather.textContent = `${currentConditionTextSecond}`;
            secondCurrentTemp.textContent=`${currentTempC}`;
            secondWindSpeed.textContent = `${currentWindSpeed}kph`;
            secondHumidity.textContent = `${currentHumidity}%`;
            weatherImageSrcSecond.src = imageSrc;

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

      secondCurrentTime.textContent = `${curHour}:${curMinute}`;
      secondtAMPM.textContent = `${curMeridiem}`;
      secondDate.textContent = `${curMonth} ${dayOfMonth}, ${curYear}`;
      secondCurrentDay.textContent = `${dayOfWeek}`;
    });
};

const inputElement = document.getElementById('first-search-box');
inputElement.addEventListener('input', () => {

    getCityName();

});

// search box 2

const getCityName2 = () => {
    const secondCityName = document.getElementById('second-search-box').value;

    if (secondCityName === '') return;

    fetch(`https://api.weatherapi.com/v1/forecast.json?key=${forecastAPIKEY}%20&q=${secondCityName}&days=7&aqi=no&alerts=no`)
        .then((result) => {
            if (result.ok) {
                return result.json();
            } else {
                console.log('error');
            }
        })
        .then((data) => {
        
            const current = data.current;
            const forecast = data.forecast;
            const country = data.location.country;
            const currentConditionTextThird = current.condition.text; // set variable for weather  
            const currentWindSpeed = current.wind_kph; //
            const currentHumidity = current.humidity;
            const currentTempC = current.temp_c;
            const imageSrc = setCurrentWeatherImage(currentConditionTextThird);
            const currentTempF = current.temp_f;
            const currentSunRise = forecast.forecastday[0].astro.sunrise;
            const currentSunSet = forecast.forecastday[0].astro.sunset;

            sunriseThird.textContent = `${currentSunRise}`;
            sunsetThird.textContent = `${currentSunSet}`;
            const tempElement = document.getElementById("setForC-third");
            tempElement.textContent = "°C";
            

            let isCelsius = true;
                function displayTemperature() {
                    if(isCelsius){
                        tempElement.textContent = "°C";
                        tempThird.textContent = `${currentTempC}`;
                    }
                    else{
                        tempElement.textContent = "°F";
                        tempThird.textContent = `${currentTempF}`;
                    }
                }

            function toggleUnits(){
                isCelsius = !isCelsius;
                displayTemperature();
            }

            document.getElementById("widget-temp-third").addEventListener("click",toggleUnits);
            
            //ANIMATIONS 
            const timeWidget = document.querySelectorAll(".city-two .status-widget-1")
            const forecastDayAnim = document.querySelectorAll(".city-two .forecast-container .forecast-day")
            const forecastImgAnimA = document.querySelectorAll(".city-two .forecast-container #third-forecast-weather-img-a")
            const forecastImgAnimB = document.querySelectorAll(".city-two .forecast-container #third-forecast-weather-img-b")
            const forecastImgAnimC = document.querySelectorAll(".city-two .forecast-container #third-forecast-weather-img-c")
            const forecastImgAnimD = document.querySelectorAll(".city-two .forecast-container #third-forecast-weather-img-d")
            const forecastImgAnimE = document.querySelectorAll(".city-two .forecast-container #third-forecast-weather-img-e")
            const forecastImgAnimF = document.querySelectorAll(".city-two .forecast-container #third-forecast-weather-img-f")

            const tl = new TimelineMax();

            tl.fromTo(timeWidget,2, {opacity: "0"}, {opacity: "1", ease: Power2.easeInOut})
            .fromTo(weatherImageSrcThird,3, {opacity: "0"}, {opacity: "1", ease: Power2.easeInOut}, "-=2")
            .fromTo(thirdCurrentWeather,3, {opacity: "0"}, {opacity: "1", ease: Power2.easeInOut}, "-=2")
            .fromTo(forecastDayAnim,2, {opacity: "0"}, {opacity: "1", ease: Power2.easeInOut}, "-=3")
            .fromTo(forecastImgAnimA,2, {opacity: "0"}, {opacity: "1", ease: Power2.easeInOut}, "-=2.5")
            .fromTo(forecastImgAnimB,2.25, {opacity: "0"}, {opacity: "1", ease: Power2.easeInOut}, "-=2.5")
            .fromTo(forecastImgAnimC,2.50, {opacity: "0"}, {opacity: "1", ease: Power2.easeInOut}, "-=2.5")
            .fromTo(forecastImgAnimD,2.75, {opacity: "0"}, {opacity: "1", ease: Power2.easeInOut}, "-=2.5")
            .fromTo(forecastImgAnimE,3, {opacity: "0"}, {opacity: "1", ease: Power2.easeInOut}, "-=2.5")
            .fromTo(forecastImgAnimF,3.25, {opacity: "0"}, {opacity: "1", ease: Power2.easeInOut}, "-=2.5")

            //FORECAST
            const forecastDays2 = [];

            for (let i = 1; i <= 6; i++) {
            const dayForecast = forecast.forecastday[i];
            forecastDays2.push(dayForecast.date);

            const dateStr = dayForecast.date;
            const date = new Date(dateStr);
            const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });

            const dayElement = document.getElementById(`day-${i}-third`);
            dayElement.textContent = dayOfWeek;
            
            }

            // STORES FORECAST CONDITION TO CORRESPONDING DAY
            
            const weatherConditions = getForecastWeatherConditions(data);

            // STORE VARIABLE NAME FROM HTML IMG ID

            const forecastA = document.getElementById('third-forecast-weather-img-a');
            const forecastB = document.getElementById('third-forecast-weather-img-b');
            const forecastC = document.getElementById('third-forecast-weather-img-c');
            const forecastD = document.getElementById('third-forecast-weather-img-d');
            const forecastE = document.getElementById('third-forecast-weather-img-e');
            const forecastF = document.getElementById('third-forecast-weather-img-f');
            
            // SETS IMAGE SOURCE FOR EACH FORECAST

            forecastA.src = setCurrentWeatherImage(weatherConditions[0]);
            forecastB.src = setCurrentWeatherImage(weatherConditions[1]);
            forecastC.src = setCurrentWeatherImage(weatherConditions[2]);
            forecastD.src = setCurrentWeatherImage(weatherConditions[3]);
            forecastE.src = setCurrentWeatherImage(weatherConditions[4]);
            forecastF.src = setCurrentWeatherImage(weatherConditions[5]);

            // SETS IMAGE SOURCE FOR EACH FORECAST

            thirdState.textContent = `${country}`;
            thirdCurrentWeather.textContent = `${currentConditionTextThird}`;
            thirdCurrentTemp.textContent=`${currentTempC}`;
            thirdWindSpeed.textContent = `${currentWindSpeed}kph`;
            thirdHumidity.textContent = `${currentHumidity}%`;
            weatherImageSrcThird.src = imageSrc;

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

            thirdCurrentTime.textContent = `${curHour}:${curMinute}`;
            thirdtAMPM.textContent = `${curMeridiem}`;
            thirdDate.textContent = `${curMonth} ${dayOfMonth}, ${curYear}`;
            thirdCurrentDay.textContent = `${dayOfWeek}`;
            
            });
};

const inputElement2 = document.getElementById('second-search-box');
inputElement2.addEventListener('input', () => {

    getCityName2();
  
});

// search box 3

const getCityName3 = () => {
    const thirdCityName = document.getElementById('third-search-box').value;

    if (thirdCityName === '') return;

    fetch(`https://api.weatherapi.com/v1/forecast.json?key=${forecastAPIKEY}%20&q=${thirdCityName}&days=7&aqi=no&alerts=no`)
        .then((result) => {
            if (result.ok) {
                return result.json();
            } else {
                console.log('error');
            }
        })
        .then((data) => {
        
            const current = data.current;
            const forecast = data.forecast;
            const country = data.location.country;
            const currentConditionTextFourth = current.condition.text; // set variable for weather  
            const currentWindSpeed = current.wind_kph; //
            const currentHumidity = current.humidity;
            const currentTempC = current.temp_c;
            const imageSrc = setCurrentWeatherImage(currentConditionTextFourth);
            const currentTempF = current.temp_f;

            const currentSunRise = forecast.forecastday[0].astro.sunrise;
            const currentSunSet = forecast.forecastday[0].astro.sunset;

            sunriseFourth.textContent = `${currentSunRise}`;
            sunsetFourth.textContent = `${currentSunSet}`;
            const tempElement = document.getElementById("setForC-fourth");
            tempElement.textContent = "°C";

            let isCelsius = true;
            tempFourth.textContent = `${currentTempC}`;
                function displayTemperature() {
                    if(isCelsius){
                        tempElement.textContent = "°C";
                        tempFourth.textContent = `${currentTempC}`;
                    }
                    else{
                        tempElement.textContent = "°F";
                        tempFourth.textContent = `${currentTempF}`;
                    }
                }

            function toggleUnits(){
                isCelsius = !isCelsius;
                displayTemperature();
            }

            document.getElementById("widget-temp-fourth").addEventListener("click",toggleUnits);
            
             
            //ANIMATIONS 
            const timeWidget = document.querySelectorAll(".city-three .status-widget-1")
            const forecastDayAnim = document.querySelectorAll(".city-three .forecast-container .forecast-day")
            const forecastImgAnimA = document.querySelectorAll(".city-three .forecast-container #fourth-forecast-weather-img-a")
            const forecastImgAnimB = document.querySelectorAll(".city-three .forecast-container #fourth-forecast-weather-img-b")
            const forecastImgAnimC = document.querySelectorAll(".city-three .forecast-container #fourth-forecast-weather-img-c")
            const forecastImgAnimD = document.querySelectorAll(".city-three .forecast-container #fourth-forecast-weather-img-d")
            const forecastImgAnimE = document.querySelectorAll(".city-three .forecast-container #fourth-forecast-weather-img-e")
            const forecastImgAnimF = document.querySelectorAll(".city-three .forecast-container #fourth-forecast-weather-img-f")

            const tl = new TimelineMax();

            tl.fromTo(timeWidget,2, {opacity: "0"}, {opacity: "1", ease: Power2.easeInOut})
            .fromTo(weatherImageSrcFourth,3, {opacity: "0"}, {opacity: "1", ease: Power2.easeInOut}, "-=2")
            .fromTo(fourthCurrentWeather,3, {opacity: "0"}, {opacity: "1", ease: Power2.easeInOut}, "-=2")
            .fromTo(forecastDayAnim,2, {opacity: "0"}, {opacity: "1", ease: Power2.easeInOut}, "-=3")
            .fromTo(forecastImgAnimA,2, {opacity: "0"}, {opacity: "1", ease: Power2.easeInOut}, "-=2.5")
            .fromTo(forecastImgAnimB,2.25, {opacity: "0"}, {opacity: "1", ease: Power2.easeInOut}, "-=2.5")
            .fromTo(forecastImgAnimC,2.50, {opacity: "0"}, {opacity: "1", ease: Power2.easeInOut}, "-=2.5")
            .fromTo(forecastImgAnimD,2.75, {opacity: "0"}, {opacity: "1", ease: Power2.easeInOut}, "-=2.5")
            .fromTo(forecastImgAnimE,3, {opacity: "0"}, {opacity: "1", ease: Power2.easeInOut}, "-=2.5")
            .fromTo(forecastImgAnimF,3.25, {opacity: "0"}, {opacity: "1", ease: Power2.easeInOut}, "-=2.5")

            //FORECAST
            const forecastDays2 = [];

            for (let i = 1; i <= 6; i++) {
            const dayForecast = forecast.forecastday[i];
            forecastDays2.push(dayForecast.date);

            const dateStr = dayForecast.date;
            const date = new Date(dateStr);
            const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });

            const dayElement = document.getElementById(`day-${i}-fourth`);
            dayElement.textContent = dayOfWeek;
            
            }

            // STORES FORECAST CONDITION TO CORRESPONDING DAY
                        
            const weatherConditions = getForecastWeatherConditions(data);

            // STORE VARIABLE NAME FROM HTML IMG ID

            const forecastA = document.getElementById('fourth-forecast-weather-img-a');
            const forecastB = document.getElementById('fourth-forecast-weather-img-b');
            const forecastC = document.getElementById('fourth-forecast-weather-img-c');
            const forecastD = document.getElementById('fourth-forecast-weather-img-d');
            const forecastE = document.getElementById('fourth-forecast-weather-img-e');
            const forecastF = document.getElementById('fourth-forecast-weather-img-f');

            // SETS IMAGE SOURCE FOR EACH FORECAST

            forecastA.src = setCurrentWeatherImage(weatherConditions[0]);
            forecastB.src = setCurrentWeatherImage(weatherConditions[1]);
            forecastC.src = setCurrentWeatherImage(weatherConditions[2]);
            forecastD.src = setCurrentWeatherImage(weatherConditions[3]);
            forecastE.src = setCurrentWeatherImage(weatherConditions[4]);
            forecastF.src = setCurrentWeatherImage(weatherConditions[5]);

            fourthState.textContent = `${country}`;
            fourthCurrentWeather.textContent = `${currentConditionTextFourth}`;
            fourthCurrentTemp.textContent=`${currentTempC}`;
            fourthWindSpeed.textContent = `${currentWindSpeed}kph`;
            fourthHumidity.textContent = `${currentHumidity}%`;
            weatherImageSrcFourth.src = imageSrc;

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

            fourthCurrentTime.textContent = `${curHour}:${curMinute}`;
            fourthtAMPM.textContent = `${curMeridiem}`;
            fourthDate.textContent = `${curMonth} ${dayOfMonth}, ${curYear}`;
            fourthCurrentDay.textContent = `${dayOfWeek}`;
            
            
            });
};

const inputElement3 = document.getElementById('third-search-box');
inputElement3.addEventListener('input', () => {

    getCityName3();

});