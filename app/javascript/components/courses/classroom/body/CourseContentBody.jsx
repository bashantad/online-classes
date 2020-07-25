import React from 'react';
import PropTypes from 'prop-types';

const CourseContentBody = ({chapterTitle, title, description, duration}) => {
    return (
        <div>
            <h3>
                {chapterTitle}
            </h3>
            <h4>
                {title}
            </h4>
            <div>
                {description}
            </div>
            <div>
                {duration}
            </div>
        </div>
    )
}

CourseContentBody.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    chapterTitle: PropTypes.string.isRequired,
}

export default CourseContentBody;
