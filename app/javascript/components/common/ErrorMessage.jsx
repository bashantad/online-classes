import React from 'react';
import PropTypes from 'prop-types';

const ErrorMessage = ({message}) => {
    const hasError = !!message;
    return (
        <>
            <div id="stickyBlockEndPoint"></div>
            {
                hasError ?
                    <div className="alert alert-soft-danger custom-align-center" role="alert">
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
