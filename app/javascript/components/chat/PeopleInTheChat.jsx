import React from 'react';
import PropTypes from 'prop-types';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Group from '@material-ui/icons/Group';

import courseApi from './courseApi';

export default class PeopleInTheChat extends React.Component {
    handleConversationClick = (conversationId) => {
        this.props.handleConversationClick(conversationId);
    }
    handleUserClick = (mappingPersonToConversation, userId) => {
        const conversationId = mappingPersonToConversation[userId];
        if(conversationId) {
            this.handleConversationClick(conversationId);
        } else {
            this.props.handleUserClick(userId);
        }
    }

    _getMappingPersonToConversation = (conversations) => {
        const personalConversations = conversations.filter(conv => !conv.is_group);
        const currentUserMapping = {};
        const mapping =  personalConversations.reduce((accumulator, conversation) => {
            const conversationUsers = conversation.conversation_users;
            if(conversationUsers.length === 1) {
                const conversationUser = conversationUsers[0];
                currentUserMapping[conversationUser.user_id] = conversationUser.conversation_id;
            }
            conversationUsers.forEach((convUser) => {
                accumulator[convUser.user_id] = convUser.conversation_id
            })
            return accumulator;
        }, {});
        const currentUserKey = Object.keys(currentUserMapping)[0];
        if(currentUserKey) {
            mapping[currentUserKey] = currentUserMapping[currentUserKey];
        }
        return mapping;
    }

    getActiveClass = (conversationId) => {
        return conversationId === this.props.activeConversationId ? 'active' : ''
    }

    render() {
        const {conversations, enrolledUsers} = this.props;
        const groupConversations = conversations.filter(conv => conv.is_group);
        const mappingPersonToConversation = this._getMappingPersonToConversation(conversations);
        return (
			<ul className='people-list'>
                {
                    groupConversations.map((conversation) => (
                        <li className={`conversation-actor ${this.getActiveClass(conversation.id)}`}
                            key={conversation.id}
                            onClick={() => this.handleConversationClick(conversation.id)}
                        >
                            <Group /> <span> {conversation.title}</span>
                        </li>
                    ))
                }
                {
                    enrolledUsers.map((user) =>
                        <li className={`conversation-actor ${this.getActiveClass(mappingPersonToConversation[user.id])}`}
                            key={`person-${user.id}`}
                            onClick={() => this.handleUserClick(mappingPersonToConversation, user.id)}
                        >
                            <AccountCircleIcon /> <span> {user.full_name} </span>
                        </li>
                    )
                }
            </ul>
		);
	}
}

PeopleInTheChat.propTypes = {
    handleConversationClick: PropTypes.func.isRequired,
    handleUserClick: PropTypes.func.isRequired,
    conversations: PropTypes.array.isRequired,
    enrolledUsers: PropTypes.array.isRequired,
};
