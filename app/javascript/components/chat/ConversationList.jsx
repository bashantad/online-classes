import React from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import conversationApi from './conversationApi';
import Cable from './Cable';

export default class ConversationList extends React.Component {
    state = {
        conversations: [],
        activeConversationId: null
    };

    componentDidMount = () => {
        conversationApi.getAll()
            .then(res => res.json())
            .then(conversations => {
                const activeConversationId = conversations[0].id;
                this.setState({conversations, activeConversationId});
            });
    }

    handleReceivedMessage = (response) => {
        const {message} = response;
        const {conversations} = this.state;
        const conversation = conversations.find(
            item => item.id === message.conversation_id
        );
        conversation.messages = [...conversation.messages, message];
        this.setState({conversations});
    }

    findActiveConversation = () => {
        return this.state.conversations.find(
            conversation => conversation.id === this.state.activeConversationId
        );
    }

    render() {
        const {conversations} = this.state;
        const activeConversation = this.findActiveConversation();
        return (
            <div className='message-wrapper'>
                {
                    conversations.length ?
                    <Cable
                        conversations={conversations}
                        handleReceivedMessage={this.handleReceivedMessage}
                    />
                    : null
                }
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
