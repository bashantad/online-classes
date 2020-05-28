import React from 'react';
import { withRouter } from 'react-router';
import Grid from '@material-ui/core/Grid';

import './message.scss';
import PeopleInTheChat from '../components/messages/PeopleInTheChat';
import ActiveMessageArea from '../components/messages/ActiveMessageArea';
import NewMessage from '../components/messages/NewMessage';
import courseApi from '../apis/courseApi';
import conversationApi from '../apis/conversationApi';
import userApi from '../apis/userApi';
import Cable from './messages/Cable';
import NewGroupForm from "./groups/NewGroupForm";
import UpdateMembers from "./groups/UpdateMembers";

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
        showNewGroupForm: false,
        showUpdateMembers: false,
    };

    _getCourseId = () => {
        return this.props.match.params.course_id;
    }

    componentDidMount = () => {
        userApi.getCurrentUserInfo()
        .then(res => res.json())
        .then(user => {
            const {id, full_name, enrolled_courses, user_message_notifications, conversations} = user;
            this.setState({
                fullName: full_name,
                currentUserId: id,
                enrolledCourses: enrolled_courses,
                individualConversations: conversations,
                conversations: [...this.state.conversations, ...conversations],
                messageNotificationMap: user_message_notifications
            })
        });
        courseApi.getById(this._getCourseId())
            .then(res => res.json())
            .then(courseDetails => {
                const {conversations, enrolled_users, name} = courseDetails;
                this.setState({
                    groupConversations: conversations,
                    conversations: [...this.state.conversations, ...conversations],
                    enrolledUsers: enrolled_users,
                    activeConversationId: conversations[0].id,
                    courseName: name,
                 });
            });
    }

    handleReceivedMessage = (response) => {
        const {message} = response;
        const {user_message_notifications} = message;
        const {conversations, messageNotificationMap, activeConversationId} = this.state;
        const conversation = conversations.find(
            item => item.id === message.conversation_id
        );

        if(activeConversationId === conversation.id) {
            userApi.markMessagesRead(conversation.id);
        } else {
            messageNotificationMap[conversation.id] = messageNotificationMap[conversation.id] || [];
            messageNotificationMap[conversation.id] = messageNotificationMap[conversation.id].concat(user_message_notifications[conversation.id])
        }
        conversation.messages = [...conversation.messages, message];
        this.setState({conversations, messageNotificationMap});
    }

    handleSuccessGroupCreate = (conversation) => {
        let newAttributes = {
            conversations: [...this.state.conversations, conversation],
            showUpdateMembers: true,
            showNewGroupForm: false,
            activeConversationId: conversation.id,
        };
        if(conversation.is_group) {
            newAttributes.groupConversations = {...this.state.groupConversations, conversation};
        } else {
            newAttributes.individualConversations = {...this.state.individualConversations, conversation};
        }
        this.setState(newAttributes);
    }

    handleCancelGroupCreate = () => {
        this.setState({
            showUpdateMembers: false,
            showNewGroupForm: false,
        })
    }

    handleUpdateMembersSuccess = (conversation) => {
        this.setState({
            showUpdateMembers: false,
            activeConversationId: conversation.id
        });
    }

    findActiveConversation = () => {
        return this.state.conversations.find(
            conversation => conversation.id === this.state.activeConversationId
        );
    }

    handleConversationClick = (conversationId) => {
        const {messageNotificationMap} = this.state;
        const hasUnreadMessages = !!messageNotificationMap[conversationId];
        delete messageNotificationMap[conversationId];
        this.setState({activeConversationId: conversationId, messageNotificationMap, showNewGroupForm: false, showUpdateMembers: false});
        hasUnreadMessages && userApi.markMessagesRead(conversationId);
    }

    handleCreateCourseGroup = () => {
        this.setState({
            showNewGroupForm: true
        })
    }

    handleUserClick = (userId) => {
        conversationApi.create(this._getCourseId(), userId)
            .then(res => res.json())
            .then(conversation => {
                const updateAttributes = {
                    activeConversationId: conversation.id
                };
                const doesConversationExist = this.state.conversations.some(item => item.id === conversation.id);
                if(!doesConversationExist) {
                    const conversations = [...this.state.conversations, conversation];
                    updateAttributes.conversations = conversations;
                }
                this.setState(updateAttributes);
            });
    }
    render() {
        const {
            conversations,
            enrolledUsers,
            activeConversationId,
            courseName,
            messageNotificationMap,
            currentUserId,
            individualConversations,
            fullName,
            showNewGroupForm,
            showUpdateMembers
        } = this.state;

        const peopleInTheChatProps = {
            conversations: conversations,
            individualConversations: individualConversations,
            enrolledUsers: enrolledUsers,
            activeConversationId: activeConversationId,
            currentUserId: currentUserId,
            messageNotificationMap: messageNotificationMap,
            handleConversationClick: this.handleConversationClick,
            handleUserClick: this.handleUserClick,
            handleCreateCourseGroup: this.handleCreateCourseGroup,
        };
        const activeConversation = this.findActiveConversation();

        return (
            <div>
                {
                    conversations.length ?
                    <Cable
                        conversations={conversations}
                        handleReceivedMessage={this.handleReceivedMessage}
                    />
                    : null
                }
                <div>
                    <div className='message-header'>
                        {fullName} - {courseName}
                    </div>
                    <div className='message-body'>
                        <Grid container spacing={1} className='chat-window'>
                            <Grid item xs={3} className="chat-left-panel">
                                <PeopleInTheChat {...peopleInTheChatProps}/>
                            </Grid>
                            <Grid item xs={9}>
                                {
                                    showNewGroupForm || showUpdateMembers ?
                                        <div>
                                            {
                                                showNewGroupForm ?
                                                    <NewGroupForm
                                                        courseId={this._getCourseId()}
                                                        handleSuccessGroupCreate={this.handleSuccessGroupCreate}
                                                        handleCancelGroupCreate={this.handleCancelGroupCreate} />
                                                    : <UpdateMembers
                                                        courseId={this._getCourseId()}
                                                        allUsers={enrolledUsers}
                                                        conversation={activeConversation}
                                                        handleUpdateMembersSuccess={this.handleUpdateMembersSuccess}/>
                                            }
                                        </div>
                                        : <div>
                                            <ActiveMessageArea activeConversation={activeConversation} currentUserId={currentUserId}/>
                                            <NewMessage conversationId={activeConversationId}/>
                                        </div>
                                }
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Message);
