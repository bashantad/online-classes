import React from "react";
import {withRouter} from "react-router";
import PropTypes from "prop-types";
import courseApi from "../../apis/courseApi";
import ClassRoomBodyWithLoading from "./ClassRoomBody";

export class ClassRoom extends React.Component {
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

    navigateToCourseContent = (chapterId, courseContentId) => {
        return this.props.history.push(`/classrooms/courses/${this._getCourseId()}/chapters/${chapterId}/course_contents/${courseContentId}`);
    }

    navigateToAssignmentContent = (chapterId, assignmentId) => {
        return this.props.history.push(`./${this._getCourseId()}/chapters/${chapterId}/assignments/${assignmentId}`);
    }

    render() {
        const {course, errorMessage, loading} = this.state;
        return <ClassRoomBodyWithLoading isLoading={loading}
                                         errorMessage={errorMessage}
                                         {...course}
                                         navigateToCourseContent={this.navigateToCourseContent}
                                         navigateToAssignmentContent={this.navigateToAssignmentContent} />;
    }
}

ClassRoom.propTypes = {
    history: PropTypes.object.isRequired,
};

export default withRouter(ClassRoom);

