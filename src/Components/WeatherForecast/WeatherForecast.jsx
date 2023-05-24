import PropTypes from 'prop-types';
import { formatTime } from '../../utils/dateFormat';
import './WeatherForecast.css';

const WeatherForecast = ({ forecastData, units }) => {

    const forecastElements = forecastData?.list.slice(0, 8).map((data, index) => {
        return (
            <div key={index} className="forecast-block">
                <div className="forecast-time">{formatTime(data.dt, forecastData.city.timezone)}</div>
                <div className="forecast-img">
                    <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                        alt={data.weather[0].description} />
                </div>
                <div className="forecast-temp">{Math.round(data.main.temp)}{units.temp}</div>
            </div>
        );
    });

    return (
        <div className="weather-forecast forecast">
            <div className="forecast-title">Forecast</div>
            <div className="forecast-body">
                {forecastData && forecastElements}
            </div>
        </div>
    );
};

WeatherForecast.propTypes = {
    forecastData: PropTypes.object.isRequired,
    units: PropTypes.object.isRequired
}

export default WeatherForecast;