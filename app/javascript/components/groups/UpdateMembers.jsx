import React from 'react';
import PropTypes from 'prop-types';

import conversationApi from "../../apis/conversationApi";

export default class UpdateMembers extends React.Component {
    state = {
        enrolledUsersMap: {},
    };

    updateMembers = (userId) => {
        const {enrolledUsersMap} = this.state;
        if (enrolledUsersMap[userId]) {
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
            <div className="form-group" key={`add-members-${user.id}`}>
                <div className="custom-control custom-checkbox">
                    <input type="checkbox" id={user.id} value={user.id} className="custom-control-input"
                           onChange={() => this.updateMembers(user.id)} checked={enrolledUsersMap[user.id] === true}/>
                    <label className="custom-control-label" htmlFor={user.id}>{user.full_name}</label>
                </div>
            </div>
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
        if (prevProps.conversation !== conversation && conversation) {
            const enrolledUsersMap = this._getEnrolledUsersMap(conversation.conversation_enrolled_users);
            this.setState({enrolledUsersMap: enrolledUsersMap});
        }
    }

    _getEnrolledUsersMap = (users) => {
        if (users.length > 0) {
            return users.reduce((acc, item) => {
                acc[item.user_id] = true;
                return acc;
            }, {})
        } else {
            return {};
        }
    }

    render() {
        const {allUsers, currentUserId} = this.props;
        const {enrolledUsersMap} = this.state;
        return (
            <div className="card card-bordered create-group-form">
                <div className="card-header text-dark">
                    Select people you want to include in this group
                </div>
                <div className="card-body">
                    <ul>
                        {
                            allUsers.filter(user => user.id !== currentUserId).map(user => this.renderUser(user, enrolledUsersMap))
                        }
                    </ul>
                    <button type="button" className="btn btn-primary" onClick={this.handleSave} data-dismiss="modal">Save</button>
                </div>
            </div>
        )
    }
}

UpdateMembers.propTypes = {
    conversation: PropTypes.object.isRequired,
    courseId: PropTypes.string.isRequired,
    currentUserId: PropTypes.number.isRequired,
    allUsers: PropTypes.array.isRequired,
    handleUpdateMembersSuccess: PropTypes.func.isRequired,
};
