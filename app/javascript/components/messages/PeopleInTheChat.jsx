import React from 'react';
import PropTypes from 'prop-types';
import './PeopleInTheChat.scss';
import GroupSidebar from "./GroupSidebar";
import PersonSidebar from "./PersonSidebar";

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
                <PersonSidebar key={`person-${enrolledUser.id}-conversation-${conversationId}`}
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
            return <GroupSidebar key={`group-conversation-${id}`}
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
                            <span className="d-flex justify-content-end align-items-center">
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
                            {
                                this.renderGroupConversation(groupConversations)
                            }
                            <hr className='m-0'/>
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
