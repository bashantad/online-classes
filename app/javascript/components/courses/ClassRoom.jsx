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

export class ClassRoom extends React.Component {
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

    render() {
        const {course, errNotification, loading} = this.state;
        const reviews = course && course.reviews;

        return (
            loading ?
                <div className="course-cards mt-md-11">
                    <div className="d-flex justify-content-center text-primary">
                        <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                </div>
                :
                <main id="content" role="main">
                    <div className="position-relative">
                        <CourseHeader {...this.state}/>

                        <Sidebar {...this.state}/>
                    </div>
                    <div className="container space-top-2 space-top-md-1">
                        <div className="row">
                            <div className="col-md-7 col-lg-8">
                                <Learn/>

                                <Description/>

                                <CourseContent/>

                                <AboutInstructor/>

                                <Review reviews={reviews}/>
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

ClassRoom.propTypes = {
    history: PropTypes.object.isRequired,
};

export default withRouter(ClassRoom);
