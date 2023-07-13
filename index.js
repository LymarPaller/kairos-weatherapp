// const forecastAPI = `https://api.weatherapi.com/v1/forecast.json?key=${forecastAPIKEY}%20&q=${longitude},lat=${latitude}&days=7&aqi=no&alerts=no`;

// const geoLocAPI = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={geoLocAPIKEY}`

const geoLocAPIKEY = '42207e457e3eb8b6df3dd8146f5bfc1b';
const forecastAPIKEY = 'ad6a22d37a6e4fdeb5135830230707';

const successCallback = (position) => {
    
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    fetch(`https://api.weatherapi.com/v1/forecast.json?key=ad6a22d37a6e4fdeb45135830230707%20&q=${latitude},${longitude}&days=7&aqi=no&alerts=no`)
    .then((result) => {
        if (result.ok) {
            return result.json();
        }
        else {
            console.log('error');
        }
     })

    .then((data) => {
        const location = data.location;
        console.log(location);
    });
};

const errorCallback = (err) => {
    console.log(err);
};

 if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    
};
