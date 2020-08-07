import React from "react";
import PropTypes from "prop-types";
import WithLoading from "../../common/WithLoading";

const EnrollmentConfirmationView = ({successMessage, sendEnrollmentRequest, courseId, errorMessage}) => {
    return (
        <div class='text-center'>
            {
                successMessage ?
                    <div className="alert alert-soft-success" role="alert">
                        {successMessage}
                    </div>
                    :
                    errorMessage ?
                        <div className="alert alert-soft-alert" role="alert">
                            {errorMessage}
                        </div>
                        :
                    <button className='btn btn-soft-primary btn-block transition-3d-hover' onClick={() => sendEnrollmentRequest(courseId)}>
                        <i className='fa fa-check mr-2'></i>
                        Confirm
                    </button>
            }
        </div>
    )
}

EnrollmentConfirmationView.propTypes = {
    successMessage: PropTypes.string,
    sendEnrollmentRequest: PropTypes.func.isRequired,
    courseId: PropTypes.number.isRequired,
}

export default WithLoading(EnrollmentConfirmationView);
