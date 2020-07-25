import React from "react";
import PropTypes from "prop-types";

const ClassRoomBody = ({course, params}) => {
    const {assignmentId, courseContentId, chapterId} = params;
    const {chapters, body} = course;
    if(!!chapterId) {
        const activeChapter = chapters.find(chapter => chapter.id === parseInt(chapterId));
        if(!!assignmentId) {
            const activeAssignment = activeChapter.assignments.find(assignment => assignment.id === parseInt(assignmentId));
            return (
                <div className="col-md-7 col-lg-8">
                    <h3>{activeChapter.title}</h3>
                    {JSON.stringify(activeAssignment)}
                </div>
            );
        } else if(!!courseContentId) {
            const activeCourseContent = activeChapter.course_contents.find(content => content.id === parseInt(courseContentId));
            return (
                <div className="col-md-7 col-lg-8">
                    <h3>{activeChapter.title}</h3>
                    {JSON.stringify(activeCourseContent)}
                </div>
            );
        } else {
            return null;
        }
    } else {
        return <div>{body}</div>
    }
}

ClassRoomBody.propTypes = {
    course: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
}

export default ClassRoomBody;
