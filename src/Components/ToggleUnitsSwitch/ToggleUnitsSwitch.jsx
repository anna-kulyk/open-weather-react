import { useState } from "react";
import PropTypes from 'prop-types';
import "./ToggleUnitsSwitch.css";

const ToggleUnitsSwitch = ({ setUnits }) => {

    const [checkboxChecked, setCheckboxChecked] = useState(false);

    const checkboxHandler = () => {
        if (checkboxChecked) {
            setCheckboxChecked(false);
            setUnits('imperial');
        } else {
            setCheckboxChecked(true);
            setUnits('metric');
        }
    }

    return (
        <div className="container">
            <div className="toggle-switch">
                <input type="checkbox" className="checkbox"
                    name="checkbox" id="checkbox"
                    checked={checkboxChecked} onChange={checkboxHandler} />
                <label className="label" htmlFor="checkbox">
                    <span className="inner" />
                    <span className="switch" />
                </label>
            </div>
        </div>
    );
};

ToggleUnitsSwitch.propTypes = {
    setUnits: PropTypes.func.isRequired
}

export default ToggleUnitsSwitch;
