import React from "react";
import PropTypes from "prop-types";
import WithLoading from "../common/WithLoading";
import ChapterList from "./classroom/sidebar/ChapterList";
import ClassRoomBody from "./ClassRoomBody";
import ReviewList from "./sections/ReviewList";

export const ClassRoomContent = ({navigateToCourseContent, navigateToAssignmentContent, course, params, submitReview}) => {
    const {reviews, chapters} = course;
    return (
        <main id="content" role="main" className='container'>
            <button type="button" className="navbar-toggler btn btn-icon btn-soft-primary btn-xs rounded-circle d-md-none mt-2"
                    aria-label="Toggle navigation"
                    aria-expanded="false"
                    aria-controls="sidebarNav"
                    data-toggle="collapse"
                    data-target="#sidebarNav">
                      <span className="navbar-toggler-default">
                        <i className="fas fa-bars"></i>
                      </span>
                <span className="navbar-toggler-toggled">
                         <i className="fas fa-times"></i>
              </span>
            </button>

            <div className='enrolled-classroom space-top-lg-2'>
                <div className="row">
                    <div className="col-md-5 col-lg-4">
                        <div className="navbar-expand-md navbar-expand-md-collapse-block navbar-light">
                            <div id="sidebarNav" className="collapse navbar-collapse navbar-vertical">
                                <div className="card">
                                    <div className="card-body">
                                        <ChapterList chapters={chapters}
                                                     navigateToCourseContent={navigateToCourseContent}
                                                     navigateToAssignmentContent={navigateToAssignmentContent}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-7 col-lg-8">
                        <div className="card mb-3 mb-lg-5">
                            <ClassRoomBody params={params} course={course} />
                        </div>
                    </div>
                </div>
                <ReviewList reviews={reviews} submitReview={submitReview} />
            </div>
        </main>
    );
};

ClassRoomContent.propTypes = {
    navigateToCourseContent: PropTypes.func.isRequired,
    navigateToAssignmentContent: PropTypes.func.isRequired,
    submitReview: PropTypes.func.isRequired,
    course: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
};

export default WithLoading(ClassRoomContent);
