import React from 'react';
import PropTypes from 'prop-types';
import './PeopleInTheChat.scss';
import Group from "./Group";
import Person from "./Person";

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

    getActiveClass = (conversationId) => {
        return conversationId === this.props.activeConversationId;
    }

    renderIndividualConversation = (enrolledUsers, mappingPersonToConversation) => {
        return enrolledUsers.map((enrolledUser) => {
            const conversationId = mappingPersonToConversation[enrolledUser.id];
            const {avatar_image_urls, full_name} = enrolledUser;
            const imageUrl = avatar_image_urls["60x40"];
            return (
                <Person key={`person-${enrolledUser.id}-conversation-${conversationId}`}
                        activeClass={this.getActiveClass((conversationId))}
                        imageUrl={imageUrl}
                        fullName={full_name}
                        noOfMessages={this._getNumberOfMessages(conversationId)}
                        handleUserClick={() => this.handleUserClick(mappingPersonToConversation, enrolledUser.id)}/>
            );
        })
    }

    _getNumberOfMessages = (conversationId) => {
        const num = this.props.messageNotificationMap[conversationId];
        if(!!num) {
            return num.length;
        } else {
            return 0;
        }
    }

    renderGroupConversation = (groupConversations) => {
        return groupConversations.map(conversation => {
            const {title, id} = conversation;
            return <Group key={`group-conversation-${id}`}
                          activeClass={this.getActiveClass((id))}
                          noOfMessages={this._getNumberOfMessages(id)}
                          title={title}
                          handleConversationClick={() => this.handleConversationClick(id)} />
        });
    }

    render() {
        const {conversations, enrolledUsers, individualConversations} = this.props;
        const groupConversations = conversations.filter(conv => conv.is_group);
        const mappingPersonToConversation = getMappingPersonToConversation(individualConversations);

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
                                <span className="h5 mb-0">
                                    Chat
                                </span>
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
                                this.renderGroupConversation(groupConversations)
                            }
                            {
                                this.renderIndividualConversation(enrolledUsers, mappingPersonToConversation)
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

function getMappingPersonToConversation(individualConversations, currentUserId) {
    const currentUserMapping = {};
    const mapping = individualConversations.reduce((accumulator, conversation) => {
        const conversationEnrolledUsers = conversation.conversation_enrolled_users;
        if (conversationEnrolledUsers.length === 1) {
            const conversationEnrolledUser = conversationEnrolledUsers[0];
            currentUserMapping[conversationEnrolledUser.user_id] = conversationEnrolledUser.conversation_id;
        }
        conversationEnrolledUsers.forEach((convUser) => {
            if (convUser.user_id !== currentUserId) {
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
