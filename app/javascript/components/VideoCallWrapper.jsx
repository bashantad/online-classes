import React from 'react';
import { withRouter } from 'react-router';

import VideoCall from "./calls/VideoCall";
import userApi from "../apis/userApi";
import callApi from "../apis/callApi";
import Header from "./Header";
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';

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
        const {user_id, calling_code} = this.props.match.params;
        return {
            creatorId: user_id,
            callingCode: calling_code,
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
            <>
                <Header/>
                {
                    this._hasFetchingFinished() ?
                        <>
                            {
                                error ?
                                    <div>
                                        {error}
                                    </div>
                                    : <VideoCall {...videoCallParams } />
                            }
                        </>
                        : <div>
                            <Skeleton variant="rect" className='video-skeleton' />
                            <Typography variant="h6" gutterBottom className='skeleton-caption'>
                               Loading...
                            </Typography>
                        </div>

                }
            </>
        );
    }
}

export default withRouter(VideoCallWrapper);
