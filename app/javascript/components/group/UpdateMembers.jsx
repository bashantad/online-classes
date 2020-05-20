import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';
import Button from "@material-ui/core/Button";
import conversationApi from "../chat/conversationApi";

export default class UpdateMembers extends React.Component {
    state = {
        enrolledUsersMap: {},
    };

    updateMembers = (userId) => {
        const {enrolledUsersMap} = this.state;
        if(enrolledUsersMap[userId]) {
            delete enrolledUsersMap[userId];
        } else {
            enrolledUsersMap[userId] = true;
        }
        this.setState({
            enrolledUsersMap: enrolledUsersMap
        });
    }

    renderUser = (user, enrolledUsersMap) => {
        return (
            <li className='enroll-user' key={`add-members-${user.id}`}>
                <Checkbox
                    onChange={() => this.updateMembers(user.id)}
                    value={user.id}
                    checked={enrolledUsersMap[user.id] === true}
                />
                {user.full_name}
            </li>
        );
    }
    handleSave = () => {
        const {courseId, conversation} = this.props;
        conversationApi.updateMembers(courseId, conversation.id, Object.keys(this.state.enrolledUsersMap))
            .then(res => res.json())
            .then(res => {
                this.props.handleUpdateMembersSuccess(conversation);
            });
    }

    componentDidUpdate(prevProps) {
        const {conversation} = this.props;
        if(prevProps.conversation !== conversation && conversation) {
            const enrolledUsersMap = this._getEnrolledUsersMap(conversation.conversation_enrolled_users);
            this.setState({enrolledUsersMap: enrolledUsersMap});
        }
    }

    _getEnrolledUsersMap = (users) => {
        if(users.length > 0) {
            return users.reduce((acc, item) => {
                acc[item.user_id] = true;
                return acc;
            }, {})
        } else {
            return {};
        }
    }
    render() {
        const {allUsers} = this.props;
        const {enrolledUsersMap} = this.state;
        return (
            <div>
                <ul>
                    {
                        allUsers.map(user => this.renderUser(user, enrolledUsersMap))
                    }
                </ul>
                <Button variant="contained"
                        color="primary"
                        onClick={this.handleSave}>
                    Save
                </Button>
            </div>
        )
    }
}

UpdateMembers.propTypes = {
    conversation: PropTypes.object.isRequired,
    courseId: PropTypes.string.isRequired,
    allUsers: PropTypes.array.isRequired,
    handleUpdateMembersSuccess: PropTypes.func.isRequired,
};
