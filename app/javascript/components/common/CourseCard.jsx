import React from 'react';
import PropTypes from "prop-types";

import DefaultCourseImage from '../../../assets/images/default-course-image.jpeg';
import StarCard from "./StarCard";

const CourseCard = ({course, handleButtonClick, handleDetails, isEnrolled}) => {
    const {id, course_for, duration, no_of_lessons, title, short_description, original_price, discounted_price, reviews_count, image_urls} = course;
    const imageUrl = image_urls['220x148'] || DefaultCourseImage;
    return (
        <article className="col-md-6 col-lg-4 mb-5"  key={id}>
            <div className="card border card-hover-shadow h-100 transition-3d-hover" onClick={() => handleDetails(id)}>
                <div className="card-img-top position-relative">
                    <img className="card-img-top" src={imageUrl} alt="Image Description"/>
                    <div className="position-absolute top-0 left-0 mt-3 ml-3">
                        <small
                            className="btn btn-xs btn-success btn-pill text-uppercase shadow-soft mb-3">For {course_for}</small>
                    </div>
                        <div className="position-absolute bottom-0 left-0 mb-3 ml-4">
                            <StarCard reviewsCount={reviews_count} whiteBg/>
                        </div>
                </div>

                <div className="card-body">
                    <small className="d-block small font-weight-bold text-cap mb-2">
                        {title}
                    </small>

                    <div className="mb-3">
                        <h3>
                            {short_description}
                        </h3>
                    </div>

                    <div className="d-flex align-items-center mb-4">
                        <div className="d-flex align-items-center ml-auto">
                            <div className="small text-muted">
                                <i className="fa fa-book-reader d-block d-sm-inline-block mb-1 mb-sm-0 mr-1"></i>
                                {no_of_lessons} lessons
                            </div>
                            <small className="text-muted mx-2">|</small>
                            <div className="small text-muted">
                                <i className="fa fa-clock d-block d-sm-inline-block mb-1 mb-sm-0 mr-1"></i>
                                {duration}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card-footer border-0 pt-0">
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="mr-2">
                            <small className="d-block text-muted text-lh-sm">
                                <del>${original_price}</del>
                            </small>
                            <span className="d-block h5 text-lh-sm mb-0">${discounted_price}</span>
                        </div>
                        <a className="btn btn-sm btn-primary transition-3d-hover text-white"
                           onClick={() => handleButtonClick(id)}>
                            {
                                isEnrolled ? 'Goto Classroom' : 'Enroll Now'
                            }
                        </a>
                    </div>
                </div>
            </div>
        </article>
    );
};

CourseCard.propTypes = {
    isEnrolled: PropTypes.bool.isRequired,
    course: PropTypes.object.isRequired,
    handleButtonClick: PropTypes.func.isRequired,
    handleDetails: PropTypes.func.isRequired,
};

export default CourseCard;
