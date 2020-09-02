import React from 'react';
import {withRouter} from 'react-router';
import {ActionCable} from "react-actioncable-provider";
import './messages/message.scss';
import PeopleInTheChat from '../components/messages/PeopleInTheChat';
import ActiveMessageArea from '../components/messages/ActiveMessageArea';
import NewMessage from '../components/messages/NewMessage';
import GroupModal from "./groups/GroupModal";
import Cable from './messages/Cable';

import conversationApi from '../apis/conversationApi';
import userApi from '../apis/userApi';

const userIdToNameMapping = (users) => {
    return users.reduce((acc, user) => {
        acc[user.id] = user.full_name;
        return acc;
    }, {});
}

export class Message extends React.Component {
    state = {
        groupConversations: [],
        individualConversations: [],
        conversations: [],
        activeConversationId: null,
        enrolledUsers: [],
        courseName: null,
        fullName: null,
        currentUserId: null,
        enrolledCourses: [],
        messageNotificationMap: {},
        showGroupModal: false,
        groupUpdate: false,
    };

    _getCourseId = () => {
        return this.props.match.params.course_id;
    }

    _getConversationId = () => {
        return Number(this.props.match.params.conversation_id);
    }

    componentDidMount = () => {
        conversationApi.getAllByCourseId(this._getCourseId())
            .then(res => res.json())
            .then(response => {
                const {course_details, group_conversations, individual_conversations, user_details} = response;
                const {id, full_name, enrolled_courses, user_message_notifications} = user_details;
                const {title, enrolled_users} = course_details;
                const conversations = [...individual_conversations, ...group_conversations];
                this.setState({
                    fullName: full_name,
                    currentUserId: id,
                    enrolledCourses: enrolled_courses,
                    individualConversations: individual_conversations,
                    groupConversations: group_conversations,
                    conversations: conversations,
                    messageNotificationMap: user_message_notifications,
                    enrolledUsers: enrolled_users,
                    courseName: title,
                })
                this.fetchActiveMessages();
            });
    }

    handleReceivedMessage = (response) => {
        const {message} = response;
        const {user_message_notifications} = message;
        const {messageNotificationMap, activeConversationId} = this.state;
        const conversations = [...this.state.conversations];
        const conversation = conversations.find(
            item => item.id === message.conversation_id
        );
        if (activeConversationId === conversation.id) {
            userApi.markMessagesRead(conversation.id);
        } else {
            messageNotificationMap[conversation.id] = messageNotificationMap[conversation.id] || [];
            messageNotificationMap[conversation.id] = messageNotificationMap[conversation.id].concat(user_message_notifications[conversation.id])
        }
        conversation.messages = [...conversation.messages, message];
        this.setState({conversations, messageNotificationMap});
    }

    handleGroupUpdate = () => {
        this.setState({showGroupModal: true, groupUpdate: true});
        console.log('asdsa')
    }

    closeGroupModal = () => {
        this.setState({showGroupModal: false, groupUpdate: false});
    }

    openGroupModal = () => {
        this.setState({showGroupModal: true});
    }

    closeModalAndNavigateToConversation = (conversation) => {
        this.closeGroupModal();
        this.navigateToConversation(conversation.id);
    }

    findActiveConversation = () => {
        return this.state.conversations.find(
            conversation => conversation.id === this.state.activeConversationId
        );
    }

    componentDidUpdate(prevProps) {
        const {activeConversationId, showUpdateMembers} = this.state;
        if (activeConversationId === null || showUpdateMembers === true) return;
        if (activeConversationId !== this._getConversationId()) {
            this.fetchActiveMessages();
        }
    }

    navigateToConversation = (conversationId) => {
        this.props.history.push(`/courses/${this._getCourseId()}/conversations/${conversationId}/messages`);
    }

    fetchActiveMessages = () => {
        const conversationId = this._getConversationId();
        conversationApi.getMessages(this._getCourseId(), conversationId)
            .then(res => res.json())
            .then(response => {
                const {conversation_enrolled_users, messages} = response;
                const activeConversation = this.state.conversations.find(conversation => conversation.id === this._getConversationId());
                const updateAttributes = {activeConversationId: activeConversation.id};
                activeConversation.messages = messages;
                activeConversation.conversation_enrolled_uers = conversation_enrolled_users;
                this._assignConversation(updateAttributes, activeConversation);
                this._assignMessageNotificationMap(updateAttributes, conversationId);
                this.setState(updateAttributes);
            });
    }

    _assignConversation = (updateAttributes, activeConversation) => {
        const doesConversationExist = this.state.conversations.some(item => item.id === activeConversation.id);
        if (!doesConversationExist) {
            const conversations = [...this.state.conversations, activeConversation];
            updateAttributes.conversations = conversations;
        }
        return updateAttributes;
    }

    _assignMessageNotificationMap = (updateAttributes, conversationId) => {
        const {messageNotificationMap} = this.state;
        const hasUnreadMessages = !!messageNotificationMap[conversationId];
        delete messageNotificationMap[conversationId];
        updateAttributes.messageNotificationMap = messageNotificationMap;
        hasUnreadMessages && userApi.markMessagesRead(conversationId);
    }

    handleReceivedConversation = (response) => {
        const {conversation} = response;
        const newAttributes = {
            conversations: [...this.state.conversations, conversation]
        };
        if (conversation.is_group) {
            newAttributes.groupConversations = [...this.state.groupConversations, conversation];
        } else {
            newAttributes.individualConversations = [...this.state.individualConversations, conversation];
        }
        this.setState(newAttributes);
    }

    handleUserClick = (userId) => {
        conversationApi.create(this._getCourseId(), userId)
            .then(res => res.json())
            .then(conversation => {
                const updateAttributes = this._assignConversation({}, conversation);
                this.setState(updateAttributes);
                this.props.history.push(conversation.message_url);
            });
    }

    render() {
        const {
            conversations,
            enrolledUsers,
            activeConversationId,
            messageNotificationMap,
            currentUserId,
            individualConversations,
            showGroupModal,
            groupUpdate
        } = this.state;
        const sidebarProps = {
            conversations: conversations,
            individualConversations: individualConversations,
            enrolledUsers: enrolledUsers,
            activeConversationId: activeConversationId,
            currentUserId: currentUserId,
            messageNotificationMap: messageNotificationMap,
            handleConversationClick: this.navigateToConversation,
            handleUserClick: this.handleUserClick,
        };
        const activeConversation = this.findActiveConversation();
        return (
            <>
                <div className="main-layout">
                    <aside className='col-lg-3 col-xl-3 border-right border-top p-0 bg-white people-in-chat chat-body'>
                        <div className='border-bottom aside-header'>
                            <span className='h3 text-dark font-weight-bold ml-4 mt-2'>Chats</span>
                            <button type="button"
                                    className="btn btn-xs btn-pill btn-outline-primary mt-2 mb-2 mr-4 "
                                    onClick={() => this.openGroupModal()} data-toggle="modal"
                                    data-target="#groupModal">
                                <i className="fas fa-users mr-1"></i>Create New Group
                            </button>
                        </div>
                        <PeopleInTheChat {...sidebarProps}/>
                    </aside>
                    <main className='col-lg-9 col-xl-9 main-content border-top p-0'>
                        <div className="chats">
                            <div className="chat-body">
                                <div>
                                    <ActionCable
                                        channel={{channel: 'ConversationChannel'}}
                                        onReceived={this.handleReceivedConversation}
                                    />
                                    {
                                        conversations.length ?
                                            <Cable
                                                conversations={conversations}
                                                handleReceivedMessage={this.handleReceivedMessage}
                                            />
                                            : null
                                    }
                                    <GroupModal courseId={this._getCourseId()}
                                                currentUserId={currentUserId}
                                                showGroupModal={showGroupModal}
                                                activeConversation={activeConversation}
                                                enrolledUsers={enrolledUsers}
                                                groupUpdate={groupUpdate}
                                                closeGroupModal={this.closeGroupModal}
                                                closeModalAndNavigateToConversation={this.closeModalAndNavigateToConversation}/>
                                    <div className="chat-content">
                                        <ActiveMessageArea
                                            activeConversation={activeConversation}
                                            currentUserId={currentUserId}
                                            userIdToNameMapping={userIdToNameMapping(enrolledUsers)}
                                            handleGroupUpdate={this.handleGroupUpdate}
                                        />
                                    </div>
                                    <div className="chat-footer border-top">
                                        <NewMessage conversationId={activeConversationId}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </>
        );
    }
}

export default withRouter(Message);
