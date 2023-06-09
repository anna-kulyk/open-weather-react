import { useState } from "react";
import PropTypes from 'prop-types';
import "./ToggleUnitsSwitch.css";
import unitsData from '../../utils/unitsData';

const ToggleUnitsSwitch = ({ setUnits, units }) => {

    const [checkboxChecked, setCheckboxChecked] = useState(units.name === 'metric');

    const checkboxHandler = () => {
        if (checkboxChecked) {
            setCheckboxChecked(false);
            setUnits(unitsData['imperial']);
        } else {
            setCheckboxChecked(true);
            setUnits(unitsData['metric']);
        }
    }

    return (
        <div className="container">
            <div className="toggle-switch">
                <input type="checkbox" className="checkbox"
                    name="checkbox" id="checkbox"
                    checked={checkboxChecked} onChange={checkboxHandler} />
                <label role="radio" className="label" htmlFor="checkbox" aria-label="checkbox" tabIndex="0">
                    <span className="inner" />
                    <span className="switch" />
                </label>
            </div>
        </div>
    );
};

ToggleUnitsSwitch.propTypes = {
    setUnits: PropTypes.func.isRequired,
    units: PropTypes.object.isRequired
}

export default ToggleUnitsSwitch;
