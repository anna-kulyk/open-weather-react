import React, { useState, useEffect } from 'react';
import LocationInput from '../LocationInput/LocationInput';
import './Weather.css';
import Loader from '../Loader/Loader';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';


const Weather = () => {

    const API_KEY = 'bf35cac91880cb98375230fb443a116f';

    const [isLoading, setIsLoading] = useState(true);
    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState(null);
    const [location, setLocation] = useState('Kyiv');
    // console.log(weatherData);

    // if (window.navigator.geolocation) {
    //     window.navigator.geolocation
    //         .getCurrentPosition(console.log, console.log);
    // }

    useEffect(() => {
        setIsLoading(true)
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=imperial`)
            .then((response) => response.json())
            .then((data) => setWeatherData(data))
            .catch((error) => console.log(error))
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${API_KEY}&units=imperial`)
            .then((response) => response.json())
            .then((data) => setForecastData(data))
            .catch((error) => console.log(error))
            .finally(() => setIsLoading(false));
    }, [location]);

    if (!weatherData) return (
        <Loader />
    );

    if (weatherData.cod === '404') {
        return (
            <div className="weather">
                <LocationInput newLocationHandler={setLocation} />
                <div className="location">Ooops...</div>
                <div className="location-error">Can't find this location</div>
            </div>
        );
    }

    let forecastElements = forecastData?.list.slice(0, 8).map((data, index) => {
        return (
            <div key={index} className="forecast-block">
                <div className="forecast-time">{convertTime(data.dt, forecastData.city.timezone)}</div>
                <div className="forecast-img">
                    <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                        alt={data.weather[0].description} />
                </div>
                <div className="forecast-temp">{Math.round(data.main.temp)}°F</div>
            </div>
        );
    })

    return (
        <div className="weather">
            <div className="weather-main">
                <LocationInput newLocationHandler={setLocation} />
                <div className="weather-current">
                    <div className="weather-location">
                        <div className="weather-city">{weatherData.name}</div>
                        <div className="weather-day">{`${weatherData.sys.country}, ${convertTimeDay(weatherData.dt, weatherData.timezone)}`}</div>
                    </div>
                    <img className='weather-image'
                        src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                        alt={weatherData.weather[0].description}
                        title={weatherData.weather[0].description} />
                    <div className="weather-temperature">
                        <div className="temperature">{Math.round(weatherData.main.temp)}°F</div>
                        <div className="temperature-feels-like">Feels like: {Math.round(weatherData.main.feels_like)}°F</div>
                    </div>
                </div>
                <ToggleSwitch />
                {/* <div>C F</div> */}
            </div>
            <div className="weather-info">
                <div className="weather-forecast forecast">
                    <div className="forecast-title">Forecast</div>
                    <div className="forecast-body">
                        {forecastData && forecastElements}
                    </div>
                </div>
                <div className="details">
                    <div className="details-title">Weather details</div>
                    <div className="details-body">
                        <div className="details-block">
                            <span>Humidity</span>
                            <div>{weatherData.main.humidity}%</div>
                        </div>
                        <div className="details-block">
                            <span>Wind speed: </span>
                            <div>{Math.round(weatherData.wind.speed)} mph</div>
                        </div>
                        <div className="details-block">Sunrise</div>
                        <div className="details-block">Sunset</div>
                    </div>
                </div>
            </div>
            {isLoading && <Loader />}
        </div>
    );
};

export default Weather;

function convertTime(unixTime, timezone) {
    let timezoneOffset = new Date().getTimezoneOffset() * 60;
    let date = new Date((unixTime + timezoneOffset + timezone) * 1000);
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    let time = hours + ":" + minutes.slice(-2);
    return time;
}

function convertTimeDay(unixTime, timezone) {
    let timezoneOffset = new Date().getTimezoneOffset() * 60;
    let date = new Date((unixTime + timezoneOffset + timezone) * 1000);
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    const time = hours + ":" + minutes.slice(-2);
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const day = date.getDay();
    let output = `${dayNames[day]} ${time}`;
    return output;
}