import React from "react";
import {withRouter} from 'react-router';
import PropTypes from "prop-types";
import courseApi from "../../apis/courseApi";
import CourseHeader from "./sections/CourseHeader";
import Sidebar from "./sections/Sidebar";
import Learn from "./sections/Learn";
import Description from "./sections/Description";
import CourseContent from "./sections/CourseContent";
import AboutInstructor from "./sections/AboutInstructor";
import Review from "./sections/Review";

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

    handleEnroll = (courseId) => {

    }

    renderCourse = (course) => {
        const {reviews, teacher, chapters, body, lecture_count, duration} = course;
        return (
            <>
                <div className="position-relative">
                    <CourseHeader {...course} reviewCount={reviews.length}/>
                    <Sidebar {...course} handleEnroll={this.handleEnroll}/>
                </div>
                <div className="container space-top-2 space-top-md-1">
                    <div className="row">
                        <div className="col-md-7 col-lg-8">
                            <Learn/>
                            <Description body={body}/>
                            <CourseContent chapters={chapters} duration={duration} lecture_count={lecture_count}/>
                            <AboutInstructor {...teacher}/>
                            <Review reviews={reviews}/>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    render() {
        const {course, errNotification, loading} = this.state;

        return (
            loading ?
                <div className="course-cards mt-md-11">
                    <div className="d-flex justify-content-center text-primary">
                        <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                </div>
                : <main id="content" role="main">
                    {
                        course && this.renderCourse(course)
                    }
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
