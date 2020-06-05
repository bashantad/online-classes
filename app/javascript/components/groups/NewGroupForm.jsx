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
            <Container maxWidthSm>
                <Toolbar/>
                <Paper className='create-group-form'>
                <div className='input-box'>
                    <TextField  className='new-group-input'
                           label="Enter a group name" variant="outlined"
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
                <Button color="secondary"
                        onClick={this.handleCancelClick}>
                    Cancel
                </Button>
                </Paper>
            </Container>
        );
    }
}

NewGroupForm.propTypes = {
    courseId: PropTypes.string.isRequired,
    handleSuccessGroupCreate: PropTypes.func.isRequired,
    handleCancelGroupCreate: PropTypes.func.isRequired,
};
