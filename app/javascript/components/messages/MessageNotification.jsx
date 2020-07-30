import React from "react";
import PropTypes from "prop-types";

const MessageNotification = ({noOfMessages}) => {
    return (
        <>
            {
                noOfMessages > 0 &&
                <span className="badge badge-pill badge-primary no-of-messages">
                    {noOfMessages}
                </span>
            }
        </>
    )
};

MessageNotification.propTypes = {
    noOfMessages: PropTypes.number.isRequired,
}

export default MessageNotification;
