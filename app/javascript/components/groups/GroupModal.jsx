import React from "react";
import PropTypes from "prop-types";
import NewGroupForm from "./NewGroupForm";
import UpdateMembers from "./UpdateMembers";

class GroupModal extends React.Component {
    state = {
        updateMembers: false,
        conversation: null,
    }

    handleSuccessGroupCreate = (conversation) => {
        this.setState({updateMembers: true, conversation: conversation});
    }

    handleCancelGroupCreate = () => {
        this.props.closeGroupModal();
    }

    handleUpdateMembersSuccess = (conversation) => {
        this.props.closeModalAndNavigateToConversation(conversation)
    }

    render() {
        const {currentUserId, enrolledUsers, courseId, activeConversation} = this.props;
        const {updateMembers, conversation} = this.state;
        const conversationToBeUpdated = conversation === null ? activeConversation : conversation;
        return (
            <div className='start-modal-from-here'>
                {
                    updateMembers ?
                        <UpdateMembers
                            courseId={courseId}
                            currentUserId={currentUserId}
                            allUsers={enrolledUsers}
                            conversation={conversationToBeUpdated}
                            handleUpdateMembersSuccess={this.handleUpdateMembersSuccess}/>
                        :<NewGroupForm
                            courseId={courseId}
                            handleSuccessGroupCreate={this.handleSuccessGroupCreate}
                            handleCancelGroupCreate={this.handleCancelGroupCreate}/>
                }
            </div>
        );
    }
}

GroupModal.propTypes = {
    courseId: PropTypes.string.isRequired,
    currentUserId: PropTypes.number.isRequired,
    activeConversation: PropTypes.object.isRequired,
    enrolledUsers: PropTypes.array.isRequired,
    closeGroupModal: PropTypes.func.isRequired,
    closeModalAndNavigateToConversation: PropTypes.func.isRequired,
}

export default GroupModal;
