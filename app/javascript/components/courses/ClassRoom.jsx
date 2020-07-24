import React from "react";
import {withRouter} from "react-router";
import PropTypes from "prop-types";
import courseApi from "../../apis/courseApi";
import ChapterList from "./classroom/ChapterList";

export class ClassRoom extends React.Component {
    state = {
        course: null,
        loading: true,
        errNotification: false,
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

    navigateToCourseContent = (chapterId, courseContentId) => {
        return this.props.history.push(`/classrooms/courses/${this._getCourseId()}/chapters/${chapterId}/assignments/${courseContentId}`);
    }

    navigateToAssignmentContent = (chapterId, assignmentId) => {
        return this.props.history.push(`./${this._getCourseId()}/chapters/${chapterId}/assignments/${assignmentId}`);
    }

    renderClassRoom = (course) => {
        const {chapters, reviews, body} = course;
        return (
            <div className='enrolled-classroom'>
                <div className="row">
                    <div className="col-md-5 col-lg-4">
                        <ChapterList chapters={chapters}
                                     navigateToCourseContent={this.navigateToCourseContent}
                                     navigateToAssignmentContent={this.navigateToAssignmentContent}
                        />
                    </div>
                    <div className="col-md-7 col-lg-8">
                        {body}
                    </div>
                </div>
                <div>
                    {JSON.stringify(reviews)}
                </div>
            </div>
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
                        course && this.renderClassRoom(course)
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

ClassRoom.propTypes = {
    history: PropTypes.object.isRequired,
};

export default withRouter(ClassRoom);

