import React from "react";
import PropTypes from "prop-types";
import EnrollmentConfirmation from "./EnrollmentConfirmation";
import CourseSidebar from "./CourseSidebar";
import EnrollmentSummary from "./EnrollmentSummary";

const Sidebar = ({course, handleEnroll, showEnrollmentForm}) => {
    return (
        <div className="container space-top-md-2 position-md-absolute top-0 right-0 left-0">
            <div className="row justify-content-end">
                <div
                     className="col-md-5 col-lg-4 position-relative z-index-2">
                    <div className="card border">
                        {
                            showEnrollmentForm ?
                                <>
                                    <div>
                                        <div className="card h-100">
                                            <EnrollmentSummary {...course} />
                                            <div className='card-footer '>
                                                <EnrollmentConfirmation courseId={course.id}/>
                                            </div>
                                        </div>
                                    </div>
                                </>
                                : <CourseSidebar {...course} handleEnroll={handleEnroll}/>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

Sidebar.propTypes = {
    course: PropTypes.object.isRequired,
    handleEnroll: PropTypes.func.isRequired,
    showEnrollmentForm: PropTypes.bool.isRequired,
}

export default Sidebar;