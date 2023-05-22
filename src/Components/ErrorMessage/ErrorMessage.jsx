import './ErrorMessage.css';
import PropTypes from 'prop-types';

const ErrorMessage = ({ location }) => {
    return (
        <>
            <div className="error-title">Ooops...</div>
            <div className="error-message">{`Can't find this location: ${location}`}</div>
        </>
    );
};

ErrorMessage.propTypes = {
    location: PropTypes.string.isRequired
}

export default ErrorMessage;