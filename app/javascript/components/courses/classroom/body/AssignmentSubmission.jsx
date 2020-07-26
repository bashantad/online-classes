import React from "react";
import PropTypes from "prop-types";
import assignmentApi from "../../../../apis/assignmentApi";

export default class AssignmentSubmission extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: props.description || '',
            assignmentSubmission: {},
            loading: false,
        }
    }

    handleChange = (event) => {
        this.setState({description: event.target.value});
    }

    saveAsDraft = () => {
        this.updateSubmission({description: this.state.description});
    }

    submitAssignment = () => {
        this.updateSubmission({description: this.state.description, submit: true});
    }

    updateSubmission = (body) => {
        this.setState({loading: true});
        const {courseId, chapterId, assignmentId, submissionId} = this.props;
        assignmentApi.updateSubmission(courseId, chapterId, assignmentId, submissionId, body)
            .then(res => res.json())
            .then(response => {
                this.setState({assignmentSubmission: response, loading: false});
            }).catch(err => {
            this.setState({loading: false, error: 'Internal server error'});
        });
    }

    render() {
        const {description} = this.state;
        return (
            <div className='assignment-submission'>
                <textarea onChange={this.handleChange} value={description}></textarea>
                <button onClick={this.saveAsDraft}>
                    Save as a draft
                </button>

                <button onClick={this.submitAssignment}>
                    Submit
                </button>
            </div>
        );
    }
}

AssignmentSubmission.propTypes = {
    courseId: PropTypes.number.isRequired,
    chapterId: PropTypes.number.isRequired,
    assignmentId: PropTypes.number.isRequired,
    submissionId: PropTypes.number,
    description: PropTypes.string,
}
