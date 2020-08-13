import React from "react";
import PropTypes from "prop-types";
import MessageNotification from "./MessageNotification";

const GroupSidebar = ({activeClass, title, handleConversationClick, noOfMessages}) => {
    return (
        <div className={activeClass ? "list-group people aside-active" : "list-group people"}>
            <a type='button' className="ml-2 mr-2 p-2" onClick={handleConversationClick}>
                <div className="p-2 row align-items-center">
                    <div className="col-2">
                        <span>
                            <i className="fas fa-users fa-2x mr-2"></i>
                        </span>
                    </div>
                    <div className="col-10">
                        <span className='mt-2 text-dark'>{title}</span>
                        <MessageNotification noOfMessages={noOfMessages} />
                    </div>
                </div>
            </a>
        </div>
    );
}

GroupSidebar.propTypes = {
    activeClass: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    noOfMessages: PropTypes.number.isRequired,
    handleConversationClick: PropTypes.func.isRequired,
};

export default GroupSidebar;
