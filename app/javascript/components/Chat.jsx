import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';

import './Chat.css';
import { DialogTitle, DialogContent } from '../components/chat/ChatStyle';
import PeopleInTheChat from '../components/chat/PeopleInTheChat';
import ActiveMessageArea from '../components/chat/ActiveMessageArea';
import NewMessage from '../components/chat/NewMessage';
import conversationApi from './chat/conversationApi';
import Cable from './chat/Cable';

export default class Chat extends React.Component {
    state = {
        conversations: [],
        activeConversationId: null
    };

    componentDidMount = () => {
        conversationApi.getAll()
            .then(res => res.json())
            .then(conversations => {
                // TODO find a mechanism to set the first active message or the remembered active pane
                const activeConversationId = conversations[0].id;
                this.setState({conversations, activeConversationId});
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
        const {conversations, activeConversationId} = this.state;
        const {open, handleClose} = this.props;
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
                <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                    <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                        Computer science classroom
                    </DialogTitle>
                    <DialogContent dividers>
                        <Grid container spacing={1}>
                            <Grid item xs={4}>
                                <PeopleInTheChat handleConversationClick={this.handleConversationClick} handlePersonClick={this.handlePersonClick}/>
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
