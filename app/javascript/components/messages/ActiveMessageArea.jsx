import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import './ActiveMessageArea.scss';

export default class ActiveMessageArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {anchorEl: null};
        this.messagesEndRef = React.createRef();
    }

    componentDidMount() {
        this.scrollToTheButtom();
    }

    componentDidUpdate() {
        this.scrollToTheButtom();
    }

    scrollToTheButtom = () => {
        const currentMessageEnd = this.messagesEndRef.current;
        currentMessageEnd && currentMessageEnd.scrollIntoView({behavior: 'smooth'})
    }

    handlePopover = (event) => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleClose = () => {
        this.setState({anchorEl: null});
    };

    renderMessage = (message, lastSenderId) => {
        const {currentUserId, activeConversation} = this.props;
        const {sender, created_time, content} = message;
        const messageOwnerClass = currentUserId === sender.id ? 'message-owner' : 'sender-owner';
        const messageKey = `conversation-${activeConversation.id}-message-${message.id}`;
        const isSenderChanged = lastSenderId !== sender.id;
        const senderChangedClass = isSenderChanged ? 'sender-changed' : '';
        return (
            <Fragment key={messageKey}>
                <div className={`conversation-item ${messageOwnerClass} ${senderChangedClass}`}>
                    <div className='person-wrapper'>
                        {
                            isSenderChanged &&
                            <div className='person-name'>
                                <i className="fas fa-user mr-2 mt-1 person-icon"></i>
                               <span className='person-name-item'>{sender.full_name}</span>
                            </div>
                        }
                    </div>
                    <div className='message-item-wrapper'>
                        <div className='border message-content'>
                            {content}
                        </div>
                        <div className='message-created-time'>
                            {created_time}
                        </div>
                    </div>

                </div>
            </Fragment>
        );
    };

    displayTitle = () => {
        const {activeConversation, currentUserId, userIdToNameMapping} = this.props;
        if (!!activeConversation.title) {
            return activeConversation.title;
        } else {
            const conversation_users = activeConversation.conversation_enrolled_users;
            let userId = currentUserId;
            if (conversation_users.length > 1) {
                const conversation_user = conversation_users.find(conversation_user => conversation_user.user_id !== currentUserId);
                userId = conversation_user.user_id;
            }
            return userIdToNameMapping[userId];
        }
    }

    handleUpdate = () =>{
        this.props.handleGroupUpdate();
    }

    render() {
        const {activeConversation, handleDrawerToggle} = this.props;

        const open = Boolean(this.state.anchorEl);
        const id = open ? 'simple-popover' : undefined;

        return (
            <Fragment>
                <div className="chat-header">
                    {
                        activeConversation && <div>
                         <span className='message-header-icon'>
                             {
                                 !activeConversation.title ?  <i className="fas fa-user-circle mr-2 fa-lg"></i> :  <i className="fas fa-users mr-2 fa-lg"></i>
                             }
                        </span>
                                {this.displayTitle()}
                            {
                                activeConversation.title &&
                                <span className='group-option'>
                                    <ul>
                                        <li className="dropdown">
                                             <button type="button" className="hs-mega-menu-invoker btn btn-primary btn-icon btn-xs" id="dropdownSubMenu" role="button" data-toggle="dropdown"
                                                     aria-haspopup="true" aria-expanded="false">
                                              <i className="fas fa-info"></i>
                                            </button>
                                            <div className="dropdown-menu" aria-labelledby="dropdownSubMenu">
                                                <a type='button' className="dropdown-item" href="#" onClick={this.handleUpdate}>Update Members</a>
                                                <a type='button' className="dropdown-item" href="#" onClick={this.handleUpdate}>Details</a>
                                                <a type='button' className="dropdown-item text-danger" href="#" onClick={this.handleUpdate}>Delete</a>
                                            </div>
                                        </li>
                                    </ul>
                                </span>

                            }
                        </div>
                    }

                </div>
                    <div>
                        {
                            activeConversation && <div className='active-conversation bg-soft-primary'>
                                {
                                    Array.isArray(activeConversation.messages) && activeConversation.messages.length ?
                                        <div className='message-card'>
                                            {
                                                activeConversation.messages.map((message, index) => {
                                                    let lastSenderId = null;
                                                    if (index > 0) {
                                                        lastSenderId = activeConversation.messages[index - 1].sender.id;
                                                    }
                                                    return this.renderMessage(message, lastSenderId)
                                                })
                                            }
                                        </div>
                                        : <div className='message-card no-message'>
                                            <div className='no-message-card'>
                                                <figure className="max-w-8rem mx-auto mb-2">
                                                    <img className="img-fluid" src="../../assets/icons/icon-4.svg"
                                                         alt="SVG"/>
                                                </figure>
                                                <div class='text-body'>No Messages</div>
                                            </div>
                                        </div>
                                }
                                <div ref={this.messagesEndRef}/>
                            </div>
                        }
                </div>
            </Fragment>

        );
    };
}

ActiveMessageArea.propTypes = {
    activeConversation: PropTypes.object,
    userIdToNameMapping: PropTypes.object,
    currentUserId: PropTypes.number,
    handleGroupUpdate: PropTypes.func,
};
