import { useState, useEffect } from 'react';
import LocationInput from '../LocationInput/LocationInput';
import './Weather.css';
import Loader from '../Loader/Loader';
import ToggleSwitch from '../ToggleUnitsSwitch/ToggleUnitsSwitch';
import unitsData from '../../utils/unitsData';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import WeatherCurrent from '../WeatherCurrent/WeatherCurrent';
import WeatherDetails from '../WeatherDetails/WeatherDetails';
import WeatherForecast from '../WeatherForecast/WeatherForecast';


const Weather = () => {

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

    return (
        <div className="weather">
            <div className="weather-main">
                <LocationInput newLocationHandler={setLocation} />
                <WeatherCurrent weatherData={weatherData} units={units} />
                <ToggleSwitch setUnits={setUnits} />
            </div>
            <div className="weather-info">
                <WeatherForecast forecastData={forecastData} units={units} />
                <WeatherDetails weatherData={weatherData} units={units} />
            </div>
            {isLoading && <Loader />}
        </div>
    );
};

export default Weather;