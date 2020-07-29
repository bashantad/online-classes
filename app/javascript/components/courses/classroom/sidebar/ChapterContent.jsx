import React from "react";
import PropTypes from "prop-types";

const ChapterContent = ({courseContentTitle, courseContentId, duration, chapterId, navigateToCourseContent}) => {
    return (
        <li className="nav-item">
            <a type='button' className="nav-link" onClick={() => navigateToCourseContent(chapterId, courseContentId)}>
                <i className="fas fa-book nav-icon"></i>
                {courseContentTitle} - {duration}
            </a>
        </li>
    );
}

ChapterContent.propTypes = {
    courseContentTitle: PropTypes.string.isRequired,
    courseContentId: PropTypes.number.isRequired,
    duration: PropTypes.string.isRequired,
    chapterId: PropTypes.number.isRequired,
    navigateToCourseContent: PropTypes.func.isRequired,
}

export default ChapterContent;
