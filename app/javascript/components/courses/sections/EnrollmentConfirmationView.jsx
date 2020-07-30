import React from "react";
import PropTypes from "prop-types";
import WithLoading from "../../common/WithLoading";

const EnrollmentConfirmationView = ({successMessage, sendEnrollmentRequest, courseId}) => {
    return (
        <div>
            {
                successMessage ?
                    <div>
                        {successMessage}
                    </div>
                    :
                    <button onClick={() => sendEnrollmentRequest(courseId)}>
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
