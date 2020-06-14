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
                let userObject;
                if(!!user.error) {
                    userObject = this._getGuestUser();
                } else {
                    userObject = this._getCurrentUser(user);
                }
                this.setState(userObject);
            });
    }

    _getCurrentUser = (user) => {
        return {
            currentUserId: user.id,
            currentUserName: user.full_name,
        }
    }

    _getGuestUser = () => {
        return {
            currentUserId: 'guest-user-id',
            currentUserName: 'Guest User',
        };
    }

    _getCallerParams = () => {
        const {user_id, calling_code} = this.props.match.params;
        return {
            creatorId: user_id,
            callingCode: calling_code,
        }
    }

    render() {
        const { currentUserId, currentUserName } = this.state;
        const videoCallParams = {
            ...this._getCallerParams(),
            currentUserId: currentUserId,
            history: this.props.history,
            currentUserName: currentUserName
        };

        return (
            <>
                {
                    currentUserId ?
                        <VideoCall {...videoCallParams } />
                        : <div> Loading... </div>
                }
            </>
        );
    }
}

export default withRouter(VideoCallWrapper);
