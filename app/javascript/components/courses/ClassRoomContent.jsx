import React from "react";
import PropTypes from "prop-types";
import WithLoading from "../common/WithLoading";
import ChapterList from "./classroom/sidebar/ChapterList";
import ClassRoomBody from "./ClassRoomBody";
import ReviewList from "../reviews/ReviewList";
import {isEmpty} from "../../utils/utils";
import book from '../../../assets/images/icons/icon-2.svg'
import noCourse from '../../../assets/images/illustrations/reading.svg'

export const ClassRoomContent = ({course, params, navigateToCourseContent, navigateToAssignmentContent, submitReview, joinCall, joinMessages}) => {
    const {reviews, chapters} = course;
    return (
        <main id="content" role="main" className='container'>
            <button type="button"
                    className="navbar-toggler btn btn-icon btn-soft-primary btn-xs rounded-circle d-md-none mt-2"
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
                                        <div className='border-bottom pb-2 mb-3'>
                                            <button type="button" className="btn btn-primary btn-pill btn-xs mr-3"
                                                    onClick={joinMessages}>
                                                Live Chat
                                                <i className="fas fa-comment-dots ml-2"></i>
                                            </button>
                                            <button type="button" className="btn btn-primary btn-pill btn-xs"
                                                    onClick={joinCall}>
                                                Live Call
                                                <i className="fas fa-video ml-2"></i>
                                            </button>
                                        </div>
                                        {
                                            isEmpty(chapters) ? <div>
                                                    <figure className="max-w-8rem mx-auto mb-3">
                                                        <img className="img-fluid" src={book}
                                                             alt="SVG"/>
                                                    </figure>
                                                    <div className='custom-align-center'>
                                                        No Courses.
                                                    </div>
                                                </div> :
                                                <ChapterList chapters={chapters}
                                                             navigateToCourseContent={navigateToCourseContent}
                                                             navigateToAssignmentContent={navigateToAssignmentContent}
                                                />
                                        }

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
                <ReviewList reviews={reviews} submitReview={submitReview}/>
            </div>
        </main>
    );
};

ClassRoomContent.propTypes = {
    course: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    navigateToCourseContent: PropTypes.func.isRequired,
    navigateToAssignmentContent: PropTypes.func.isRequired,
    submitReview: PropTypes.func.isRequired,
    joinCall: PropTypes.func.isRequired,
    joinMessages: PropTypes.func.isRequired,
};

export default WithLoading(ClassRoomContent);
