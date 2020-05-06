import React from 'react';
import { withRouter } from 'react-router';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Group from '@material-ui/icons/Group';

import courseApi from './courseApi';

const PEOPLE_IN_THE_CHAT = [
    'John Smith',
    'Bashanta Dahal',
    'Josh Aresty',
    'Prashant Khadka',
    'Brad Larsen',
    'Martin Patel',
    'George Regan',
    'Alex Kutcher'
];

export class PeopleInTheChat extends React.Component {
    state = {
        courseDetails: null,
    }
    componentDidMount() {
        courseApi.getById(this.props.match.params.id)
            .then(res => res.json())
            .then(courseDetails => {
                this.setState({courseDetails});
            });
    }
	render() {
        return (
			<ul className='people-list'>
                <li className='conversation-person'>
                    <Group /> <span>Classroom</span>
                </li>
                <li className='conversation-person'>
                    <Group /> <span>My group</span>
                </li>
                {
                    PEOPLE_IN_THE_CHAT.map((person, index) =>
                        <li className='conversation-person' key={`person-${index}`}>
                            <AccountCircleIcon /> <span> {person} </span>
                        </li>
                    )
                }
            </ul>
		);
	}
}

export default withRouter(PeopleInTheChat);
