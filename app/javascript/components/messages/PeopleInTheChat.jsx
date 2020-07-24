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
            <div
                className={this.getActiveClass((conversationId)) ? "list-group people aside-active" : "list-group people"}>
                <a type='button' className="ml-2 mr-2 p-2"
                   key={`person-${user.id}-conversation-${conversationId}`}
                   onClick={() => this.handleUserClick(mappingPersonToConversation, user.id)}
                >
                    <div className="p-2 row align-items-center">
                        <div className="col-2">
                            <span>
                            {
                                imageUrl ?
                                    <img className="avatar-img" src={imageUrl} alt="Image Description"/>
                                    : <i className="fas fa-user-circle fa-2x list-group-icon mr-4"></i>
                            }
                        </span>
                        </div>
                        <div className="col-10">
                            <span className='mt-2 text-dark'>{full_name}</span>
                            {this.renderNotification(conversationId)}
                        </div>
                    </div>
                </a>
            </div>
        );
    }

    renderNotification = (conversationId) => {
        const {messageNotificationMap} = this.props;
        return (
            messageNotificationMap[conversationId] &&
            <span
                className="badge badge-pill badge-primary no-of-messages"> {messageNotificationMap[conversationId].length}</span>
        );
    }

    renderGroupConversation = (conversation) => {
        const {title, id} = conversation;
        return (
            <div
                className={this.getActiveClass((id)) ? "list-group border-bottom people aside-active" : "list-group border-bottom people"}>
                <a type='button' className="ml-2 mr-2 p-2"
                   key={id}
                   onClick={() => this.handleConversationClick(id)}>
                    <div className="p-2 row align-items-center">
                        <div className="col-2">
                            <span>
                            <i className="fas fa-users fa-2x mr-2"></i>
                        </span>
                        </div>
                        <div className="col-10">
                            <span className='mt-2 text-dark'>{title}</span>
                            {this.renderNotification(id)}
                        </div>
                    </div>
                </a>
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
                            data-target="#peopleInChat">
                            <span className="d-flex justify-content-between align-items-center">
                              <span className="h5 mb-0">Chat</span>
                               <span className="navbar-toggler-default mr-3">
                                <i className="fas fa-xs fa-bars"></i>
                              </span>
                          <span className="navbar-toggler-toggled mr-3">
                                 <i className="fas fa-xs fa-times"></i>
                              </span>
                            </span>
                    </button>

                    <div id="peopleInChat" className="collapse navbar-collapse">
                        <div>
                            <div>
                                <div className='border-bottom aside-header'>
                                    <span className='h5 text-dark ml-4'>Messages</span>
                                    <button type="button" className="btn btn-xs btn-outline-primary mt-2 mb-2 mr-4 "
                                            onClick={() => this.props.handleCreateCourseGroup()}>
                                        <i className="fas fa-user-plus mr-2"></i>
                                        Create New Group
                                    </button>
                                </div>
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
