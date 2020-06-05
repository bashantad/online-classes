import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import './ActiveMessageArea.scss';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import SpeakerNotesOffIcon from '@material-ui/icons/SpeakerNotesOff';

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
        currentMessageEnd && currentMessageEnd.scrollIntoView({behavior: 'smooth'})
    }

    renderMessage = (message, lastSenderId) => {
        const {currentUserId, activeConversation} = this.props;
        const {sender, created_time, content} = message;
        const messageOwnerClass = currentUserId === sender.id ? 'message-owner' : 'sender-owner';
        const messageKey = `conv-${activeConversation.id}-message-${message.id}`;
        const isSenderChanged = lastSenderId !== sender.id;
        const senderChangedClass = isSenderChanged ? 'sender-changed' : '';
        return (
            <Fragment>
                <div className={`conversation-item ${messageOwnerClass} ${senderChangedClass}`} key={messageKey}>
                    <div className='person-wrapper'>
                        {
                            isSenderChanged &&
                            <span className='person-name'>
                                <AccountCircleIcon className='person-icon'/><span
                                className='person-name-item'>{sender.full_name}</span>
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
            </Fragment>
        );
    };

    render() {
        const {activeConversation} = this.props;

        return (
            <div>
                {
                    activeConversation && <Toolbar className='conversation-title'><Typography
                        variant="h5">{activeConversation.title ? activeConversation.title : 'Messages'}</Typography></Toolbar>
                }
                <div className='active-conversation-wrapper'>
                    {
                        activeConversation && <div className='active-conversation'>
                            {
                                Array.isArray(activeConversation.messages) && activeConversation.messages.length ?
                                    <Paper className='message-card'>
                                        {
                                            activeConversation.messages.map((message, index) => {
                                                let lastSenderId = null;
                                                if (index > 0) {
                                                    lastSenderId = activeConversation.messages[index - 1].sender.id;
                                                }
                                                return this.renderMessage(message, lastSenderId)
                                            })
                                        }
                                    </Paper> : <div className='message-card no-message' >
                                        <Paper className='no-message-card'><SpeakerNotesOffIcon/> <div>No Messages</div></Paper>
                                    </div>
                            }
                            <div ref={this.messagesEndRef}/>
                        </div>
                    }
                </div>
            </div>

        );
    };
}

ActiveMessageArea.propTypes = {
    activeConversation: PropTypes.object,
    currentUserId: PropTypes.number,
};
