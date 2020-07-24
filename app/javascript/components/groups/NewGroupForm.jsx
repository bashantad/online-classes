import React from "react";
import PropTypes from 'prop-types';
import './Group.scss'

import Button from "@material-ui/core/Button";
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

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
        if(!!title) {
            conversationApi.createGroup(this.props.courseId, title)
                .then(res => res.json())
                .then(response => {
                    const errors = response.errors
                    if(errors) {
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
            <div className='card card-bordered create-group-form'>
            <form>
                <div className="form-group">
                    <label className="input-label" htmlFor="groupName">Enter a group name</label>
                    <input type="text" id="groupName" className="form-control" placeholder="John Doe" onChange={this.handleTitleChange} fullWidth={true}
                           error={hasError}
                           value={title}/>
                    {
                        hasError && this.renderError()
                    }
                </div>
            </form>
                <div className="flex-row">
                    <button className='btn btn-primary btn-sm'
                            color="primary"
                            disabled={disabled}
                            onClick={this.handleSendClick}>
                        Create
                    </button>
                    <button className='btn btn-ghost-danger btn-sm group-cancel justify-content-end'
                            onClick={this.handleCancelClick}>
                        Cancel
                    </button>
                </div>
            </div>
        );
    }
}

NewGroupForm.propTypes = {
    courseId: PropTypes.string.isRequired,
    handleSuccessGroupCreate: PropTypes.func.isRequired,
    handleCancelGroupCreate: PropTypes.func.isRequired,
};
