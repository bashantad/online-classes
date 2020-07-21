import React from "react";
import {withRouter} from 'react-router';
import PropTypes from "prop-types";
import '../../packs/index.scss'
import courseApi from "../../apis/courseApi";
import CourseCard from "../common/CourseCard";

export class EnrolledCourses extends React.Component {
    state = {
        error: '',
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
        this.props.history.push(`/classrooms/courses/${courseId}`);
    };

    componentDidMount() {
        courseApi.getEnrolledCourses()
            .then(res => res.json())
            .then(response => {
                this.setState({courses: response, loading: false, errNotification: false});
            }).catch(err => {
            this.setState({loading: false, errNotification: true, error: 'Something went wrong'});
        });
    }

    render() {
        const {error, errNotification, courses, loading} = this.state;

        return (
            <main className='main-content-react'>
                <div className="container space-sm-2 space-bottom-lg-3">
                    <div className="w-md-80 text-center mx-md-auto mb-9">
                        <h2>Enrolled courses</h2>
                    </div>
                    {
                        loading ?
                            <div className="course-cards">
                                <div className="d-flex justify-content-center text-primary">
                                    <div className="spinner-border" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </div>
                            </div>
                            :
                            <CourseCard
                                courses={courses}
                                handleEnroll={this.handleEnroll}
                                handleDetails={this.handleDetails}/>
                    }
                </div>
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

EnrolledCourses.propTypes = {
    history: PropTypes.object.isRequired,
};

export default withRouter(EnrolledCourses);
