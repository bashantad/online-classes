import React from 'react';
import PropTypes from 'prop-types';

const CourseContentBody = ({chapterTitle, title, description_html, duration}) => {
    return (
        <div>
            <h3>
                {chapterTitle}
            </h3>
            <h4>
                {title}
            </h4>
            <div>
                {description_html}
            </div>
            <div>
                {duration}
            </div>
        </div>
    )
}

CourseContentBody.propTypes = {
    title: PropTypes.string.isRequired,
    description_html: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    chapterTitle: PropTypes.string.isRequired,
}

export default CourseContentBody;
