import React from 'react';
import PropTypes from "prop-types";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";

const CourseCard = ({courses, handleEnroll, handleDetails}) => {
    return (
        <div className="course-cards">
            {
                courses.map(course => (
                    <article className="col-md-6 col-lg-4 mb-5"  key={course.id}>
                        <div className="card border card-hover-shadow h-100 transition-3d-hover" onClick={() => handleDetails(course.id)}>
                            <div className="card-img-top position-relative">
                                <img className="card-img-top" src="https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1489&q=80"
                                     alt="Image Description"/>
                                <div className="position-absolute top-0 left-0 mt-3 ml-3">
                                    <small
                                        className="btn btn-xs btn-success btn-pill text-uppercase shadow-soft mb-3">For {course.course_for}</small>
                                </div>
                                    <div className="position-absolute bottom-0 left-0 mb-3 ml-4">
                                        <div className="d-flex align-items-center flex-wrap">
                                            <ul className="list-inline mt-n1 mb-0 mr-2">
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
                                                    src="../../assets/illustrations/star.svg" alt="Review rating"
                                                    width="14"/></li>
                                            </ul>
                                            <span className="d-inline-block">
                    <small className="font-weight-bold text-white mr-1">4.95</small>
                    <small className="text-white-70">(1k+ reviews)</small>
                  </span>
                                        </div>
                                    </div>
                            </div>

                            <div className="card-body">
                                <small
                                    className="d-block small font-weight-bold text-cap mb-2">{course.title}</small>

                                <div className="mb-3">
                                    <h3>
                                        <a className="text-inherit" href={() => handleDetails(course.id)}>{course.body}</a>
                                    </h3>
                                </div>

                                <div className="d-flex align-items-center mb-4">
                                    <div className="d-flex align-items-center ml-auto">
                                        <div className="small text-muted">
                                            <i className="fa fa-book-reader d-block d-sm-inline-block mb-1 mb-sm-0 mr-1"></i>
                                            8 lessons
                                        </div>
                                        <small className="text-muted mx-2">|</small>
                                        <div className="small text-muted">
                                            <i className="fa fa-clock d-block d-sm-inline-block mb-1 mb-sm-0 mr-1"></i>
                                            7h 59m
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="card-footer border-0 pt-0">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="mr-2">
                                        <small className="d-block text-muted text-lh-sm">
                                            <del>$129.99</del>
                                        </small>
                                        <span className="d-block h5 text-lh-sm mb-0">${course.price}</span>
                                    </div>
                                    <a className="btn btn-sm btn-primary transition-3d-hover text-white"
                                       onClick={() => handleDetails(course.id)}>Preview</a>
                                </div>
                            </div>
                        </div>
                    </article>
                ))
            }
        </div>
    );
};

CourseCard.propTypes = {
    courses: PropTypes.array.isRequired,
    handleEnroll: PropTypes.func.isRequired,
    handleDetails: PropTypes.func.isRequired,
};

export default CourseCard;
