import React from 'react';
import {withRouter} from 'react-router';
import {Link} from "react-router-dom";

import './message.scss';

import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';

import PeopleInTheChat from '../components/messages/PeopleInTheChat';
import ActiveMessageArea from '../components/messages/ActiveMessageArea';
import NewMessage from '../components/messages/NewMessage';
import Cable from './messages/Cable';
import NewGroupForm from "./groups/NewGroupForm";
import UpdateMembers from "./groups/UpdateMembers";

import courseApi from '../apis/courseApi';
import conversationApi from '../apis/conversationApi';
import userApi from '../apis/userApi';
import Header from "./Header";

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
        showNewGroupForm: false,
        showUpdateMembers: false,
        mobileOpen: false,
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
                const {conversations, enrolled_users, title} = courseDetails;
                this.setState({
                    groupConversations: conversations,
                    conversations: [...this.state.conversations, ...conversations],
                    enrolledUsers: enrolled_users,
                    activeConversationId: conversations[0].id,
                    courseName: title,
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

        if (activeConversationId === conversation.id) {
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
        if (conversation.is_group) {
            newAttributes.groupConversations = {...this.state.groupConversations, conversation};
        } else {
            newAttributes.individualConversations = {...this.state.individualConversations, conversation};
        }
        this.setState(newAttributes);
    }

    handleGroupUpdate = (conversation) => {
        this.setState({
            showUpdateMembers: true,
            showNewGroupForm: false,
        });
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
        this.setState({
            activeConversationId: conversationId,
            messageNotificationMap,
            showNewGroupForm: false,
            showUpdateMembers: false
        });
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
                if (!doesConversationExist) {
                    const conversations = [...this.state.conversations, conversation];
                    updateAttributes.conversations = conversations;
                }
                this.setState(updateAttributes);
            });
    }

    handleDrawerToggle = () => {
        this.setState({
            mobileOpen: !this.state.mobileOpen
        })
    };

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
                <div >
                    <CssBaseline/>
                    <Header fullName={fullName} courseName={courseName}/>
                    <Hidden>
                        <nav>
                            <Hidden smUp implementation="css">
                                <Drawer
                                    variant="temporary"
                                    anchor={'left'}
                                    open={this.state.mobileOpen}
                                    onClose={this.handleDrawerToggle}
                                    ModalProps={{
                                        keepMounted: true, // Better open performance on mobile.
                                    }}
                                >
                                    <PeopleInTheChat {...peopleInTheChatProps} handleClick={this.handleDrawerToggle}/>
                                </Drawer>
                            </Hidden>
                        </nav>
                    </Hidden>
                    <Hidden xsDown><PeopleInTheChat {...peopleInTheChatProps}/></Hidden>

                    <main className='content'>
                        {
                            showNewGroupForm || showUpdateMembers ?
                                <div>
                                    {
                                        showNewGroupForm ?
                                            <NewGroupForm
                                                courseId={this._getCourseId()}
                                                handleSuccessGroupCreate={this.handleSuccessGroupCreate}
                                                handleCancelGroupCreate={this.handleCancelGroupCreate}/>
                                            : <UpdateMembers
                                                courseId={this._getCourseId()}
                                                allUsers={enrolledUsers}
                                                conversation={activeConversation}
                                                handleUpdateMembersSuccess={this.handleUpdateMembersSuccess}/>
                                    }
                                </div>
                                : <div>
                                    <div className='message-body'>
                                        <Toolbar/>
                                        <div className='message-main'>
                                            <ActiveMessageArea
                                                activeConversation={activeConversation}
                                                currentUserId={currentUserId}
                                                handleDrawerToggle={this.handleDrawerToggle}
                                                userIdToNameMapping={userIdToNameMapping(enrolledUsers)}
                                                handleGroupUpdate={this.handleGroupUpdate}
                                            />
                                        </div>
                                        <div className='message-text'>
                                            <NewMessage conversationId={activeConversationId}/>
                                        </div>
                                    </div>
                                </div>
                        }
                    </main>
                </div>
            </div>
        );
    }
}

export default withRouter(Message);
