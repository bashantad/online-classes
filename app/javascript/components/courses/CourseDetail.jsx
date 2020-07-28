import React from "react";
import {withRouter} from 'react-router';
import PropTypes from "prop-types";
import courseApi from "../../apis/courseApi";
import CourseDetailBodyWithLoading from "./CourseDetailBody";

export class CourseDetail extends React.Component {
    state = {
        course: {},
        loading: true,
        errorMessage: '',
        showEnrollmentForm: false,
    }

    _getCourseId = () => {
        return this.props.match.params.courseId;
    }

    componentDidMount() {
        const showEnrollmentForm = this.hasEnrollQuery();
        courseApi.getById(this._getCourseId())
            .then(res => res.json())
            .then(response => {
                this.setState({course: response, loading: false, showEnrollmentForm});
            }).catch(err => {
                this.setState({loading: false, errorMessage: 'Internal server error'});
            });
    }

    hasEnrollQuery = () => {
        return this.props.location.search.indexOf('?enroll') !== -1;
    }

    handleEnrollClick = () => {
        this.setState({showEnrollmentForm: true});
    }

    render() {
        const {course, errorMessage, loading, showEnrollmentForm} = this.state;
        return <CourseDetailBodyWithLoading isLoading={loading}
                                            errorMessage={errorMessage}
                                            showEnrollmentForm={showEnrollmentForm}
                                            handleEnroll={this.handleEnrollClick}
                                            course={course}/>
    }
}

CourseDetail.propTypes = {
    history: PropTypes.object.isRequired,
};

export default withRouter(CourseDetail);
