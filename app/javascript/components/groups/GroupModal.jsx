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
        this.setState({updateMembers: false});
    }

    handleUpdateMembersSuccess = (conversation) => {
        this.props.closeModalAndNavigateToConversation(conversation)
    }

    render() {
        const {currentUserId, enrolledUsers, courseId, activeConversation} = this.props;
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
                                <svg aria-hidden="true" width="10" height="10" viewBox="0 0 18 18"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path fill="currentColor"
                                          d="M11.5,9.5l5-5c0.2-0.2,0.2-0.6-0.1-0.9l-1-1c-0.3-0.3-0.7-0.3-0.9-0.1l-5,5l-5-5C4.3,2.3,3.9,2.4,3.6,2.6l-1,1 C2.4,3.9,2.3,4.3,2.5,4.5l5,5l-5,5c-0.2,0.2-0.2,0.6,0.1,0.9l1,1c0.3,0.3,0.7,0.3,0.9,0.1l5-5l5,5c0.2,0.2,0.6,0.2,0.9-0.1l1-1 c0.3-0.3,0.3-0.7,0.1-0.9L11.5,9.5z"/>
                                </svg>
                            </button>
                        </div>
                        <div className="modal-body">
                            {
                                updateMembers ?
                                    <UpdateMembers
                                        courseId={courseId}
                                        currentUserId={currentUserId}
                                        allUsers={enrolledUsers}
                                        conversation={conversationToBeUpdated}
                                        handleCancelGroupCreate={this.handleCancelGroupCreate}
                                        handleUpdateMembersSuccess={this.handleUpdateMembersSuccess}/>
                                    : <NewGroupForm
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
    courseId: PropTypes.string.isRequired,
    currentUserId: PropTypes.number.isRequired,
    activeConversation: PropTypes.object.isRequired,
    enrolledUsers: PropTypes.array.isRequired,
    closeModalAndNavigateToConversation: PropTypes.func.isRequired,
}

export default GroupModal;
