import React, { useState } from 'react';
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

export default LocationInput;