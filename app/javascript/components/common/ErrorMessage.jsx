import React from 'react';
import PropTypes from 'prop-types';

const ErrorMessage = ({message}) => {
    const hasError = !!message;
    return (
        <>
            {
                hasError ?
                    <div className="alert alert-danger custom-align-center" role="alert">
                        {message}
                    </div>
                    : ''
            }
        </>
    );
}

ErrorMessage.propTypes = {
    errorMessage: PropTypes.string
}

export default ErrorMessage;
