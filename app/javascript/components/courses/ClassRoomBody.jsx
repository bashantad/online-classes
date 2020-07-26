import React from "react";
import PropTypes from "prop-types";
import Assignment from "./classroom/body/Assignment";
import CourseContentBody from "./classroom/body/CourseContentBody";
import CourseLandingBody from "./classroom/body/CourseLandingBody";

const ClassRoomBody = ({course, params}) => {
    const {assignmentId, courseContentId, chapterId} = params;
    const {chapters, body_html} = course;
    if(!!chapterId) {
        const activeChapter = chapters.find(chapter => chapter.id === parseInt(chapterId));
        const chapterTitle = activeChapter.title;
        if(!!assignmentId) {
            const activeAssignment = activeChapter.assignments.find(assignment => assignment.id === parseInt(assignmentId));
            return <Assignment {...activeAssignment} chapterTitle={chapterTitle} courseId={course.id} chapterId={activeChapter.id}/>
        } else if(!!courseContentId) {
            const activeCourseContent = activeChapter.course_contents.find(content => content.id === parseInt(courseContentId));
            return <CourseContentBody {...activeCourseContent} chapterTitle={chapterTitle} />
        } else {
            return null;
        }
    } else {
        return <CourseLandingBody body_html={body_html} />
    }
}

ClassRoomBody.propTypes = {
    course: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
}

export default ClassRoomBody;
