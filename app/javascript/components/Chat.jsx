import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';

import './Chat.css';
import { DialogTitle, DialogContent } from '../components/chat/ChatStyle';
import PeopleInTheChat from '../components/chat/PeopleInTheChat';
import ActiveMessageArea from '../components/chat/ActiveMessageArea';
import NewMessage from '../components/chat/NewMessage';
import courseApi from './chat/courseApi';
import Cable from './chat/Cable';

export class Chat extends React.Component {
    state = {
        conversations: [],
        activeConversationId: null,
        enrolledUsers: []
    };

    componentDidMount = () => {
        courseApi.getById(this.props.match.params.id)
            .then(res => res.json())
            .then(courseDetails => {
                const {conversations, enrolled_users} = courseDetails;
                const activeConversationId = conversations[0].id;
                this.setState({conversations, enrolledUsers: enrolled_users, activeConversationId});
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

    handleConversationClick = (conversationId) => {
        this.setState({activeConversationId: conversationId})
    }
    handlePersonClick = (personId) => {
        console.log('initiating chat with personId', personId);
    }
    render() {
        const {conversations, enrolledUsers, activeConversationId} = this.state;
        const {open, handleClose} = this.props;
        const peopleInTheChatProps = {
            conversations: conversations,
            enrolledUsers: enrolledUsers,
            handleConversationClick: this.handleConversationClick,
            handlePersonClick: this.handlePersonClick,
        };
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
                <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} fullWidth>
                    <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                        Computer science classroom
                    </DialogTitle>
                    <DialogContent dividers>
                        <Grid container spacing={1} className='chat-window'>
                            <Grid item xs={4}>
                                <PeopleInTheChat {...peopleInTheChatProps}/>
                            </Grid>

                            <Grid item xs={8}>
                                <ActiveMessageArea activeConversation={this.findActiveConversation()}/>
                                <NewMessage conversationId={activeConversationId}/>
                            </Grid>
                        </Grid>
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
};

Chat.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired
};

export default withRouter(Chat);
