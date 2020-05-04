import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';

import './Chat.css';
import { DialogTitle, DialogContent } from '../components/chat/ChatStyle';
import PeopleInTheChat from '../components/chat/PeopleInTheChat';
import ConversationList from '../components/chat/ConversationList';
import NewMessage from '../components/chat/NewMessage';

export default class Chat extends React.Component {
    sendMessage = (message) => {
        console.log('send message to the server', message);
    }
    render() {
        const {open, handleClose} = this.props;
        return (
            <div>
                <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                    <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                        Computer science classroom
                    </DialogTitle>
                    <DialogContent dividers>
                        <Grid container spacing={1}>
                            <Grid item xs={4}>
                                <PeopleInTheChat />           
                            </Grid>
                            
                            <Grid item xs={8}>
                                <ConversationList />
                                <NewMessage sendMessage={this.sendMessage}/>
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
