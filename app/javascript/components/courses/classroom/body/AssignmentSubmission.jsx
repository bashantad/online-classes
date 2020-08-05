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
            <div className='assignment-submission pl-4 pr-4 pb-4'>
                <div className="form-group">
                    <label className="input-label" htmlFor="exampleFormControlTextarea1">Answer:</label>
                    <textarea id="answer" className="form-control"  onChange={this.handleChange} value={description} placeholder="Answer"
                              rows="4"></textarea>
                </div>
                <button type="button" className="btn btn-sm btn-primary  float-right" onClick={this.submitAssignment}>Submit</button>
                <button type="button" className="btn btn-sm btn-soft-primary mr-2 float-right"  onClick={this.saveAsDraft}>
                     Save as a draft <i className="fas fa-save ml-1"></i>
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
