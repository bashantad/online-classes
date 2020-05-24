import React from "react";
import PropTypes from 'prop-types';

import Button from "@material-ui/core/Button";
import Input from '@material-ui/core/Input';
import conversationApi from "../../apis/conversationApi";
import './Group.scss'

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
            <div className='create-group-form'>
                <div className='input-box'>
                    <Input className='new-group-input'
                           placeholder='Enter your group name'
                           onChange={this.handleTitleChange}
                           fullWidth={true}
                           error={hasError}
                           value={title} />
                    {
                        hasError && this.renderError()
                    }
                </div>
                <Button variant="contained"
                        color="primary"
                        disabled={disabled}
                        onClick={this.handleSendClick}>
                    Create
                </Button>
                <Button variant="contained"
                        onClick={this.handleCancelClick}>
                    Cancel
                </Button>
            </div>
        );
    }
}

NewGroupForm.propTypes = {
    courseId: PropTypes.string.isRequired,
    handleSuccessGroupCreate: PropTypes.func.isRequired,
    handleCancelGroupCreate: PropTypes.func.isRequired,
};
