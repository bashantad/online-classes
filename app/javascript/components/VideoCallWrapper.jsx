import React from 'react';
import { withRouter } from 'react-router';

import VideoCall from "./calls/VideoCall";
import userApi from "../apis/userApi";
import callApi from "../apis/callApi";

import videoErr from  '../../assets/images/icons/icon-61.svg'

class VideoCallWrapper extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            currentUserId: null,
            currentUserName: null,
            error: null,
            fetchingCheckUrlFinished: false,
            fetchingUserInfoFinished: false,
        }
    }

    componentDidMount() {
        this._validateUrl();
        this._getUserInfo();
    }

    _validateUrl = () => {
        const {creatorId, callingCode} = this._getCallerParams();
        callApi.checkCallingUrl(creatorId, callingCode)
            .then(res => res.json())
            .then(res => {
                let checkUriObject = {};
                if(!!res.error) {
                    checkUriObject.error = res.error;
                }
                this.setState({
                    fetchingCheckUrlFinished: true,
                    ...checkUriObject,
                })
            });
    }

    _getUserInfo = () => {
        userApi.getCurrentUserInfo()
            .then(res => res.json())
            .then(user => {
                let userObject;
                if(!!user.error) {
                    userObject = this._getGuestUser();
                } else {
                    userObject = this._getCurrentUser(user);
                }
                this.setState({
                    fetchingUserInfoFinished: true,
                    ...userObject
                });
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
        const {userId, callingCode} = this.props.match.params;
        return {
            creatorId: userId,
            callingCode: callingCode,
        }
    }

    _hasFetchingFinished = () => {
        return this.state.fetchingCheckUrlFinished && this.state.fetchingUserInfoFinished;
    }

    render() {
        const { currentUserId, currentUserName, error } = this.state;
        const videoCallParams = {
            ...this._getCallerParams(),
            currentUserId: currentUserId,
            history: this.props.history,
            currentUserName: currentUserName
        };

        return (
            <div className='root'>
                <div  className='video-layout-main'>
                        {
                            this._hasFetchingFinished() ?
                            <>
                                {
                                    error ?
                                        <div className='video-wrapper'>
                                            <figure className="max-w-8rem mx-auto">
                                                <img className="img-fluid" src={videoErr}
                                                     alt="Video Error"/>
                                            </figure>
                                            <small class="text-muted">s{error}</small>
                                        </div>
                                        : <VideoCall {...videoCallParams } />
                                }
                            </>
                            : <div className='video-wrapper loading'>
                                    <div className="spinner-grow text-primary" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                            </div>
                        }
                </div>

            </div>
        );
    }
}

export default withRouter(VideoCallWrapper);
