import React from 'react';
import PropTypes from 'prop-types';

const CourseLandingBody = ({body}) => {
    return (
        <div className='assignment-body'>
            <div>
                {body}
            </div>
        </div>
    )
}

CourseLandingBody.propTypes = {
    body: PropTypes.string.isRequired,
}

export default CourseLandingBody;
