import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

import chatApi from './chatApi';

export default class NewMessage extends React.Component {
	state = {
		content: ''
	};

	handleMessageChange = (event) => {
		this.setState({content: event.target.value});
	}

	handleMessageSendClick = () => {
		chatApi.create(this.props.conversationId, this.state.content);
		this.setState({content: ''});
	}
	render() {
		const disabled = this.props.conversationId === null;
		return (
			<div className='message-box'>
                <textarea className='message-input' placeholder='Type your message' onChange={this.handleMessageChange} value={this.state.content}></textarea>
                <Button variant="contained" color="primary" disabled={disabled} onClick={this.handleMessageSendClick}>
                 	Send
            	</Button>
            </div>
		);
	}
}

NewMessage.propTypes = {
	conversationId: PropTypes.number,
}
