import './WeatherCurrent.css';
import PropTypes from 'prop-types';
import { formatTimeDay } from '../../utils/dateFormat';

const WeatherCurrent = ({ weatherData, units }) => {
    return (
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
    );
};

WeatherCurrent.propTypes = {
    weatherData: PropTypes.object.isRequired,
    units: PropTypes.object.isRequired
}

export default WeatherCurrent;