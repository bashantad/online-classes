import React from "react";
import PropTypes from "prop-types";
import NewGroupForm from "./NewGroupForm";
import UpdateMembers from "./UpdateMembers";

import closeIcon from '../../../assets/images/illustrations/closeIcon.svg'

class GroupModal extends React.Component {
    state = {
        updateMembers: false,
        conversation: null,
    }

    handleSuccessGroupCreate = (conversation) => {
        this.setState({updateMembers: true, conversation: conversation});
    }

    handleCancelGroupCreate = () => {
        this.setState({updateMembers: false});
        this.props.handleModalClose();
    }

    handleUpdateMembersSuccess = (conversation) => {
        this.props.closeModalAndNavigateToConversation(conversation)
    }

    render() {
        const {currentUserId, enrolledUsers, courseId, activeConversation, handleModalClose, showUpdateMembers, showNewGroupForm} = this.props;
        const {updateMembers, conversation} = this.state;
        const conversationToBeUpdated = conversation === null ? activeConversation : conversation;
        return (
            <div className="modal fade" id="groupModal" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title"
                                id="exampleModalLabel">{updateMembers ? 'Members' : 'Create New Group'}</h5>
                            <button type="button" className="btn btn-xs btn-icon btn-soft-secondary"
                                    data-dismiss="modal"
                                    onClick={this.handleCancelGroupCreate}>
                                <img src={closeIcon} alt="Close"/>
                            </button>
                        </div>
                        <div className="modal-body">
                            {
                                !showNewGroupForm || updateMembers ?
                                    <UpdateMembers
                                        courseId={courseId}
                                        currentUserId={currentUserId}
                                        allUsers={enrolledUsers}
                                        conversation={conversationToBeUpdated}
                                        handleCancelGroupCreate={this.handleCancelGroupCreate}
                                        handleModalClose={handleModalClose}
                                        handleUpdateMembersSuccess={this.handleUpdateMembersSuccess}/>
                                    : <NewGroupForm
                                        courseId={courseId}
                                        handleSuccessGroupCreate={this.handleSuccessGroupCreate}
                                        handleModalClose={handleModalClose}
                                        handleCancelGroupCreate={this.handleCancelGroupCreate}/>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

GroupModal.propTypes = {
    courseId: PropTypes.string.isRequired,
    currentUserId: PropTypes.number.isRequired,
    activeConversation: PropTypes.object.isRequired,
    enrolledUsers: PropTypes.array.isRequired,
    closeModalAndNavigateToConversation: PropTypes.func.isRequired,
}

export default GroupModal;
