import React from "react";
import {withRouter} from "react-router";
import PropTypes from "prop-types";
import courseApi from "../../apis/courseApi";
import callApi from "../../apis/callApi";
import ClassRoomContentWithLoading from "./ClassRoomContent";

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
            this.setState({loading: false, errorMessage: 'Internal server error'});
        });
    }

    joinCall = () => {
        const {calling_url} = this.state.course;
        if(!!calling_url) {
            this.props.history.push(calling_url);
        } else {
            this.createAndJoinCall();
        }

    }

    createAndJoinCall = () => {
        callApi.create({course_id: this._getCourseId()})
            .then(res => res.json())
            .then(response => {
                if(response.error) {
                    this.setState({error: response.error});
                } else {
                    this.props.history.push(response.calling_url);
                }
            });
    }

    joinMessages = () => {
        this.props.history.push(`/courses/${this._getCourseId()}/messages`);
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
        return this.props.history.push(`/classrooms/courses/${this._getCourseId()}/chapters/${chapterId}/assignments/${assignmentId}`);
    }

    render() {
        const {course, errorMessage, loading} = this.state;
        return <ClassRoomContentWithLoading isLoading={loading}
                                            errorMessage={errorMessage}
                                            course={course}
                                            params={this.props.match.params}
                                            submitReview={this.submitReview}
                                            joinCall={this.joinCall}
                                            joinMessages={this.joinMessages}
                                            navigateToCourseContent={this.navigateToCourseContent}
                                            navigateToAssignmentContent={this.navigateToAssignmentContent}/>;
    }
}

ClassRoom.propTypes = {
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
};

export default withRouter(ClassRoom);
