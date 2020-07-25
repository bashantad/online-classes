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
    }

    _getCourseId = () => {
        return this.props.match.params.courseId;
    }

    componentDidMount() {
        courseApi.getById(this._getCourseId())
            .then(res => res.json())
            .then(response => {
                this.setState({course: response, loading: false});
            }).catch(err => {
            this.setState({loading: false, errorMessage: 'Something went wrong'});
        }).catch(err => {
            this.setState({loading: false, errorMessage: 'Internal server error'});
        });
    }

    handleEnroll = (courseId) => {

    }

    render() {
        const {course, errorMessage, loading} = this.state;
        return <CourseDetailBodyWithLoading isLoading={loading}
                                            errorMessage={errorMessage}
                                            handleEnroll={this.handleEnroll}
                                            course={course}/>
    }
}

CourseDetail.propTypes = {
    history: PropTypes.object.isRequired,
};

export default withRouter(CourseDetail);
