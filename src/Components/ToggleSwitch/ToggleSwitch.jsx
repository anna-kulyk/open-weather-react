import { useState } from "react";
import "./ToggleSwitch.css";

const ToggleSwitch = () => {

    const [checkboxChecked, setCheckboxChecked] = useState(false);

    const checkboxHandler = () => {
        if (checkboxChecked) {
            setCheckboxChecked(false);
            console.log('F');
        } else {
            setCheckboxChecked(true);
            console.log('C');
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

export default ToggleSwitch;
