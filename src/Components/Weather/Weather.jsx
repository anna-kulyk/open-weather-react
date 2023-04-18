import React, { useState, useEffect } from 'react';
import LocationInput from '../LocationInput/LocationInput';
import './Weather.css';


const Weather = () => {

    const API_KEY = 'bf35cac91880cb98375230fb443a116f';

    const [weatherData, setWeatherData] = useState(null);
    const [location, setLocation] = useState('Kyiv');
    // console.log(weatherData);

    useEffect(() => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=imperial`)
            .then((response) => response.json())
            .then((data) => setWeatherData(data))
            .catch((error) => console.log(error));
    }, [location]);

    if (!weatherData) return <div>Loading...</div>;

    if (weatherData.cod === '404') {
        return (
            <div className="weather">
                <LocationInput newLocationHandler={setLocation} />
                <div className="location">Ooops...</div>
                <div className="location-error">Can't find this location</div>
            </div>
        );
    }

    return (
        <div className="weather">
            <LocationInput newLocationHandler={setLocation} />
            <div className="location">{weatherData.name}</div>
            <div className="weather-row">
                <div className="weather-col">
                    <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt='icon' />
                    <div className="description">{weatherData.weather[0].description}</div>
                </div>
                <div className="temperature">{Math.round(weatherData.main.temp)}°F</div>
            </div>
            <div className="details">
                <div><span>Feels like: </span>{Math.round(weatherData.main.feels_like)}°F</div>
                <div><span>Humidity: </span>{weatherData.main.humidity}%</div>
                <div><span>Wind speed: </span>{Math.round(weatherData.wind.speed)} mph</div>
            </div>
        </div>
    );
};

export default Weather;