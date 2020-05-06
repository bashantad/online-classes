import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Group from '@material-ui/icons/Group';

import courseApi from './courseApi';

export class PeopleInTheChat extends React.Component {
    state = {
        conversations: [],
        enrolled_users: [],
    }
    componentDidMount() {
        courseApi.getById(this.props.match.params.id)
            .then(res => res.json())
            .then(courseDetails => {
                const {conversations, enrolled_users} = courseDetails;
                this.setState({conversations, enrolled_users});
            });
    }
    render() {
        const {conversations, enrolled_users} = this.state;
        return (
			<ul className='people-list'>
                {
                    conversations.map((conversation) => (
                        <li className='conversation-person' key={conversation.id} onClick={() => this.props.handleConversationClick(conversation.id)}>
                            <Group /> <span> {conversation.title}</span>
                        </li>
                    ))
                }
                {
                    enrolled_users.map((person) =>
                        <li className='conversation-person' key={`person-${person.id}`} onClick={() => this.props.handlePersonClick(person.id)}>
                            <AccountCircleIcon /> <span> {person.full_name} </span>
                        </li>
                    )
                }
            </ul>
		);
	}
}

PeopleInTheChat.propTypes = {
    handleConversationClick: PropTypes.func.isRequired,
    handlePersonClick: PropTypes.func.isRequired,
}

export default withRouter(PeopleInTheChat);
