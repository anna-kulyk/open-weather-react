import { useRef } from 'react';
import PropTypes from 'prop-types';
import { formatTime } from '../../utils/dateFormat';
import './WeatherDetails.css';

const WeatherDetails = ({ weatherData, units }) => {

    const ref = useRef(null);
    if (ref.current !== null) ref.current.style.transform = `rotate(${weatherData.wind.deg}deg)`;

    return (
        <div className="weather-details details">
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
    );
};

WeatherDetails.propTypes = {
    weatherData: PropTypes.object.isRequired,
    units: PropTypes.object.isRequired
}

export default WeatherDetails;