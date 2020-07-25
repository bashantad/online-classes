import React from 'react';
import PropTypes from 'prop-types';

const CourseLandingBody = ({body_html}) => {
    return (
        <div className='assignment-body'>
            <div>
                {body_html}
            </div>
        </div>
    )
}

CourseLandingBody.propTypes = {
    body_html: PropTypes.string.isRequired,
}

export default CourseLandingBody;
