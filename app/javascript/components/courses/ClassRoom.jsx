import React from "react";
import {withRouter} from "react-router";
import PropTypes from "prop-types";
import courseApi from "../../apis/courseApi";
import Chapter from "./classroom/Chapter";

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

    navigateToCourseContent = (chapterId, courseContentId) => {

    }

    renderClassRoom = (course) => {
        const {chapters, reviews} = course;
        return (
            <div className='enrolled-classroom'>
                <div className="row">
                    <div className="col-md-5 col-lg-4">
                        {
                            chapters.map((chapter, index) => {
                                const {course_contents, assignments, title, id} = chapter;
                                return <Chapter key={`chapter-${index}-content`}
                                                course_contents={course_contents}
                                                assignments={assignments}
                                                chapterId={id}
                                                navigateToCourseContent={this.navigateToCourseContent}
                                                chapterTitle={title} />
                            })
                        }
                    </div>
                    <div className="col-md-7 col-lg-8">
                        Main body
                    </div>
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

