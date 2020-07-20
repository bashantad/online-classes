import React, {Fragment} from "react";
import {Link} from "react-router-dom";
import {withRouter} from 'react-router';
import PropTypes from "prop-types";
import courseApi from "../../apis/courseApi";
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';

export class CourseDetail extends React.Component {
    state = {
        course: null,
        loading: true,
        errNotification: false,
    }

    _getCourseId = () => {
        return this.props.match.params.course_id;
    }

    componentDidMount() {
        courseApi.getById(this._getCourseId())
            .then(res => res.json())
            .then(response => {
                this.setState({course: response, loading: false});
            }).catch(err => {
            this.setState({loading: false, error: 'Something went wrong'});
        });
    }

    submitReview = (rating, comment) => {
        courseApi.reviews(this._getCourseId()).create({
            rating: rating,
            comment: comment,
        })
            .then(res => res.json())
            .then(response => {
                const {course} = this.state;
                const reviews = [response, ...course.reviews];
                course.reviews = reviews;
                this.setState({course: course})
            });
    }

    handleClose = () => {
        this.setState({errNotification: false});
    };

    render() {
        const {course, errNotification,loading} = this.state;
        const reviews = course && course.reviews;

        return (

            loading ?
                <div className="course-cards">
                    <div className="d-flex justify-content-center text-primary">
                        <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                </div>
                :
                <main id="content" role="main">
                    <div className="position-relative">
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
                        {/*sidebar*/}
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
                                        <div className="position-relative p-1">
                                            <a className="js-fancybox video-player" href="javascript:;"
                                               data-hs-fancybox-options='{
                                             "src": "//youtube.com/0qisGSwZym4",
                                             "caption": "Front - Responsive Website Template",
                                             "speed": 700,
                                             "buttons": ["fullScreen", "close"],
                                             "youtube": {
                                               "autoplay": 1
                                             }
                                           }'>
                                                <img className="card-img-top"
                                                     src="../../assets/components/graphics-1.svg"
                                                     alt="Image Description"/>

                                                <span
                                                    className="video-player-btn video-player-centered text-center">
                                        <span className="video-player-icon mb-2">
                                          <i className="fa fa-play"></i>
                                        </span>
                                        <span className="d-block text-center text-white">
                                          Preview this course
                                        </span>
                                      </span>
                                            </a>

                                        </div>

                                        <div className="card-body">
                                            <div className="mb-3">
                                                    <span
                                                        className="h2 text-lh-sm mr-1 mb-0">${course && course.price}</span>
                                                <span className="lead text-muted text-lh-sm"></span>
                                            </div>

                                            <div className="mb-2">
                                                <a className="btn btn-block btn-primary transition-3d-hover"
                                                   href="#">Enroll
                                                    Now</a>
                                            </div>

                                            <div className="text-center mb-4">
                                                <p className="small">30-day money-back guarantee</p>
                                            </div>

                                            <h2 className="h4">This course includes</h2>


                                            <div className="media text-body font-size-1 mb-2">
                                                <div className="min-w-3rem text-center mr-3">
                                                    <i className="fa fa-video"></i>
                                                </div>
                                                <div className="media-body">
                                                    46.5 hours on-demand video
                                                </div>
                                            </div>

                                            <div className="media text-body font-size-1 mb-2">
                                                <div className="min-w-3rem text-center mr-3">
                                                    <i className="fa fa-file"></i>
                                                </div>
                                                <div className="media-body">
                                                    77 articles
                                                </div>
                                            </div>

                                            <div className="media text-body font-size-1 mb-2">
                                                <div className="min-w-3rem text-center mr-3">
                                                    <i className="fa fa-file-download"></i>
                                                </div>
                                                <div className="media-body">
                                                    85 downloadable resources
                                                </div>
                                            </div>

                                            <div className="media text-body font-size-1 mb-2">
                                                <div className="min-w-3rem text-center mr-3">
                                                    <i className="fa fa-infinity"></i>
                                                </div>
                                                <div className="media-body">
                                                    Full time access
                                                </div>
                                            </div>

                                            <div className="media text-body font-size-1 mb-2">
                                                <div className="min-w-3rem text-center mr-3">
                                                    <i className="fa fa-mobile"></i>
                                                </div>
                                                <div className="media-body">
                                                    Access on mobile and Tablet
                                                </div>
                                            </div>

                                            <div className="media text-body font-size-1 mb-2">
                                                <div className="min-w-3rem text-center mr-3">
                                                    <i className="fa fa-certificate"></i>
                                                </div>
                                                <div className="media-body">
                                                    Certificate of Completion
                                                </div>
                                            </div>
                                        </div>

                                        <a className="card-footer text-center font-weight-bold py-3"
                                           data-toggle="modal"
                                           data-target="#copyToClipboardModal" href="javascript:;">
                                            <i className="fa fa-share mr-1"></i>
                                            Share
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*end sidebar*/}
                    </div>
                    <div className="container space-top-2 space-top-md-1">
                        <div className="row">
                            <div className="col-md-7 col-lg-8">
                                {/*details*/}
                                <div className="pt-0 mt-0">
                                    <h3 className="mb-4">What you'll learn</h3>

                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="media text-body font-size-1 mb-3">
                                                <i className="fas fa-check-circle text-success mt-1 mr-2"></i>
                                                <div className="media-body">
                                                    Learn to use Python professionally, learning both Python 2 and
                                                    Python 3!
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-lg-6">
                                            <div className="media text-body font-size-1 mb-3">
                                                <i className="fas fa-check-circle text-success mt-1 mr-2"></i>
                                                <div className="media-body">
                                                    Create games with Python, like Tic Tac Toe and Blackjack!
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="media text-body font-size-1 mb-3">
                                                <i className="fas fa-check-circle text-success mt-1 mr-2"></i>
                                                <div className="media-body">
                                                    Learn advanced Python features, like the collections module and
                                                    how
                                                    to work with timestamps!
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-lg-6">
                                            <div className="media text-body font-size-1 mb-3">
                                                <i className="fas fa-check-circle text-success mt-1 mr-2"></i>
                                                <div className="media-body">
                                                    Learn to use Object Oriented Programming with classes!
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="media text-body font-size-1 mb-3">
                                                <i className="fas fa-check-circle text-success mt-1 mr-2"></i>
                                                <div className="media-body">
                                                    Understand complex topics, like decorators.
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-lg-6">
                                            <div className="media text-body font-size-1 mb-3">
                                                <i className="fas fa-check-circle text-success mt-1 mr-2"></i>
                                                <div className="media-body">
                                                    Understand how to use both the Jupyter Notebook and create .py
                                                    files
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="media text-body font-size-1 mb-3">
                                                <i className="fas fa-check-circle text-success mt-1 mr-2"></i>
                                                <div className="media-body">
                                                    Get an understanding of how to create GUIs in the Jupyter
                                                    Notebook
                                                    system!
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-lg-6">
                                            <div className="media text-body font-size-1 mb-3">
                                                <i className="fas fa-check-circle text-success mt-1 mr-2"></i>
                                                <div className="media-body">
                                                    Build a complete understanding of Python from the ground up!
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/*end details*/}

                                {/*info*/}
                                <div className="border-top pt-7 mt-7">
                                    <h3 className="mb-4">Description</h3>

                                    <p>Become a Python Programmer and learn one of employer's most requested skills
                                        of
                                        2019!</p>

                                    <p>This is the most comprehensive, yet straight-forward, course for the Python
                                        programming language on Udemy! Whether you have never programmed before,
                                        already
                                        know basic syntax, or want to learn about the advanced features of Python,
                                        this
                                        course is for you! In this course we will teach you Python 3. (Note, we also
                                        provide
                                        older Python 2 notes in case you need them)</p>

                                    <div className="collapse" id="collapseDescriptionSection">
                                        <p>With over 100 lectures and more than 20 hours of video this comprehensive
                                            course
                                            leaves no stone unturned! This course includes quizzes, tests, and
                                            homework
                                            assignments as well as 3 major projects to create a Python project
                                            portfolio!</p>

                                        <p>This course will teach you Python in a practical manner, with every
                                            lecture comes
                                            a full coding screencast and a corresponding code notebook! Learn in
                                            whatever
                                            manner is best for you!</p>

                                        <p>We will start by helping you get Python installed on your computer,
                                            regardless of
                                            your operating system, whether its Linux, MacOS, or Windows, we've got
                                            you
                                            covered!</p>

                                        <p>We cover a wide variety of topics, including:</p>

                                        <ul className="text-body pl-6">
                                            <li>Command Line Basics</li>
                                            <li>Installing Python</li>
                                            <li>Running Python Code</li>
                                            <li>Strings</li>
                                            <li>Lists&nbsp;</li>
                                            <li>Dictionaries</li>
                                            <li>Tuples</li>
                                            <li>Sets</li>
                                            <li>Number Data Types</li>
                                            <li>Print Formatting</li>
                                            <li>Functions</li>
                                            <li>Scope</li>
                                            <li>args/kwargs</li>
                                            <li>Built-in Functions</li>
                                            <li>Debugging and Error Handling</li>
                                            <li>Modules</li>
                                            <li>External Modules</li>
                                            <li>Object Oriented Programming</li>
                                            <li>Inheritance</li>
                                            <li>Polymorphism</li>
                                            <li>File I/O</li>
                                            <li>Advanced Methods</li>
                                            <li>Unit Tests</li>
                                            <li>and much more!</li>
                                        </ul>

                                        <p>This course comes with a 30 day money back guarantee! If you are not
                                            satisfied in
                                            any way, you'll get your money back. Plus you will keep access to the
                                            Notebooks
                                            as a thank you for trying out the course!</p>
                                    </div>

                                    <a className="link link-collapse small font-size-1 font-weight-bold pt-1"
                                       data-toggle="collapse" href="#collapseDescriptionSection" role="button"
                                       aria-expanded="false" aria-controls="collapseDescriptionSection">
                                        <span className="link-collapse-default">Read more</span>
                                        <span className="link-collapse-active">Read less</span>
                                        <span className="link-icon ml-1">+</span>
                                    </a>
                                </div>
                                {/*info end*/}

                                {/*contents*/}
                                <div className="border-top pt-7 mt-7 mb-7">
                                    <div className="row mb-4">
                                        <div className="col-8">
                                            <h3 className="mb-0">Course content</h3>
                                        </div>
                                        <div className="col-4 text-right">
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <span className="font-size-1">186 lectures</span>
                                                </div>
                                                <div className="col-lg-6">
                                                    <span className="font-size-1">24:10:28</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card border mb-1">
                                        <div className="card-header card-collapse" id="coursesHeadingOne">
                                            <a className="btn btn-link btn-sm btn-block card-btn p-3"
                                               href="javascript:;" role="button" data-toggle="collapse"
                                               data-target="#coursesCollapseOne"
                                               aria-expanded="true" aria-controls="coursesCollapseOne">
                                            <span className="row">
                                                <span className="col-8">
                                                  <span className="media">
                                                    <span className="card-btn-toggle mr-3 ml-0">
                                                      <span className="card-btn-toggle-default">&#x2b;</span>
                                                      <span className="card-btn-toggle-active">&minus;</span>
                                                    </span>
                                                    <span className="media-body">
                                                      <span
                                                          className="text-body font-weight-bold mr-5">Course overview</span>
                                                    </span>
                                                  </span>
                                                </span>
                                                <span className="col-4 text-right">
                                                  <span className="row">
                                                    <span className="col-lg-6">
                                                      <span className="text-muted">5 lectures</span>
                                                    </span>
                                                    <span className="col-lg-6">
                                                      <span className="text-muted">15:32</span>
                                                    </span>
                                                  </span>
                                                </span>
                                              </span>
                                            </a>
                                        </div>
                                        <div id="coursesCollapseOne" className="collapse show"
                                             aria-labelledby="coursesHeadingOne">
                                            <div className="card-body p-0">
                                                <div className="border-bottom py-3 pr-3 pl-6">
                                                    <div className="row">
                                                        <div className="col-8">
                                                            <a className="media font-size-1 mr-5" href="#">
                                                                <i className="fa fa-play-circle min-w-3rem text-center opacity-lg mt-1 mr-2 ml-1"></i>
                                                                <span className="media-body">
                                                            <span>Course introduction</span>
                                                          </span>
                                                            </a>
                                                        </div>
                                                        <div className="col-4 text-right">
                                                            <div className="row">
                                                                <div className="col-lg-6">
                                                                    <a className="font-size-1" href="#">Preview</a>
                                                                </div>
                                                                <div className="col-lg-6">
                                                                        <span
                                                                            className="text-primary font-size-1">06:39</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="border-bottom py-3 pr-3 pl-6">
                                                    <div className="row">
                                                        <div className="col-8">
                                                            <a className="media font-size-1 mr-5" href="#">
                                                                <i className="fa fa-play-circle min-w-3rem text-center opacity-lg mt-1 mr-2 ml-1"></i>
                                                                <span className="media-body">
                                                        <span>Course curriculum overview</span>
                                                      </span>
                                                            </a>
                                                        </div>
                                                        <div className="col-4 text-right">
                                                            <div className="row">
                                                                <div className="col-lg-6">
                                                                    <a className="font-size-1" href="#">Preview</a>
                                                                </div>
                                                                <div className="col-lg-6">
                                                                        <span
                                                                            className="text-primary font-size-1">04:00</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="border-bottom py-3 pr-3 pl-6">
                                                    <div className="row">
                                                        <div className="col-8">
                                                            <a className="media font-size-1 mr-5" href="#">
                                                                <i className="fa fa-play-circle min-w-3rem text-center opacity-lg mt-1 mr-2 ml-1"></i>
                                                                <span className="media-body">
                                                                <span>Python 2 versus Python 3</span>
                                                              </span>
                                                            </a>
                                                        </div>
                                                        <div className="col-4 text-right">
                                                            <div className="row">
                                                                <div className="col-lg-6">
                                                                    <a className="font-size-1" href="#">Preview</a>
                                                                </div>
                                                                <div className="col-lg-6">
                                                                        <span
                                                                            className="text-primary font-size-1">06:39</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card border mb-1">
                                        <div className="card-header card-collapse" id="coursesHeadingTwo">
                                            <a className="btn btn-link btn-sm btn-block card-btn collapsed p-3"
                                               href="javascript:;" role="button" data-toggle="collapse"
                                               data-target="#coursesCollapseTwo"
                                               aria-expanded="false" aria-controls="coursesCollapseTwo">
                                            <span className="row">
                                                <span className="col-8">
                                                  <span className="media">
                                                    <span className="card-btn-toggle mr-3 ml-0">
                                                      <span className="card-btn-toggle-default">&#x2b;</span>
                                                      <span className="card-btn-toggle-active">&minus;</span>
                                                    </span>
                                                    <span className="media-body">
                                                      <span
                                                          className="text-body font-weight-bold mr-5">Python Setup</span>
                                                    </span>
                                                  </span>
                                                </span>
                                                <span className="col-4 text-right">
                                                  <span className="row">
                                                    <span className="col-lg-6">
                                                      <span className="text-muted">5 lectures</span>
                                                    </span>
                                                    <span className="col-lg-6">
                                                      <span className="text-muted">15:32</span>
                                                    </span>
                                                  </span>
                                                </span>
                                              </span>
                                            </a>
                                        </div>
                                        <div id="coursesCollapseTwo" className="collapse"
                                             aria-labelledby="coursesHeadingTwo">
                                            <div className="card-body p-0">
                                                <div className="border-bottom py-3 pr-3 pl-6">
                                                    <div className="row">
                                                        <div className="col-8">
                                                            <a className="media font-size-1 mr-5" href="#">
                                                                <i className="fa fa-play-circle min-w-3rem text-center opacity-lg mt-1 mr-2 ml-1"></i>
                                                                <span className="media-body">
                                                                    <span>Course line courses</span>
                                                                  </span>
                                                            </a>
                                                        </div>
                                                        <div className="col-4 text-right">
                                                            <div className="row">
                                                                <div className="col-lg-6">
                                                                    <a className="font-size-1" href="#">Preview</a>
                                                                </div>
                                                                <div className="col-lg-6">
                                                                    <span
                                                                        className="text-primary font-size-1">08:15</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="border-bottom py-3 pr-3 pl-6">
                                                    <div className="row">
                                                        <div className="col-8">
                                                            <a className="media font-size-1 mr-5" href="#">
                                                                <i className="fa fa-play-circle min-w-3rem text-center opacity-lg mt-1 mr-2 ml-1"></i>
                                                                <span className="media-body">
                                                                <span>Installing Python (Step by step)</span>
                                                              </span>
                                                            </a>
                                                        </div>
                                                        <div className="col-4 text-right">
                                                            <div className="row">
                                                                <div className="col-lg-6">
                                                                    <a className="font-size-1" href="#">Preview</a>
                                                                </div>
                                                                <div className="col-lg-6">
                                                                        <span
                                                                            className="text-primary font-size-1">08:18</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="border-bottom py-3 pr-3 pl-6">
                                                    <div className="row">
                                                        <div className="col-8">
                                                            <a className="media font-size-1 mr-5" href="#">
                                                                <i className="fa fa-play-circle min-w-3rem text-center opacity-lg mt-1 mr-2 ml-1"></i>
                                                                <span className="media-body">
                                                            <span>Running Python code</span>
                                                          </span>
                                                            </a>
                                                        </div>
                                                        <div className="col-4 text-right">
                                                            <div className="row">
                                                                <div className="col-lg-6">
                                                                    <a className="font-size-1" href="#">Preview</a>
                                                                </div>
                                                                <div className="col-lg-6">
                                                                    <span
                                                                        className="text-primary font-size-1">17:50</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="border-bottom py-3 pr-3 pl-6">
                                                    <div className="row">
                                                        <div className="col-8">
                                                        <span className="media text-body font-size-1 mr-5">
                                                          <i className="fa fa-play-circle min-w-3rem text-center opacity-lg mt-1 mr-2 ml-1"></i>
                                                          <span className="media-body">
                                                            <span>Getting the notebooks and the course material</span>
                                                          </span>
                                                        </span>
                                                        </div>
                                                        <div className="col-4 text-right">
                                                            <div className="row">
                                                                <div className="col-lg-6">
                                                                </div>
                                                                <div className="col-lg-6">
                                                                    <span className="font-size-1">02:22</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="border-bottom py-3 pr-3 pl-6">
                                                    <div className="row">
                                                        <div className="col-8">
                                                        <span className="media text-body font-size-1 mr-5">
                                                          <i className="fa fa-play-circle min-w-3rem text-center opacity-lg mt-1 mr-2 ml-1"></i>
                                                          <span className="media-body">
                                                            <span>Git and Github overview (Optional)</span>
                                                          </span>
                                                        </span>
                                                        </div>
                                                        <div className="col-4 text-right">
                                                            <div className="row">
                                                                <div className="col-lg-6">
                                                                </div>
                                                                <div className="col-lg-6">
                                                                    <span className="font-size-1">02:49</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="collapse" id="collapseCoursesContentSection">
                                        <div className="card border mb-1">
                                            <div className="card-header card-collapse" id="coursesHeadingSix">
                                                <a className="btn btn-link btn-sm btn-block card-btn collapsed p-3"
                                                   href="javascript:;" role="button" data-toggle="collapse"
                                                   data-target="#coursesCollapseSix"
                                                   aria-expanded="false" aria-controls="coursesCollapseSix">
                                                <span className="row">
                                                  <span className="col-8">
                                                    <span className="media">
                                                      <span className="card-btn-toggle mr-3 ml-0">
                                                        <span className="card-btn-toggle-default">&#x2b;</span>
                                                        <span className="card-btn-toggle-active">&minus;</span>
                                                      </span>
                                                      <span className="media-body">
                                                        <span className="text-body font-weight-bold mr-5">Modules and packages</span>
                                                      </span>
                                                    </span>
                                                  </span>
                                                  <span className="col-4 text-right">
                                                    <span className="row">
                                                      <span className="col-lg-6">
                                                        <span className="text-muted">3 lectures</span>
                                                      </span>
                                                      <span className="col-lg-6">
                                                        <span className="text-muted">29:10</span>
                                                      </span>
                                                    </span>
                                                  </span>
                                                </span>
                                                </a>
                                            </div>
                                            <div id="coursesCollapseSix" className="collapse"
                                                 aria-labelledby="coursesHeadingSix">
                                                <div className="card-body p-0">
                                                    <div className="border-bottom py-3 pr-3 pl-6">
                                                        <div className="row">
                                                            <div className="col-8">
                                                          <span className="media text-body font-size-1 mr-5">
                                                            <i className="fa fa-play-circle min-w-3rem text-center opacity-lg mt-1 mr-2 ml-1"></i>
                                                            <span className="media-body">
                                                              <span>Pip Install and PyPi</span>
                                                            </span>
                                                          </span>
                                                            </div>
                                                            <div className="col-4 text-right">
                                                                <div className="row">
                                                                    <div className="col-lg-6">
                                                                    </div>
                                                                    <div className="col-lg-6">
                                                                        <span className="text-muted">07:46</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="border-bottom py-3 pr-3 pl-6">
                                                        <div className="row">
                                                            <div className="col-8">
                                                          <span className="media text-body font-size-1 mr-5">
                                                            <i className="fa fa-play-circle min-w-3rem text-center opacity-lg mt-1 mr-2 ml-1"></i>
                                                            <span className="media-body">
                                                              <span>Modules and Packages</span>
                                                            </span>
                                                          </span>
                                                            </div>
                                                            <div className="col-4 text-right">
                                                                <div className="row">
                                                                    <div className="col-lg-6">
                                                                    </div>
                                                                    <div className="col-lg-6">
                                                                        <span className="text-muted">11:39</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="border-bottom py-3 pr-3 pl-6">
                                                        <div className="row">
                                                            <div className="col-8">
                                                          <span className="media text-body font-size-1 mr-5">
                                                            <i className="fa fa-play-circle min-w-3rem text-center opacity-lg mt-1 mr-2 ml-1"></i>
                                                            <span className="media-body">
                                                              <span>__name__ and "__main__"</span>
                                                            </span>
                                                          </span>
                                                            </div>
                                                            <div className="col-4 text-right">
                                                                <div className="row">
                                                                    <div className="col-lg-6">
                                                                    </div>
                                                                    <div className="col-lg-6">
                                                                        <span className="text-muted">09:45</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card border mb-1">
                                            <div className="card-header card-collapse" id="coursesHeadingSeven">
                                                <a className="btn btn-link btn-sm btn-block card-btn collapsed p-3"
                                                   href="javascript:;" role="button" data-toggle="collapse"
                                                   data-target="#coursesCollapseSeven"
                                                   aria-expanded="false" aria-controls="coursesCollapseSeven">
                                                <span className="row">
                                                  <span className="col-8">
                                                    <span className="media">
                                                      <span className="card-btn-toggle mr-3 ml-0">
                                                        <span className="card-btn-toggle-default">&#x2b;</span>
                                                        <span className="card-btn-toggle-active">&minus;</span>
                                                      </span>
                                                      <span className="media-body">
                                                        <span className="text-body font-weight-bold mr-5">Errors and exceptions handling</span>
                                                      </span>
                                                    </span>
                                                  </span>
                                                  <span className="col-4 text-right">
                                                    <span className="row">
                                                      <span className="col-lg-6">
                                                        <span className="text-muted">5 lectures</span>
                                                      </span>
                                                      <span className="col-lg-6">
                                                        <span className="text-muted">45:14</span>
                                                      </span>
                                                    </span>
                                                  </span>
                                                </span>
                                                </a>
                                            </div>
                                            <div id="coursesCollapseSeven" className="collapse"
                                                 aria-labelledby="coursesHeadingSeven">
                                                <div className="card-body p-0">
                                                    <div className="border-bottom py-3 pr-3 pl-6">
                                                        <div className="row">
                                                            <div className="col-8">
                                                          <span className="media text-body font-size-1 mr-5">
                                                            <i className="fa fa-play-circle min-w-3rem text-center opacity-lg mt-1 mr-2 ml-1"></i>
                                                            <span className="media-body">
                                                              <span>Errors and Exception Handling</span>
                                                            </span>
                                                          </span>
                                                            </div>
                                                            <div className="col-4 text-right">
                                                                <div className="row">
                                                                    <div className="col-lg-6">
                                                                    </div>
                                                                    <div className="col-lg-6">
                                                                        <span className="text-muted">17:19</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="border-bottom py-3 pr-3 pl-6">
                                                        <div className="row">
                                                            <div className="col-8">
                                                          <span className="media text-body font-size-1 mr-5">
                                                            <i className="fa fa-play-circle min-w-3rem text-center opacity-lg mt-1 mr-2 ml-1"></i>
                                                            <span className="media-body">
                                                              <span>Errors and Exceptions Homework</span>
                                                            </span>
                                                          </span>
                                                            </div>
                                                            <div className="col-4 text-right">
                                                                <div className="row">
                                                                    <div className="col-lg-6">
                                                                    </div>
                                                                    <div className="col-lg-6">
                                                                        <span className="text-muted">01:30</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="border-bottom py-3 pr-3 pl-6">
                                                        <div className="row">
                                                            <div className="col-8">
                                                          <span className="media text-body font-size-1 mr-5">
                                                            <i className="fa fa-play-circle min-w-3rem text-center opacity-lg mt-1 mr-2 ml-1"></i>
                                                            <span className="media-body">
                                                              <span>Errors and Exception Homework - Solutions</span>
                                                            </span>
                                                          </span>
                                                            </div>
                                                            <div className="col-4 text-right">
                                                                <div className="row">
                                                                    <div className="col-lg-6">
                                                                    </div>
                                                                    <div className="col-lg-6">
                                                                        <span className="text-muted">05:16</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="border-bottom py-3 pr-3 pl-6">
                                                        <div className="row">
                                                            <div className="col-8">
                                                          <span className="media text-body font-size-1 mr-5">
                                                            <i className="fa fa-play-circle min-w-3rem text-center opacity-lg mt-1 mr-2 ml-1"></i>
                                                            <span className="media-body">
                                                              <span>Pylint Overview</span>
                                                            </span>
                                                          </span>
                                                            </div>
                                                            <div className="col-4 text-right">
                                                                <div className="row">
                                                                    <div className="col-lg-6">
                                                                    </div>
                                                                    <div className="col-lg-6">
                                                                        <span className="text-muted">11:36</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="border-bottom py-3 pr-3 pl-6">
                                                        <div className="row">
                                                            <div className="col-8">
                                                          <span className="media text-body font-size-1 mr-5">
                                                            <i className="fa fa-play-circle min-w-3rem text-center opacity-lg mt-1 mr-2 ml-1"></i>
                                                            <span className="media-body">
                                                              <span>Running tests with the Unittest Library</span>
                                                            </span>
                                                          </span>
                                                            </div>
                                                            <div className="col-4 text-right">
                                                                <div className="row">
                                                                    <div className="col-lg-6">
                                                                    </div>
                                                                    <div className="col-lg-6">
                                                                        <span className="text-muted">09:33</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="card border">
                                        <a className="link link-collapse btn btn-link btn-sm btn-block card-btn text-center p-3"
                                           data-toggle="collapse" href="#collapseCoursesContentSection"
                                           role="button"
                                           aria-expanded="false" aria-controls="collapseCoursesContentSection">
                                            <span className="link-collapse-default">2 more sections</span>
                                            <span className="link-collapse-active">View less</span>
                                        </a>
                                    </div>
                                </div>
                                {/*contents end    */}
                                {/*about*/}
                                <div className="border-top pt-7 mt-7">
                                    <h3 className="mb-4">About the instructor</h3>

                                    <div className="row">
                                        <div className="col-lg-4 mb-4 mb-lg-0">
                                            <div className="avatar avatar-xl avatar-circle mb-3">
                                                <img className="avatar-img"
                                                     src="../../assets/components/160x160/img1.jpg"
                                                     alt="Image Description"/>
                                            </div>


                                            <div className="media text-body font-size-1 mb-2">
                                                <div className="min-w-3rem text-center mr-2">
                                                    <i className="fa fa-star"></i>
                                                </div>
                                                <div className="media-body">
                                                    4.87 Instructor rating
                                                </div>
                                            </div>


                                            <div className="media text-body font-size-1 mb-2">
                                                <div className="min-w-3rem text-center mr-2">
                                                    <i className="fa fa-comments"></i>
                                                </div>
                                                <div className="media-body">
                                                    1,533 reviews
                                                </div>
                                            </div>


                                            <div className="media text-body font-size-1 mb-2">
                                                <div className="min-w-3rem text-center mr-2">
                                                    <i className="fa fa-user"></i>
                                                </div>
                                                <div className="media-body">
                                                    23,912 students
                                                </div>
                                            </div>

                                            <div className="media text-body font-size-1 mb-2">
                                                <div className="min-w-3rem text-center mr-2">
                                                    <i className="fa fa-play"></i>
                                                </div>
                                                <div className="media-body">
                                                    29 courses
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-lg-8">
                                            <div className="mb-2">
                                                <h4 className="h5 mb-1"><a href="author.html">Nataly Gaga</a></h4>
                                                <span className="d-block font-size-1 font-weight-bold">Head of Data Science, Pierian Data Inc.</span>
                                            </div>

                                            <p>Nataly Gaga has a BS and MS in Mechanical Engineering from Santa
                                                Clara
                                                University and
                                                years of experience as a professional instructor and trainer for
                                                Data
                                                Science and
                                                programming. She has publications and patents in various fields such
                                                as
                                                microfluidics,
                                                materials science, and data science technologies.</p>
                                        </div>
                                    </div>
                                </div>
                                {/*about end*/}

                                {/*reviews*/}
                                <div className="border-top pt-7 mt-7">
                                    <div className="row justify-content-md-between align-items-md-center">
                                        <div className="col-md-6">
                                            <h3 className="mb-0">Reviews</h3>
                                        </div>
                                        <div className="col-md-6">
                                            <form className="input-group input-group-sm">
                                                <input type="search" className="form-control"
                                                       placeholder="Search reviews"
                                                       aria-label="Search reviews"/>
                                                <div className="input-group-append">
                                                    <button type="button" className="btn btn-primary">
                                                        <i className="fa fa-search"></i>
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    {reviews && reviews.map(review => (
                                        <div className="pt-5 mt-5">
                                            <div className="row mb-2">
                                                <div className="col-lg-4 mb-3 mb-lg-0">

                                                    <div className="media align-items-center">
                                                        <div className="avatar avatar-circle mr-3">
                                                            <img className="avatar-img"
                                                                 src={review.user.avatar_image_urls['60x40']}
                                                                 alt={review.user.full_name}/>
                                                        </div>
                                                        <div className="media-body">
                                                            <span className="d-block text-body font-size-1">April 3, 2019</span>
                                                            <h4 className="mb-0">{review.user.full_name}</h4>
                                                        </div>
                                                    </div>

                                                </div>

                                                <div className="col-lg-8">
                                                    <ul className="list-inline mb-2">
                                                        <li className="list-inline-item mx-0"><img
                                                            src="../../assets/illustrations/star.svg"
                                                            alt="Review rating"
                                                            width="16" height="16"/></li>
                                                        <li className="list-inline-item mx-0"><img
                                                            src="../../assets/illustrations/star.svg"
                                                            alt="Review rating"
                                                            width="16" height="16"/></li>
                                                        <li className="list-inline-item mx-0"><img
                                                            src="../../assets/illustrations/star.svg"
                                                            alt="Review rating"
                                                            width="16" height="16"/></li>
                                                        <li className="list-inline-item mx-0"><img
                                                            src="../../assets/illustrations/star.svg"
                                                            alt="Review rating"
                                                            width="16" height="16"/></li>
                                                        <li className="list-inline-item mx-0"><img
                                                            src="../../assets/illustrations/star.svg"
                                                            alt="Review rating"
                                                            width="16" height="16"/></li>
                                                    </ul>

                                                    <p>{review.comment}</p>
                                                </div>
                                            </div>

                                            <div className="font-size-1">
                                                <span>Was this helpful?</span>
                                                <span className="ml-2">
                                      <a className="btn btn-xs btn-outline-secondary" href="javascript:;">Yes</a>
                                    </span>
                                                <span className="ml-2">
                                      <a className="btn btn-xs btn-outline-secondary" href="javascript:;">No</a>
                                    </span>
                                                <span className="ml-3">
                                      <i className="far fa-flag text-body mr-1"></i>
                                      <a className="text-muted" href="#">Report</a>
                                    </span>
                                            </div>
                                        </div>
                                    ))
                                    }

                                    <div className="border-top text-center pt-5 mt-5">
                                        <a className="btn btn-sm btn-outline-primary transition-3d-hover" href="#">See
                                            all
                                            Reviews</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="stickyBlockEndPoint"></div>
                    {
                        errNotification ?
                            <div className="alert alert-soft-danger custom-align-center" role="alert">
                                {error}
                            </div>
                            : ''
                    }
                </main>
        );
    }
}

CourseDetail.propTypes = {
    history: PropTypes.object.isRequired,
};

export default withRouter(CourseDetail);
