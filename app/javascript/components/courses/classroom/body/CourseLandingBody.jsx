import React from 'react';
import PropTypes from 'prop-types';
import RenderHtml from "../../../common/RenderHtml";

import svg from '../../../../../assets/images/illustrations/reading.svg'

const CourseLandingBody = ({body_html}) => {
    return (
        <div className='assignment-body space-2'>
            <div>
                <figure className="w-md-25 w-15 mx-auto mb-2">
                    <img className="img-fluid" src={svg} alt="SVG"/>
                </figure>
                <div className='custom-align-center'>
                <RenderHtml body={body_html} />
                </div>
            </div>
        </div>
    )
}

CourseLandingBody.propTypes = {
    body_html: PropTypes.string.isRequired,
}

export default CourseLandingBody;
