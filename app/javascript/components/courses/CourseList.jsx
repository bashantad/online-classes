import React from "react";
import PropTypes from "prop-types";
import {withRouter} from 'react-router';

import '../../packs/index.scss';
import courseApi from "../../apis/courseApi";
import CourseListWithLoading from "./CourseListView";

export class CourseList extends React.Component {
    state = {
        errorMessage: '',
        courses: [],
        loading: true,
    }

    handleEnroll = (courseId) => {
        this.props.history.push(`/courses/${courseId}?enroll=from_courses`);
    };

    handleDetails = (courseId) => {
        this.props.history.push(`/courses/${courseId}`);
    };

    componentDidMount() {
        courseApi.getApprovedCourses()
            .then(res => res.json())
            .then(response => {
                this.setState({courses: response, loading: false});
            }).catch(err => {
            this.setState({loading: false, errorMessage: 'Internal server error'});
        });
    }

    render() {
        const {errorMessage, courses, loading} = this.state;

        return (
            <>
                <div className="container space-sm-2 space-bottom-lg-3">
                    <div className="w-md-80 text-center mx-md-auto mb-9">
                        <h2>Featured courses</h2>
                        <p>Discover your perfect program in our courses.</p>
                    </div>
            <CourseListWithLoading isLoading={loading}
                                      errorMessage={errorMessage}
                                      courses={courses}
                                      handleDetails={this.handleDetails}
                                      handleEnroll={this.handleEnroll} />s
                </div>
                                      </>
        )
    }
}

CourseList.propTypes = {
    history: PropTypes.object.isRequired,
};

export default withRouter(CourseList);
