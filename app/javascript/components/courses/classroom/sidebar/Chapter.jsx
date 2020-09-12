import React from "react";
import PropTypes from "prop-types";
import ChapterContent from "./ChapterContent";
import Assignment from "./Assignment";

const Chapter = ({chapterTitle, chapterId, courseContents, assignments, navigateToCourseContent, navigateToAssignmentContent}) => {
    return (
        <>
            <div className='d-flex justify-content-between mb-2'>
                <h5 className="text-cap text-dark">{chapterTitle} </h5>
                <span className="text-body small">
              <span>
              <i className="fas fa-chalkboard mr-2"></i>{courseContents.length} lectures
            </span>
            <span className='ml-1 mr-1'>|</span>
            <span>
                  <i className="fas fa-clock mr-2"></i>Duration
            </span>
            </span>
            </div>

            <ul className="nav nav-sub nav-sm nav-tabs nav-list-y-2 mt-1">
                {
                    courseContents.map((course_content) => {
                        const {title, duration, id} = course_content;
                        return <ChapterContent key={`content-${chapterId}-${id}`}
                                               courseContentTitle={title}
                                               courseContentId={id}
                                               chapterId={chapterId}
                                               navigateToCourseContent={navigateToCourseContent}
                                               duration={duration}/>
                    })
                }
            </ul>
            <div className='text-dark text-bold small'>Assignments</div>
            <ul className="nav nav-sub nav-sm nav-tabs nav-list-y-2 mb-4">
                {
                    assignments.map((assignment) => {
                        const {question, points, id, due_date_str} = assignment;
                        return <Assignment key={`content-${chapterId}-${id}`}
                                           question={question}
                                           points={points}
                                           dueDate={due_date_str}
                                           navigateToAssignmentContent={navigateToAssignmentContent}
                                           chapterId={chapterId}
                                           assignmentId={id}/>
                    })
                }
            </ul>
        </>
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
