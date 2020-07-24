import PropTypes from "prop-types";
import React from "react";
import ChapterContent from "./ChapterContent";

const Chapter = ({chapterTitle, chapterId, courseContents, navigateToCourseContent}) => {
    return (
        <div className="card border mb-1">
            <div>
                <span className="text-body font-weight-bold mr-5">
                    {chapterTitle}
                </span>
                <span>
                    {courseContents.length} lectures
                </span>
                <span>
                    duration
                </span>
            </div>
            {
                courseContents.map((course_content) => {
                    const {title, duration, id} = course_content;
                    return <ChapterContent key={`content-${chapterId}-${id}`}
                                           courseContentTitle={title}
                                           courseContentId={id}
                                           chapterId={chapterId}
                                           navigateToCourseContent={navigateToCourseContent}
                                           duration={duration} />
                })
            }
        </div>
    )
}

Chapter.propTypes = {
    chapterTitle: PropTypes.string.isRequired,
    chapterId: PropTypes.number.isRequired,
    courseContents: PropTypes.array.isRequired,
    navigateToCourseContent: PropTypes.func.isRequired,
}

export default Chapter;
