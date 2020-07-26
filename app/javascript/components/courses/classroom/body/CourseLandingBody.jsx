import React from 'react';
import PropTypes from 'prop-types';
import RenderHtml from "../../../common/RenderHtml";

const CourseLandingBody = ({body_html}) => {
    return (
        <div className='assignment-body'>
            <div>
                <RenderHtml body={body_html} />
            </div>
        </div>
    )
}

CourseLandingBody.propTypes = {
    body_html: PropTypes.string.isRequired,
}

export default CourseLandingBody;
