// const forecastAPI = `https://api.weatherapi.com/v1/forecast.json?key=${forecastAPIKEY}%20&q=${cityName}&days=6&aqi=no&alerts=no`;

// const geoLocAPI = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={geoLocAPIKEY}`

const geoLocAPIKEY = '${geoLocAPIKEY1}${geoLocAPIKEY2}';
const forecastAPIKEY = '${forecastAPIKEY1}${forecastAPIKEY2}';

const forecastAPIKEY1 = 'ad6a22d37a6e4fdeb';
const forecastAPIKEY2 = '45135830230707';
const geoLocAPIKEY1 = '42207e457e3eb8b6d';
const geoLocAPIKEY2 = 'f3dd8146f5bfc1b';

// GETTING CITY NAME VIA SEARCH BOX not yet implemented FOR TESTING API
// const getCityName = () => {
//     const cityName = document.getElementById('city-name').value;

//     if (cityName === '')
//     return;

//     fetch (`https://api.openweathermap.org/data/2.5/weather?lat=${userLat}&lon=${userLong}&appid=${geoLocAPIKEY}`)
//     .then((result) => {
//         if (result.ok) {
//             return result.json()
//         }
//         else {
//             console.log('error')
//         };
//     })
// };