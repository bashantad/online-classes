import React from "react";
import PropTypes from 'prop-types';
import './Group.scss'

import conversationApi from "../../apis/conversationApi";

export default class NewGroupForm extends React.Component {
    state = {
        title: '',
        errors: null,
    };

    handleTitleChange = (event) => {
        this.setState({
            title: event.target.value,
            errors: null,
        });
    }

    handleSendClick = () => {
        const {title} = this.state;
        if (!!title) {
            conversationApi.createGroup(this.props.courseId, title)
                .then(res => res.json())
                .then(response => {
                    const errors = response.errors
                    if (errors) {
                        this.setState({errors: errors})
                    } else {
                        this.setState({title: ''});
                        this.props.handleSuccessGroupCreate(response);
                    }
                });
        }
    }

    handleCancelClick = () => {
        this.props.handleCancelGroupCreate();
    }

    renderError = () => {
        return (
            <span className='error'>
                This title {this.state.errors.title[0]}
            </span>
        );
    }

    render() {
        const {title, errors} = this.state;
        const disabled = !title.trim();
        const hasError = !!errors;
        return (
            <div>
                <div className="form-group">
                    <input type="text" id="groupName" className="form-control" placeholder="Enter a group name"
                           onChange={this.handleTitleChange} value={title}/>
                    {
                        hasError && this.renderError()
                    }
                </div>
                <div className="float-right">
                    <button type="button" className="btn btn-white mr-3" data-dismiss="modal" onClick={() => this.props.handleModalClose()}>Cancel
                    </button>
                    <button type="button" className="btn btn-primary" disabled={disabled}
                            onClick={this.handleSendClick}>Create
                    </button>
                </div>
            </div>
        );
    }
}

NewGroupForm.propTypes = {
    courseId: PropTypes.string.isRequired,
    handleSuccessGroupCreate: PropTypes.func.isRequired,
};
