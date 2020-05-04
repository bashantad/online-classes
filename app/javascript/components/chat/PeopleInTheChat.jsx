import React from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Group from '@material-ui/icons/Group';

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

export default class PeopleInTheChat extends React.Component {
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
