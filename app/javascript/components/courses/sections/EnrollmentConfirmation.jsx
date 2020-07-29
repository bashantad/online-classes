import React from "react";
import PropTypes from "prop-types";
import courseApi from "../../../apis/courseApi";
import EnrollmentConfirmationView from "./EnrollmentConfirmationView";

class EnrollmentConfirmation extends React.Component {
    state = {
        loading: false,
        successMessage: '',
        errorMessage: '',
    };

    sendEnrollmentRequest = (courseId) => {
        const body = {};
        this.setState({loading: true});
        courseApi.sendEnrollmentRequest(courseId, body)
            .then(res => res.json())
            .then(response => {
                this.setState({loading: false, successMessage: response.success});
            }).catch(err => {
                this.setState({loading: false, errorMessage: err});
            })
    }
    render() {
        const {courseId} = this.props;
        const {loading, errorMessage, successMessage} = this.state;
        return <EnrollmentConfirmationView courseId={courseId}
                                        isLoading={loading}
                                        successMessage={successMessage}
                                        errorMessage={errorMessage}
                                        sendEnrollmentRequest={this.sendEnrollmentRequest} />
    }
}

EnrollmentConfirmation.propTypes = {
    courseId: PropTypes.number.isRequired,
}

export default EnrollmentConfirmation;
