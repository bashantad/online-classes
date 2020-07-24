import React from "react";
import {withRouter} from "react-router";
import PropTypes from "prop-types";
import courseApi from "../../apis/courseApi";
import ChapterList from "./classroom/ChapterList";

export class ClassRoomContent extends React.Component {
    state = {
        course: null,
        loading: true,
        errNotification: false,
    }

    componentDidMount() {
        courseApi.getById(this.props.match.params.courseId)
            .then(res => res.json())
            .then(response => {
                this.setState({course: response, loading: false});
            }).catch(err => {
            this.setState({loading: false, error: 'Something went wrong'});
        });
    }

    navigateToAssignmentContent = (chapterId, assignmentId) => {
        const params = this.props.match.params;
        this.props.history.push(`/classrooms/courses/${params.courseId}/chapters/${chapterId}/assignments/${assignmentId}`);
    }

    navigateToCourseContent = (chapterId, courseContentId) => {
        const params = this.props.match.params;
        this.props.history.push(`/classrooms/courses/${params.courseId}/chapters/${chapterId}/contents/${courseContentId}`);
    }

    renderClassRoom = (course) => {
        const {chapters} = course;
        const {chapterId, courseContentId} = this.props.match.params;

        const activeChapter = chapters.find(chapter => chapter.id === parseInt(chapterId));
        const activeCourseContent = activeChapter.course_contents.find(content => content.id === parseInt(courseContentId));
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
                        <h3>{activeChapter.title}</h3>
                        {JSON.stringify(activeCourseContent)}
                    </div>
                </div>
                <div>

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

ClassRoomContent.propTypes = {
    history: PropTypes.object.isRequired,
};

export default withRouter(ClassRoomContent);

