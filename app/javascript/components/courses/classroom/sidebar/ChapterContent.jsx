import React from "react";
import PropTypes from "prop-types";

const ChapterContent = ({courseContentTitle, courseContentId, duration, chapterId, navigateToCourseContent}) => {
    return (
        <div onClick={() => navigateToCourseContent(chapterId, courseContentId)}>
            {courseContentTitle} - {duration}
        </div>
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
