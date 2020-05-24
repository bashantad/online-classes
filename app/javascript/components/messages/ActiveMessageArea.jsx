import React from 'react';
import PropTypes from 'prop-types';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

export default class ActiveMessageArea extends React.Component {
    constructor(props) {
        super(props);
        this.messagesEndRef = React.createRef();
    }
    componentDidMount() {
        this.scrollToTheButtom();
    }

    componentDidUpdate() {
        this.scrollToTheButtom();
    }

    scrollToTheButtom = () => {
        const currentMessageEnd = this.messagesEndRef.current;
        currentMessageEnd && currentMessageEnd.scrollIntoView({ behavior: 'smooth' })
    }

    renderMessage = (message, lastSenderId) => {
        const {currentUserId, activeConversation} = this.props;
        const {sender, created_time, content} = message;
        const messageOwnerClass = currentUserId === sender.id ? 'message-owner' : '';
        const messageKey = `conv-${activeConversation.id}-message-${message.id}`;
        const isSenderChanged = lastSenderId !== sender.id;
        const senderChangedClass = isSenderChanged ? 'sender-changed' : '';
        return (
            <div className={`conversation-item ${messageOwnerClass} ${senderChangedClass}`} key={messageKey}>
                <div className='person-wrapper'>
                    {
                        isSenderChanged &&
                            <span className='person-name'>
                                <AccountCircleIcon/> {sender.full_name}
                            </span>
                    }
                </div>
                <div className='message-item-wrapper'>
                    <div className='message-content'>
                        {content}
                    </div>
                    <div className='message-created-time'>
                        {created_time}
                    </div>
                </div>

            </div>
        );
    }

    render() {
        const {activeConversation} = this.props;
        return (
            <div className='message-wrapper'>
                {
                    activeConversation && <div className='conversation-wrapper'>
                        {
                            activeConversation.title && <div className='conversation-title'>{activeConversation.title}</div>
                        }
                        {
                            activeConversation.messages.map((message, index) => {
                                let lastSenderId = null;
                                if(index > 0) {
                                    lastSenderId = activeConversation.messages[index - 1].sender.id;
                                }
                                return this.renderMessage(message, lastSenderId)
                            })
                        }
                        <div ref={this.messagesEndRef} />
                    </div>
                }
            </div>
        );
    }
}

ActiveMessageArea.propTypes = {
    activeConversation: PropTypes.object,
    currentUserId: PropTypes.number,
};
