// const forecastAPI = `https://api.weatherapi.com/v1/forecast.json?key=${forecastAPIKEY}%20&q=${cityName}&days=6&aqi=no&alerts=no`;

// const geoLocAPI = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}`

const geoLocAPIKEY = '42207e457e3eb8b6df3dd8146f5bfc1b';
const forecastAPIKEY = 'ad6a22d37a6e4fdeb45135830230707';

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