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
import useLocalStorage from '../../hooks/useLocalStorage';
import axios from 'axios';
import getCoords from '../../utils/getCoords';

const Weather = () => {

    const API_KEY = 'bf35cac91880cb98375230fb443a116f';

    const [isLoading, setIsLoading] = useState(true);
    const [isFailed, setIsFailed] = useState(false);
    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState(null);
    const [location, setLocation] = useLocalStorage('location', '');
    const [units, setUnits] = useLocalStorage('units', unitsData['imperial']);
    const [errorMessage, setErrorMessage] = useState('');
    const [coords, setCoords] = useState();

    useEffect(() => {
        if (!location) {
            setIsLoading(true);
            getCoords()
                .then((coordsData) => setCoords(coordsData))
                .catch(() => setCoords(null));
        }
    }, [location])

    useEffect(() => {
        if (!location && coords === undefined) return;

        setIsFailed(false);
        setIsLoading(true);

        let queryLocation;
        if (location) {
            queryLocation = `q=${location}`;
        } else if (coords) {
            queryLocation = `lat=${coords.lat}&lon=${coords.lon}`;
        } else {
            queryLocation = 'q=Kyiv';
        }

        axios.all([
            axios.get(`https://api.openweathermap.org/data/2.5/weather?${queryLocation}&appid=${API_KEY}&units=${units.name}`),
            axios.get(`https://api.openweathermap.org/data/2.5/forecast?${queryLocation}&appid=${API_KEY}&units=${units.name}`)
        ])
            .then(axios.spread((weather, forecast) => {
                setWeatherData(weather.data);
                setForecastData(forecast.data)
            }))
            .catch((error) => {
                setIsFailed(true);
                if (error.response && error.response.status === 404) {
                    setErrorMessage(`Can't find this location: ${location}`);
                } else {
                    setErrorMessage(error.message);
                }
            })
            .finally(() => setIsLoading(false));
    }, [location, units, coords]);

    if (!isFailed && (!weatherData || !forecastData)) return (
        <Loader />
    );

    if (isFailed) {
        return (
            <main className="weather">
                <div className="weather-main">
                    <LocationInput newLocationHandler={setLocation} />
                    <ErrorMessage errorMessage={errorMessage} />
                </div>
            </main>
        );
    }

    return (
        <main className="weather">
            <div className="weather-main">
                <LocationInput newLocationHandler={setLocation} />
                <WeatherCurrent weatherData={weatherData} units={units} />
                <ToggleSwitch setUnits={setUnits} units={units} />
            </div>
            <div className="weather-info">
                <WeatherForecast forecastData={forecastData} units={units} />
                <WeatherDetails weatherData={weatherData} units={units} />
            </div>
            {isLoading && <Loader />}
        </main>
    );
};

export default Weather;