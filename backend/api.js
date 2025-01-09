import axios from 'axios';

const getWeather = (cityName) => {
    console.log(cityName, " için api tetiklendi")
    axios({
        method: 'GET',
        url: 'https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?q=Istanbul,tr&appid=a2f612909bd0c67f76a223644afa61ac',
        headers: {'X-Custom-Header': 'name'},
    }).then(function (response) {
        console.log('veriler çekildi şimdi geri döndürülüyor')

        const cityName = response.data.name;
        const weatherDescription = response.data.weather[0].description;
        const weatherIcon = response.data.weather[0].icon;
        const tempKelvin = response.data.main.temp;
        const tempCelsius = Math.floor(tempKelvin - 273.15);
        let weatherDescriptionTr;
        switch (weatherDescription) {
            case 'clear sky':
                weatherDescriptionTr = 'Açık gökyüzü';
                break;
            case 'few clouds':
                weatherDescriptionTr = 'Az bulutlu';
                break;
            case 'scattered clouds':
                weatherDescriptionTr = 'Parçalı bulutlu';
                break;
            case 'broken clouds':
                weatherDescriptionTr = 'Çok bulutlu';
                break;
            case 'shower rain':
                weatherDescriptionTr = 'Sağanak yağmurlu';
                break;
            case 'rain':
                weatherDescriptionTr = 'Yağmurlu';
                break;
            case 'thunderstorm':
                weatherDescriptionTr = 'Fırtınalı';
                break;
            case 'snow':
                weatherDescriptionTr = 'Karlı';
                break;
            case 'mist':
                weatherDescriptionTr = 'Sisli';
                break;
            default:
                weatherDescriptionTr = weatherDescription;
        }

        const weather = {city: cityName, weather: weatherDescriptionTr, icon: weatherIcon, celsius: tempCelsius};
        console.log("SUCCESS API LOG: " + JSON.stringify(weather));
        return weather.celsius;
    }).catch(function (error) {
        console.error("ERROR API LOG: " + error);
    });
};


export {getWeather}
