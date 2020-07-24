import React from 'react';
import PropTypes from 'prop-types';
import './PeopleInTheChat.scss';

export default class PeopleInTheChat extends React.Component {
    handleConversationClick = (conversationId) => {
        this.props.handleConversationClick(conversationId);
    }
    handleUserClick = (mappingPersonToConversation, userId) => {
        const conversationId = mappingPersonToConversation[userId];
        if (conversationId) {
            this.handleConversationClick(conversationId);
        } else {
            this.props.handleUserClick(userId);
        }
    }

    _getMappingPersonToConversation = (individualConversations) => {
        const currentUserMapping = {};
        const mapping = individualConversations.reduce((accumulator, conversation) => {
            const conversationEnrolledUsers = conversation.conversation_enrolled_users;
            if (conversationEnrolledUsers.length === 1) {
                const conversationEnrolledUser = conversationEnrolledUsers[0];
                currentUserMapping[conversationEnrolledUser.user_id] = conversationEnrolledUser.conversation_id;
            }
            conversationEnrolledUsers.forEach((convUser) => {
                if (convUser.user_id !== this.props.currentUserId) {
                    accumulator[convUser.user_id] = convUser.conversation_id
                }
            })
            return accumulator;
        }, {});
        const currentUserKey = Object.keys(currentUserMapping)[0];
        if (currentUserKey) {
            mapping[currentUserKey] = currentUserMapping[currentUserKey];
        }
        return mapping;
    }

    getActiveClass = (conversationId) => {
        return conversationId === this.props.activeConversationId;
    }

    renderIndividualPerson = (user, mappingPersonToConversation) => {
        const conversationId = mappingPersonToConversation[user.id];
        const {avatar_image_urls, full_name} = user;
        const imageUrl = avatar_image_urls["60x40"];
        return (
            <div className="list-group">
                <a type='button' className="list-group-item list-group-item-action"
                   key={`person-${user.id}-conversation-${conversationId}`}
                   onClick={() => this.handleUserClick(mappingPersonToConversation, user.id)}
                   selected={this.getActiveClass(conversationId)}>
                    {
                        imageUrl ?
                            <img className="avatar-img" src={imageUrl} alt="Image Description"/>
                            :  <i className="fas fa-user list-group-icon"></i>
                    }
                    {full_name}</a>
                {this.renderNotification(conversationId)}
            </div>
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
            <div className='border-bottom'>
                <button type="button" className="btn btn-xs btn-ghost-primary mt-2 mb-2" key={id}
                        onClick={() => this.handleConversationClick(id)}>
                    <i className="fas fa-user mr-2"></i>
                    {title}
                </button>
                {this.renderNotification(id)}
            </div>
        )
    }

    render() {
        const {conversations, enrolledUsers, messageNotificationMap, individualConversations, handleClick} = this.props;
        const groupConversations = conversations.filter(conv => conv.is_group);
        const mappingPersonToConversation = this._getMappingPersonToConversation(individualConversations);

        return (
            <>
                <div className="navbar-expand-lg navbar-expand-lg-collapse-block navbar-light">
                    <button type="button" className="navbar-toggler btn btn-block border py-3"
                            aria-label="Toggle navigation"
                            aria-expanded="false"
                            aria-controls="sidebarNavExample1"
                            data-toggle="collapse"
                            data-target="#sidebarNavExample1">
            <span className="d-flex justify-content-between align-items-center">
              <span className="h5 mb-0">View all categories</span>
              <span className="navbar-toggler-default">
                <svg width="14" height="14" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                  <path fill="currentColor"
                        d="M17.4,6.2H0.6C0.3,6.2,0,5.9,0,5.5V4.1c0-0.4,0.3-0.7,0.6-0.7h16.9c0.3,0,0.6,0.3,0.6,0.7v1.4C18,5.9,17.7,6.2,17.4,6.2z M17.4,14.1H0.6c-0.3,0-0.6-0.3-0.6-0.7V12c0-0.4,0.3-0.7,0.6-0.7h16.9c0.3,0,0.6,0.3,0.6,0.7v1.4C18,13.7,17.7,14.1,17.4,14.1z"/>
                </svg>
              </span>
              <span className="navbar-toggler-toggled">
                <svg width="14" height="14" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                  <path fill="currentColor"
                        d="M11.5,9.5l5-5c0.2-0.2,0.2-0.6-0.1-0.9l-1-1c-0.3-0.3-0.7-0.3-0.9-0.1l-5,5l-5-5C4.3,2.3,3.9,2.4,3.6,2.6l-1,1 C2.4,3.9,2.3,4.3,2.5,4.5l5,5l-5,5c-0.2,0.2-0.2,0.6,0.1,0.9l1,1c0.3,0.3,0.7,0.3,0.9,0.1l5-5l5,5c0.2,0.2,0.6,0.2,0.9-0.1l1-1 c0.3-0.3,0.3-0.7,0.1-0.9L11.5,9.5z"/>
                </svg>
              </span>
            </span>
                    </button>

                    <div id="sidebarNavExample1" className=" card collapse navbar-collapse p-3">
                        <div className="p-2 p-lg-0">
                            <div class="mt-3 mt-lg-0">
                                <div className='border-bottom'>
                                    <button type="button" className="btn btn-xs btn-ghost-primary mb-2"
                                            onClick={() => this.props.handleCreateCourseGroup()}>
                                        <i className="fas fa-plus mr-2"></i>
                                        Create New Group
                                    </button>
                                </div>
                                {
                                    groupConversations.map(conversation => this.renderGroupConversation(conversation, messageNotificationMap))
                                }
                                {
                                    enrolledUsers.map(user => this.renderIndividualPerson(user, mappingPersonToConversation))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </>
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
