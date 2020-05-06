import React from 'react';
import PropTypes from 'prop-types';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

export default class ActiveMessageArea extends React.Component {
    render() {
        const {activeConversation} = this.props;
        return (
            <div className='message-wrapper'>
                {
                    activeConversation && <div className='conversation-wrapper'>
                        {
                            activeConversation.messages.map((message) => {
                                return (
                                    <div className='conversation-item' key={message.id}>
                                        <div className='person'>
                                            <span> <AccountCircleIcon /> {message.sender.full_name}</span>
                                        </div>
                                        <div className='messages'>
                                            {message.content}
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                }
            </div>
        );
    }
}

ActiveMessageArea.propTypes = {
    activeConversation: PropTypes.object
};

