import React from 'react';
import { withRouter } from 'react-router';

import VideoCall from "./calls/VideoCall";
import userApi from "../apis/userApi";

class VideoCallWrapper extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            currentUserId: null,
            currentUserName: null,
        }
    }

    componentDidMount() {
        userApi.getCurrentUserInfo()
            .then(res => res.json())
            .then(user => {
                const {id, full_name} = user;
                this.setState({
                    currentUserName: full_name,
                    currentUserId: id,
                })
            });
    }

    _getConversationId = () => {
        return this.props.match.params.id;
    }

    render() {
        const {currentUserId, currentUserName} = this.state;
        return (
            <>
                {
                    currentUserId && <VideoCall
                            conversationId={this._getConversationId()}
                            currentUserId={currentUserId}
                            history={this.props.history}
                            currentUserName={currentUserName} />
                }
            </>
        );
    }
}

export default withRouter(VideoCallWrapper);
