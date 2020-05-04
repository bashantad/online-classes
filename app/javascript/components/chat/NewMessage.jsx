import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

export default class NewMessage extends React.Component {
	state = {
		message: ''
	};

	handleMessageChange = (event) => {
		this.setState({message: event.target.value});
	}

	handleMessageSendClick = () => {
		this.props.sendMessage({
			message: this.state.message
		});
		this.setState({message: ''});
	}
	render() {
		return (
			<div className='message-box'>
                <textarea className='message-input' placeholder='Type your message' onChange={this.handleMessageChange} value={this.state.message}></textarea>
                <Button variant="contained" color="primary" onClick={this.handleMessageSendClick}>
                 	Send
            	</Button>
            </div>
		);
	}
}

NewMessage.propTypes = {
	sendMessage: PropTypes.func.isRequired,
};
