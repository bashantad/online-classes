import React from "react";
import {withRouter} from 'react-router';
import PropTypes from "prop-types";

import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from "@material-ui/core/Snackbar";

import '../packs/index.scss'
import courseApi from "../apis/courseApi";
import CourseCard from "./common/CourseCard";
import ReadingImage from "../../assets/images/illustrations/reading.svg";

export class Home extends React.Component {
    state = {
        error: '',
        vertical: 'bottom',
        horizontal: 'right',
        courses: [],
        errNotification: false,
        loading: true,
    }

    handleClose = () => {
        this.setState({errNotification: false});
    };

    handleEnroll = (courseId) => {

    };

    handleDetails = (courseId) => {
        this.props.history.push(`/courses/${courseId}`);
    };

    componentDidMount() {
        courseApi.getApprovedCourses()
            .then(res => res.json())
            .then(response => {
                this.setState({courses: response, loading: false, errNotification: false});
            }).catch(err => {
            this.setState({loading: false, errNotification: true, error: 'Something went wrong'});
        });
    }

    render() {
        const {error, horizontal, vertical, errNotification, courses, loading} = this.state;

        return (
            <div className="main-root">
                <main className='main-content-react'>
                    <div className="container space-2">
                        <div className="row justify-content-lg-between align-items-lg-center">
                            <div className="col-sm-10 col-lg-5 mb-7 mb-lg-0">
                                <img className="img-fluid" src={ReadingImage} alt="Reading image"/>
                            </div>

                            <div className="col-lg-6">
                                <div className="mb-5">
                                    <h1 className="display-4 mb-3">
                                        Unlock your
                                        <br/>
                                        Potential
                                    </h1>
                                    <p className="lead">With our platform, you can quantify your skills, grow in your
                                        role and stay relevant on critical topics.</p>
                                </div>

                                <div className="d-sm-flex align-items-sm-center flex-sm-wrap">
                                    <a className="btn btn-primary mb-2" href="/users/sign_up">
                                        Get Started
                                    </a>

                                    <div className="mx-2"></div>

                                    <a className="js-fancybox video-player video-player-btn media align-items-center text-dark mb-2"
                                       href="#"
                                       data-hs-fancybox-options='{
                                         "src": "//youtube.com/0qisGSwZym4",
                                         "caption": "Front - Responsive Website Template",
                                         "speed": 700,
                                         "buttons": ["fullScreen", "close"],
                                         "youtube": {
                                           "autoplay": 1
                                         }
                                          }'>
                                      <span className="video-player-icon shadow-soft mr-3">
                                        <i className="fa fa-play"></i>
                                      </span>
                                        <span className="media-body">
                                            How it works
                                          </span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container space-sm-2 space-bottom-lg-3">
                        <div className="w-md-80 text-center mx-md-auto mb-9">
                            <h2>Featured courses</h2>
                            <p>Discover your perfect program in our courses.</p>
                        </div>
                        {
                            loading ?
                                <div className="course-cards mt-md-8">
                                    <div className="d-flex justify-content-center text-primary">
                                        <div className="spinner-border" role="status">
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                </div>
                                :
                                <div className="course-cards">
                                    {
                                        courses.map((course, index) =>
                                            <CourseCard
                                                key={`course-${index}-card`}
                                                course={course}
                                                handleEnroll={this.handleEnroll}
                                                handleDetails={this.handleDetails}/>
                                        )
                                    }
                                </div>
                        }
                    </div>
                    {
                        <Snackbar
                            anchorOrigin={{vertical, horizontal}}
                            open={errNotification}
                            onClose={this.handleClose}
                            message={error}
                            key={vertical + horizontal}
                            className='snackbar'
                            action={
                                <>
                                    <IconButton size="small" aria-label="close" color="inherit"
                                                onClick={this.handleClose}>
                                        <CloseIcon fontSize="small"/>
                                    </IconButton>
                                </>
                            }
                        />
                    }
                </main>
            </div>
        );
    }
}

Home.propTypes = {
    history: PropTypes.object.isRequired,
};

export default withRouter(Home);
