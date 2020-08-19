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
                <div className="col-sm-1 col-3 custom-align-center flex-nowrap bg-light attachments">
                    {/*<input*/}
                    {/*    accept="image/*"*/}
                    {/*    id="icon-button-file"*/}
                    {/*    type="file"*/}
                    {/*/>*/}
                    <label htmlFor="icon-button-file">
                        <button type="button" className="btn btn-outline-primary btn-pill btn-xs btn-icon m-1 mt-3" data-toggle="tooltip"
                                data-placement="right" title="Attach File">
                            <i className="fas fa-paperclip"></i>
                        </button>
                    </label>
                </div>
                <div className="col-sm-10 col-6">
                    <form onSubmit={this.handleMessageSendClick}>
                        <div className="input-group-borderless position-relative">
                            <input onChange={this.handleMessageChange} value={content} type="textarea"
                                   id="exampleFormControlInput1" className="form-control bg-light content-centered"
                                   placeholder="Type your message"/>
                        </div>
                    </form>
                </div>
                <div className="col-sm-1 col-3 custom-align-center">
                        <button type="button" className="btn btn-pill btn-primary" disabled={disabled}
                                onClick={this.handleMessageSendClick}>
                            <i className="fas fa-paper-plane"></i>
                        </button>
                </div>
            </div>
        );
    }
}

NewMessage.propTypes = {
    conversationId: PropTypes.number,
}
