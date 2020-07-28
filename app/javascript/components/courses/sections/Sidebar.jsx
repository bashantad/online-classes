import React from "react";
import PropTypes from "prop-types";
import EnrollmentConfirmation from "./EnrollmentConfirmation";
import CourseSidebar from "./CourseSidebar";

const Sidebar = ({course, handleEnroll, showEnrollmentForm}) => {
    return (
        <div className="container space-top-md-2 position-md-absolute top-0 right-0 left-0">
            <div className="row justify-content-end">
                <div id="stickyBlockStartPoint"
                     className="col-md-5 col-lg-4 position-relative z-index-2">
                    <div className="js-sticky-block card border"
                         data-hs-sticky-block-options='{
                                       "parentSelector": "#stickyBlockStartPoint",
                                       "breakpoint": "md",
                                       "startPoint": "#stickyBlockStartPoint",
                                       "endPoint": "#stickyBlockEndPoint",
                                       "stickyOffsetTop": 12,
                                       "stickyOffsetBottom": 12
                                     }'>
                        {
                            showEnrollmentForm ?
                                <EnrollmentConfirmation />
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