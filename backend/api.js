import axios from 'axios';

const getWeather = async (cityName) => {
    console.log(`${cityName} için API tetiklendi`);

    try {
        const geoResponse = await axios({
            method: 'GET',
            url: `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=a2f612909bd0c67f76a223644afa61ac`,
        });

        if (geoResponse.data.length === 0) {
            throw new Error('Şehir bulunamadı');
        }

        const { lat, lon, name } = geoResponse.data[0];

        const weatherResponse = await axios({
            method: 'GET',
            url: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=a2f612909bd0c67f76a223644afa61ac&lang=tr`,
        });

        const { weather, main } = weatherResponse.data;
        const weatherDescription = weather[0].description;
        const weatherIcon = weather[0].icon;
        const tempKelvin = main.temp;
        const tempCelsius = Math.floor(tempKelvin - 273.15);

        const result = {
            city: name,
            weather: weatherDescription,
            icon: weatherIcon,
            celsius: tempCelsius,
        };

        console.log("SUCCESS API LOG: " + JSON.stringify(result));
        return result;
    } catch (error) {
        console.error("ERROR API LOG: " + error.message);
        throw error; // Hata oluşursa, yukarıya iletilir
    }
};

export { getWeather };
