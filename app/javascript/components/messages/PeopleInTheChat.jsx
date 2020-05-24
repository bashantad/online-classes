import React from 'react';
import PropTypes from 'prop-types';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Group from '@material-ui/icons/Group';
import AddCircle from '@material-ui/icons/AddCircle';

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

    _getMappingPersonToConversation = (individualConversations) => {
        const currentUserMapping = {};
        const mapping =  individualConversations.reduce((accumulator, conversation) => {
            const conversationEnrolledUsers = conversation.conversation_enrolled_users;
            if(conversationEnrolledUsers.length === 1) {
                const conversationEnrolledUser = conversationEnrolledUsers[0];
                currentUserMapping[conversationEnrolledUser.user_id] = conversationEnrolledUser.conversation_id;
            }
            conversationEnrolledUsers.forEach((convUser) => {
                if(convUser.user_id !== this.props.currentUserId) {
                    accumulator[convUser.user_id] = convUser.conversation_id
                }
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
        return conversationId === this.props.activeConversationId ? 'active' : '';
    }

    renderIndividualPerson = (user, mappingPersonToConversation) => {
        const conversationId = mappingPersonToConversation[user.id];
        return (
            <li className={`conversation-actor ${this.getActiveClass(conversationId)}`}
                key={`person-${user.id}-conversation-${conversationId}`}
                onClick={() => this.handleUserClick(mappingPersonToConversation, user.id)}
            >
                <AccountCircleIcon /> <span> {user.full_name} </span>
                {
                    this.renderNotification(conversationId)
                }
            </li>
        );
    }

    renderNotification = (conversationId) => {
        const {messageNotificationMap} = this.props;
        return (
            messageNotificationMap[conversationId] &&
                <span className='no-of-messages'>
                    {messageNotificationMap[conversationId].length}
                </span>
        );
    }

    renderGroupConversation = (conversation) => {
        const {title, id} = conversation;
        return (
            <li className={`conversation-actor ${this.getActiveClass(id)}`}
                key={id}
                onClick={() => this.handleConversationClick(id)}
            >
                <Group /> <span> {title}</span>
                {this.renderNotification(id)}
            </li>
        );
    }

    render() {
        const {conversations, enrolledUsers, messageNotificationMap, individualConversations} = this.props;
        const groupConversations = conversations.filter(conv => conv.is_group);
        const mappingPersonToConversation = this._getMappingPersonToConversation(individualConversations);
        return (
			<ul className='people-list'>
                <li onClick={() => this.props.handleCreateCourseGroup()}>
                    <AddCircle /> <span> Create a new group </span>
                </li>
                {
                    groupConversations.map(conversation => this.renderGroupConversation(conversation, messageNotificationMap))
                }
                {
                    enrolledUsers.map(user => this.renderIndividualPerson(user, mappingPersonToConversation))
                }
            </ul>
		);
	}
}

PeopleInTheChat.propTypes = {
    handleCreateCourseGroup: PropTypes.func.isRequired,
    handleConversationClick: PropTypes.func.isRequired,
    handleUserClick: PropTypes.func.isRequired,
    conversations: PropTypes.array.isRequired,
    individualConversations: PropTypes.array.isRequired,
    enrolledUsers: PropTypes.array.isRequired,
    currentUserId: PropTypes.number,
    messageNotificationMap: PropTypes.object.isRequired,
};
