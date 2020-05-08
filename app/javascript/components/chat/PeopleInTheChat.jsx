import React from 'react';
import PropTypes from 'prop-types';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Group from '@material-ui/icons/Group';

import courseApi from './courseApi';

export default class PeopleInTheChat extends React.Component {
    render() {
        const {conversations, enrolledUsers} = this.props;
        const groupConversations = conversations.filter(conv => conv.is_group);
        const personalConversations = conversations.filter(conv => !conv.is_group);
        const personalConversationMap = personalConversations.reduce((accumulator, conversation) => {
            conversation.conversation_users.forEach((convUser) => {
                accumulator[convUser.user_id] = convUser.conversation_id
            })
            return accumulator;
        }, {});
        const {handleConversationClick, handlePersonClick} = this.props;
        return (
			<ul className='people-list'>
                {
                    groupConversations.map((conversation) => (
                        <li className='conversation-person' key={conversation.id} onClick={() => handleConversationClick(conversation.id)}>
                            <Group /> <span> {conversation.title}</span>
                        </li>
                    ))
                }
                {
                    enrolledUsers.map((person) =>
                        <li className='conversation-person' key={`person-${person.id}`} onClick={() => handlePersonClick(person.id)}>
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
    conversations: PropTypes.array.isRequired,
    enrolledUsers: PropTypes.array.isRequired,
};
