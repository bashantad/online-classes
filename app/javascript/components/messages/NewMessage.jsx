import React from 'react';
import PropTypes from 'prop-types';
import './NewMessage.scss';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import chatApi from '../../apis/chatApi';

export default class NewMessage extends React.Component {
    state = {
        content: ''
    };

    handleMessageChange = (event) => {
        this.setState({content: event.target.value});
    }

    handleMessageSendClick = () => {
        const {content} = this.state;
        if (!!content) {
            chatApi.create(this.props.conversationId, content);
            this.setState({content: ''});
        }
    }

    render() {
        const disabled = this.props.conversationId === null;
        return (
            <Paper className='new-message-box-container'>
                {/*<textarea className='message-input'*/}
                {/*		  placeholder='Type your message'*/}
                {/*		  onChange={this.handleMessageChange}*/}
                {/*		  value={this.state.content}></textarea>*/}
                <TextField id="outlined-basic" label="Type your message" variant="outlined" multiline
                           rowsMax={4} onChange={this.handleMessageChange} value={this.state.content}>/></TextField>
                <div className='send-btn'>
                    <Button variant="contained" color="primary" disabled={disabled} endIcon={<SendRoundedIcon/>}
                            onClick={this.handleMessageSendClick}>
                        Send
                    </Button>
                </div>

            </Paper>
        );
    }
}

NewMessage.propTypes = {
    conversationId: PropTypes.number,
}
