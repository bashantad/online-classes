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

    render() {
        const {activeConversation} = this.props;
        return (
            <div className='message-wrapper'>
                {
                    activeConversation && <div className='conversation-wrapper'>
                        {
                            activeConversation.messages.map((message) => {
                                return (
                                    <div className='conversation-item' key={`message-${message.id}`}>
                                        <div className='person-wrapper'>
                                            <span className='person-name'>
                                                <AccountCircleIcon /> {message.sender.full_name}
                                            </span>
                                            <span className='message-created-time'>
                                                {message.created_time}
                                            </span>
                                        </div>
                                        <div className='messages'>
                                            {message.content}
                                        </div>
                                    </div>
                                );
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
    activeConversation: PropTypes.object
};
