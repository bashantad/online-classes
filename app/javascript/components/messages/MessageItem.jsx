import React from "react";
import PropTypes from "prop-types";

const MessageItem = ({currentUserId, message, lastSenderId}) => {
    const {sender_id, created_time, content, sender} = message;
    const messageOwnerClass = currentUserId === sender_id ? 'message-owner' : 'sender-owner';
    const isSenderChanged = lastSenderId !== sender_id;
    const senderChangedClass = isSenderChanged ? 'sender-changed' : '';
    return (
        <>
            <div className={`conversation-item ${messageOwnerClass} ${senderChangedClass}`}>
                <div className='person-wrapper'>
                    {
                        isSenderChanged &&
                        <div className='person-name'>
                            <i className="fas fa-user mr-2 mt-1 person-icon"></i>
                            <span className='person-name-item'>{sender.full_name}</span>
                        </div>
                    }
                </div>
                <div className='message-item-wrapper'>
                    <div className='border message-content'>
                        {content}
                    </div>
                    <div className='message-created-time'>
                        {created_time}
                    </div>
                </div>
            </div>
        </>
    );
}

MessageItem.propTypes = {
    lastSenderId: PropTypes.number,
    currentUserId: PropTypes.number.isRequired,
    message: PropTypes.object.isRequired,
}

export default MessageItem;
