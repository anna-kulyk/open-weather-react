import React, { useState } from 'react';
import './LocationInput.css';

const LocationInput = ({newLocationHandler}) => {
    
    const [locationInput, setLocationInput] = useState('Enter location...');

    return (
        <input type="text" 
               className='location-input'
               value={locationInput}
               onChange={(e) => setLocationInput(e.target.value)}
               onBlur={(e) => {if (locationInput !== "") newLocationHandler(e.target.value)}}
               onKeyDown={(e) => {if (e.key === "Enter" && locationInput !== "") newLocationHandler(e.target.value)}}
               onFocus={() => setLocationInput('')} />
    );
};

export default LocationInput;