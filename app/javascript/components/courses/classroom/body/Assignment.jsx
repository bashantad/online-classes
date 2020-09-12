import React from 'react';
import PropTypes from 'prop-types';
import assignmentApi from "../../../../apis/assignmentApi";
import AssignmentBodyWithLoading from "./AssignmentBody";
import AssignmentSubmission from "./AssignmentSubmission";

export default class Assignment extends React.Component {
    state = {
        assignmentSubmission: {},
        loading: false,
        errorMessage: '',
    }
    componentDidMount() {
        this.fetchAssignment();
    }

    componentDidUpdate(prevProps) {
        if(prevProps.id !== this.props.id) {
            this.fetchAssignment();
        }
    }

    fetchAssignment() {
        this.setState({loading: true});
        const {courseId, chapterId, id} = this.props;
        assignmentApi.findOrCreateSubmission(courseId, chapterId, id)
            .then(res => res.json())
            .then(response => {
                this.setState({assignmentSubmission: response, loading: false});
            }).catch(err => {
                this.setState({loading: false, error: 'Internal server error'});
            });
    }

    render() {
        const {chapterTitle, question, instructions_html, points, due_date_str, courseId, chapterId, id} = this.props;
        const {loading, errorMessage, assignmentSubmission} = this.state;
        return (
            <>
                <AssignmentBodyWithLoading isLoading={loading}
                                errorMessage={errorMessage}
                                chapterTitle={chapterTitle}
                                question={question}
                                points={points}
                                dueDate={due_date_str}
                                instructionsHtml={instructions_html}/>

                {
                    Object.keys(assignmentSubmission).length > 0 && <AssignmentSubmission courseId={courseId}
                                          chapterId={chapterId}
                                          assignmentId={id}
                                          description={assignmentSubmission.description_html}
                                          submissionId={assignmentSubmission.id} />
                }
            </>

        )
    }
}

Assignment.propTypes = {
    question: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    courseId: PropTypes.number.isRequired,
    chapterId: PropTypes.number.isRequired,
    instructions_html: PropTypes.string.isRequired,
    points: PropTypes.number.isRequired,
    due_date_str: PropTypes.string.isRequired,
    chapterTitle: PropTypes.string.isRequired,
}
