import { useState, useEffect, useRef } from 'react';
import LocationInput from '../LocationInput/LocationInput';
import './Weather.css';
import Loader from '../Loader/Loader';
import ToggleSwitch from '../ToggleUnitsSwitch/ToggleUnitsSwitch';
import { formatTime, formatTimeDay } from '../../utils/dateFormat';
import unitsData from '../../utils/unitsData';
import ErrorMessage from '../ErrorMessage/ErrorMessage';


const Weather = () => {

    const ref = useRef(null);

    const API_KEY = 'bf35cac91880cb98375230fb443a116f';

    const [isLoading, setIsLoading] = useState(true);
    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState(null);
    const [location, setLocation] = useState('Kyiv');
    const [units, setUnits] = useState(unitsData['imperial']);
    // console.log(weatherData);

    // if (window.navigator.geolocation) {
    //     window.navigator.geolocation
    //         .getCurrentPosition(console.log, console.log);
    // }

    useEffect(() => {
        setIsLoading(true)
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=${units.name}`)
            .then((response) => response.json())
            .then((data) => setWeatherData(data))
            .catch((error) => console.log(error))
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${API_KEY}&units=${units.name}`)
            .then((response) => response.json())
            .then((data) => setForecastData(data))
            .catch((error) => console.log(error))
            .finally(() => setIsLoading(false));
    }, [location, units]);

    if (!weatherData || !forecastData) return (
        <Loader />
    );

    if (weatherData.cod === '404' || forecastData.cod === '404') {
        return (
            <div className="weather">
                <div className="weather-main">
                    <LocationInput newLocationHandler={setLocation} />
                    <ErrorMessage location={location} />
                </div>
            </div>
        );
    }

    const forecastElements = forecastData?.list.slice(0, 8).map((data, index) => {
        return (
            <div key={index} className="forecast-block">
                <div className="forecast-time">{formatTime(data.dt, forecastData.city.timezone)}</div>
                <div className="forecast-img">
                    <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                        alt={data.weather[0].description} />
                </div>
                <div className="forecast-temp">{Math.round(data.main.temp)}{units.temp}</div>
            </div>
        );
    });

    if (ref.current !== null) ref.current.style.transform = `rotate(${weatherData.wind.deg}deg)`;

    return (
        <div className="weather">
            <div className="weather-main">
                <LocationInput newLocationHandler={setLocation} />
                <div className="weather-current">
                    <div className="weather-location">
                        <div className="weather-city">{weatherData.name}</div>
                        <div className="weather-day">{`${weatherData.sys.country}, ${formatTimeDay(weatherData.dt, weatherData.timezone)}`}</div>
                    </div>
                    <img className='weather-image'
                        src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                        alt={weatherData.weather[0].description}
                        title={weatherData.weather[0].description} />
                    <div className="weather-temperature">
                        <div className="temperature">{Math.round(weatherData.main.temp)}{units.temp}</div>
                        <div className="temperature-feels-like">Feels like: {Math.round(weatherData.main.feels_like)}{units.temp}</div>
                    </div>
                </div>
                <ToggleSwitch setUnits={setUnits} />
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
                            <div>Humidity</div>
                            <div className='_icon-humidity details-data'>{weatherData.main.humidity}%</div>
                        </div>
                        <div className="details-block">
                            <div>Wind speed</div>
                            <div className=' details-data'>
                                <div className='_icon-direction' ref={ref}></div>
                                <div>{Math.round(weatherData.wind.speed)} {units.speed}</div>
                            </div>
                        </div>
                        <div className="details-block">
                            <div>Sunrise</div>
                            <div className='_icon-sunrise details-data'>{formatTime(weatherData.sys.sunrise, weatherData.timezone)}</div>
                        </div>
                        <div className="details-block">
                            <div>Sunset</div>
                            <div className='_icon-sunset details-data'>{formatTime(weatherData.sys.sunset, weatherData.timezone)}</div>
                        </div>
                    </div>
                </div>
            </div>
            {isLoading && <Loader />}
        </div>
    );
};

export default Weather;