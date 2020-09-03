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
        this.props.closeGroupModal();
    }

    handleUpdateMembersSuccess = (conversation) => {
        this.setState({updateMembers: false});
        this.props.closeModalAndNavigateToConversation(conversation)
    }

    render() {
        const {currentUserId, enrolledUsers, courseId, activeConversation, groupUpdate} = this.props;
        const {updateMembers, conversation} = this.state;
        const conversationToBeUpdated = conversation === null ? activeConversation : conversation;
        return (
               <div className="modal fade" id="groupModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">
                                    {updateMembers || groupUpdate ? 'Update Members' : 'Create New Group'}
                                </h5>
                                <button type="button" className="btn btn-xs btn-icon btn-soft-secondary"
                                    data-dismiss="modal"
                                    onClick={this.handleCancelGroupCreate}>
                                    <img src={closeIcon} alt="Close"/>
                                </button>
                            </div>
                            <div className="modal-body">
                                {
                                    updateMembers || groupUpdate ?
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
                        </div>
                    </div>
                </div>
            );
        }
}

GroupModal.propTypes = {
    currentUserId: PropTypes.number,
    activeConversation: PropTypes.object,
    showGroupModal: PropTypes.bool.isRequired,
    courseId: PropTypes.string.isRequired,
    enrolledUsers: PropTypes.array.isRequired,
    closeGroupModal: PropTypes.func.isRequired,
    closeModalAndNavigateToConversation: PropTypes.func.isRequired,
}

export default GroupModal;
