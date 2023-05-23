import './ErrorMessage.css';
import PropTypes from 'prop-types';

const ErrorMessage = ({ errorMessage }) => {
    return (
        <>
            <div className="error-title">Ooops...</div>
            <div className="error-message">{errorMessage}</div>
        </>
    );
};

ErrorMessage.propTypes = {
    errorMessage: PropTypes.string.isRequired
}

export default ErrorMessage;