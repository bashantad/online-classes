import React from "react";
import PropTypes from "prop-types";
import ChapterContent from "./ChapterContent";
import Assignment from "./Assignment";

const Chapter = ({chapterTitle, chapterId, courseContents, assignments, navigateToCourseContent, navigateToAssignmentContent}) => {
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
            {
                assignments.map((assignment) => {
                    const {question, points, id, due_date} = assignment;
                    return <Assignment key={`content-${chapterId}-${id}`}
                                       question={question}
                                       points={points}
                                       dueDate={due_date}
                                       navigateToAssignmentContent={navigateToAssignmentContent}
                                       chapterId={chapterId}
                                       assignmentId={id} />
                })
            }
        </div>
    )
}

Chapter.propTypes = {
    chapterTitle: PropTypes.string.isRequired,
    chapterId: PropTypes.number.isRequired,
    courseContents: PropTypes.array.isRequired,
    assignments: PropTypes.array.isRequired,
    navigateToCourseContent: PropTypes.func.isRequired,
    navigateToAssignmentContent: PropTypes.func.isRequired,
}

export default Chapter;
