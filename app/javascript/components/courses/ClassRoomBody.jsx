import React from "react";
import PropTypes from "prop-types";
import AssignmentBody from "./classroom/body/AssignmentBody";
import CourseContentBody from "./classroom/body/CourseContentBody";
import CourseLandingBody from "./classroom/body/CourseLandingBody";

const ClassRoomBody = ({course, params}) => {
    const {assignmentId, courseContentId, chapterId} = params;
    const {chapters, body} = course;
    if(!!chapterId) {
        const activeChapter = chapters.find(chapter => chapter.id === parseInt(chapterId));
        const chapterTitle = activeChapter.title;
        if(!!assignmentId) {
            const activeAssignment = activeChapter.assignments.find(assignment => assignment.id === parseInt(assignmentId));
            return <AssignmentBody {...activeAssignment} chapterTitle={chapterTitle}/>
        } else if(!!courseContentId) {
            const activeCourseContent = activeChapter.course_contents.find(content => content.id === parseInt(courseContentId));
            return <CourseContentBody {...activeCourseContent} chapterTitle={chapterTitle} />
        } else {
            return null;
        }
    } else {
        return <CourseLandingBody body={body} />
    }
}

ClassRoomBody.propTypes = {
    course: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
}

export default ClassRoomBody;
