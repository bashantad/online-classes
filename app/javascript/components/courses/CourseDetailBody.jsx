import React from "react";
import PropTypes from "prop-types";

import CourseHeader from "./sections/CourseHeader";
import Learn from "./sections/Learn";
import Description from "./sections/Description";
import CourseSyllabus from "./sections/CourseSyllabus";
import AboutInstructor from "./sections/AboutInstructor";
import ReviewList from "./sections/ReviewList";
import WithLoading from "../common/WithLoading";
import Sidebar from "./sections/Sidebar";

export const CourseDetailBody = ({course, showEnrollmentForm, handleEnroll}) => {
    const {reviews, teacher, chapters, body_html, lecture_count, duration, reviews_count} = course;
    return <>
        <div className="position-relative">
            <CourseHeader {...course} reviewCount={reviews_count}/>
            <Sidebar course={course} handleEnroll={handleEnroll} showEnrollmentForm={showEnrollmentForm} />
        </div>
        <div className="container space-top-2 space-top-md-1">
            <div className="row">
                <div className="col-md-7 col-lg-8">
                    <Learn/>
                    <Description bodyHtml={body_html}/>
                    <CourseSyllabus chapters={chapters} duration={duration}
                                    lecture_count={lecture_count}/>
                    <AboutInstructor {...teacher}/>
                    <ReviewList reviews={reviews}/>
                </div>
            </div>
        </div>
    </>;
}

CourseDetailBody.propTypes = {
    course: PropTypes.object.isRequired,
    showEnrollmentForm: PropTypes.bool.isRequired,
    handleEnroll: PropTypes.func.isRequired,
};

export default WithLoading(CourseDetailBody);
