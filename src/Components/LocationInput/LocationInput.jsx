import { useState } from 'react';
import PropTypes from 'prop-types';
import './LocationInput.css';

const LocationInput = ({ newLocationHandler }) => {

    const [locationInput, setLocationInput] = useState('');

    const inputLocationHandler = () => {
        const newLocation = locationInput.trim();
        if (newLocation !== '') {
            newLocationHandler(newLocation);
            setLocationInput('');
        }
    }

    return (
        <input type="text"
            className='location-input'
            placeholder='Enter location...'
            value={locationInput}
            onChange={(e) => setLocationInput(e.target.value)}
            onBlur={inputLocationHandler}
            onKeyDown={(e) => { if (e.key === "Enter") inputLocationHandler() }} />
    );
};

LocationInput.propTypes = {
    newLocationHandler: PropTypes.func.isRequired
}

export default LocationInput;