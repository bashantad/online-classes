import React from 'react';
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

    handleMessageSendClick = (e) => {
        e.preventDefault();
        const {content} = this.state;
        if (!!content) {
            chatApi.create(this.props.conversationId, content);
            this.setState({content: ''});
        }
    }

    render() {
        const {content} = this.state;
        const disabled = !content.trim();

        return (
            <div className='new-message-box-container row'>
                <div className="col-md-10 col-12">
                    <form onSubmit={this.handleMessageSendClick}>
                        <div className="input-group-borderless position-relative">
                            <input onChange={this.handleMessageChange} value={content} type="textarea"
                                   id="exampleFormControlInput1" className="form-control  content-centered"
                                   placeholder="Type your message"/>
                        </div>
                    </form>
                </div>
                <div className="col-md-2 col-12 send-btn">
                    <div className='send-btn'>
                        <input
                            accept="image/*"
                            id="icon-button-file"
                            type="file"
                        />
                        <label htmlFor="icon-button-file">
                            <button type="button" className="btn btn-primary btn-pill btn-xs btn-icon mr-2" data-toggle="tooltip"
                                    data-placement="right" title="Attach File">
                                <i className="fas fa-paperclip"></i>
                            </button>
                        </label>
                        <button type="button" className="btn btn-pill btn-primary" disabled={disabled}
                                onClick={this.handleMessageSendClick}>
                            <i className="fas fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

NewMessage.propTypes = {
    conversationId: PropTypes.number,
}
