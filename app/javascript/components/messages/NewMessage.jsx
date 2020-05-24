import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

import './NewMessage.scss';
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
		if(!!content) {
			chatApi.create(this.props.conversationId, content);
			this.setState({content: ''});
		}
	}
	render() {
		const disabled = this.props.conversationId === null;
		return (
			<div className='new-message-box-container'>
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
