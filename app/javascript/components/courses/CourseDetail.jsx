import React from "react";
import {withRouter} from 'react-router';
import PropTypes from "prop-types";
import courseApi from "../../apis/courseApi";
import CourseHeader from "./sections/courseHeader";
import Sidebar from "./sections/sidebar";
import Learn from "./sections/learn";
import Description from "./sections/description";
import Contents from "./sections/contents";
import AboutInstructor from "./sections/aboutInstructor";
import Review from "./sections/review";

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

                        <Sidebar {...this.state} handleEnroll={this.handleEnroll}/>
                    </div>
                    <div className="container space-top-2 space-top-md-1">
                        <div className="row">
                            <div className="col-md-7 col-lg-8">
                                <Learn/>

                                <Description/>

                                <Contents/>

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

CourseDetail.propTypes = {
    history: PropTypes.object.isRequired,
};

export default withRouter(CourseDetail);
