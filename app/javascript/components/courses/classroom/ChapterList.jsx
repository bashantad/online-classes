import React from "react";
import PropTypes from "prop-types";
import Chapter from "./Chapter";

const ChapterList = ({chapters, navigateToCourseContent}) => {
    return (
        <div className='chapter-list'>
            {
                chapters.map((chapter, index) => {
                    const {course_contents, assignments, title, id} = chapter;
                    return <Chapter key={`chapter-${index}-content`}
                                    courseContents={course_contents}
                                    assignments={assignments}
                                    chapterId={id}
                                    navigateToCourseContent={navigateToCourseContent}
                                    chapterTitle={title} />
                })
            }
        </div>
    )
}

ChapterList.propTypes = {
    chapters: PropTypes.array.isRequired,
    navigateToCourseContent: PropTypes.func.isRequired,
}

export default ChapterList;
