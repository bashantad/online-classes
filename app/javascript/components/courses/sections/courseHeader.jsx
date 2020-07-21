import React from 'react';

const CourseHeader = (props) => {
    const {course} = props;

    return (
        <div className="gradient-y-overlay-lg-white bg-img-hero space-2 course-detail-bg-img">
            <div className="container space-top-2">
                <div className="row">
                    <div className="col-md-7 col-lg-8">
                        <small
                            className="btn btn-xs btn-success btn-pill text-uppercase mb-2">{course && course.course_for}</small>
                        <h1 className="text-lh-sm">{course && course.title}</h1>
                        <p>{course && course.body}</p>

                        <div className="d-flex align-items-center flex-wrap">
                            <div className="d-flex align-items-center mr-4">
                                <div className="avatar-group">
                                         <span className="avatar avatar-xs avatar-circle">
                                          <img className="avatar-img" src="../../assets/components/160x160/img1.jpg"
                                               alt="Image Description"/>
                                          </span>
                                </div>
                                <span className="pl-2">Created by <a className="link-underline"
                                                                     href="#">{course && course.owner.full_name}</a></span>
                            </div>
                            <div className="d-flex align-items-center flex-wrap">
                                <li className="list-inline-item mx-0"><img
                                    src="../../assets/illustrations/star.svg" alt="Review rating"
                                    width="14"/></li>
                                <li className="list-inline-item mx-0"><img
                                    src="../../assets/illustrations/star.svg" alt="Review rating"
                                    width="14"/></li>
                                <li className="list-inline-item mx-0"><img
                                    src="../../assets/illustrations/star.svg" alt="Review rating"
                                    width="14"/></li>
                                <li className="list-inline-item mx-0"><img
                                    src="../../assets/illustrations/star.svg" alt="Review rating"
                                    width="14"/></li>
                                <li className="list-inline-item mx-0"><img
                                    src="../../assets/illustrations/star-half.svg"
                                    alt="Review rating"
                                    width="16"/></li>

                                <span className="d-inline-block ml-2">
                                            <span className="text-dark font-weight-bold mr-1">4.87</span>
                                            <span className="text-muted">(1.5k+ reviews)</span>
                                          </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseHeader;