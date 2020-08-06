import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import ErrorMessage from './ErrorMessage';

function WithLoading(Component) {
    return class extends React.Component {
        render() {
            const {isLoading, errorMessage, ...props} = this.props;
            if(isLoading) return <Loading className='mt-5'/>;
            if(!!errorMessage) return <ErrorMessage message={errorMessage} />;
            return <Component {...props} />;
        }
    }
}

WithLoading.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
}

export default WithLoading;
