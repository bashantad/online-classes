import React from 'react';
import PropTypes from 'prop-types';

import {JOIN_CALL, LEAVE_CALL, EXCHANGE, ice} from '../../utils/VideoCallUtil'
import consumer from "../../channels/consumer";
import BroadCast from './BroadCast';
import './VideoCall.scss';
import './webrtc-old-browsers';
import VideoControl from "./VideoControl";

export default class VideoCall extends React.Component {
    constructor(props) {
        super(props);
        this.pcPeers = {};
        this.broadcast = new BroadCast(props.conversationId, props.currentUserId);
        this.state = {
            hasJoinedLocally: false,
            hasJoinedRemotely: false,
            audio: true,
            video: true,
        }
    }

    componentDidMount() {
        this.remoteVideoContainer = document.getElementById("remote-calls-container")
        this.localVideoContainer = document.getElementById("local-video-box");
        navigator.mediaDevices.getUserMedia({
            audio: true,
            video: {
                facingMode: 'user',
            },
        }).then(stream => {
            this.localStream = stream;
            this.localVideoContainer.srcObject = stream;
        }).catch(error => {
            console.log(error)
        });
    }

    joinCall = () => {
        consumer.subscriptions.create({channel: "CallsChannel"},
            {
                connected: () => this.connectCall(),
                received: (data) => this.handleReceived(data),
            }
        )
    }

    connectCall() {
        this.setState({hasJoinedLocally: true});
        this.broadcast.makeApiCall({type: JOIN_CALL, from: this.props.currentUserId})
    }

    handleReceived(data) {
        if (data.from === this.props.currentUserId) return;

        switch (data.type) {
            case JOIN_CALL:
                return this.join(data);
            case EXCHANGE:
                if (data.to !== this.props.currentUserId) return;
                return this.exchange(data);
            case LEAVE_CALL:
                return this.removeUser(data);
            default:
                return;
        }
    }

    join(data) {
        const senderId = data.from;
        const pc = this.initializePC(senderId);
        this.broadcast.createOffer(pc, senderId);
        this.handlePCEvents(pc, senderId);
    }

    removeUser(data) {
        let video = document.getElementById(`remote-video-box-${data.from}`);
        video && video.remove();

        let peers = this.pcPeers
        delete peers[data.from]
    }

    handlePCEvents(pc, userId) {
        pc.onicecandidate = (e) => this.exchangeCandidate(userId, e);
        pc.onaddstream = (e) => this.appendRemoteVideo(userId, e);
        pc.oniceconnectionstatechange = () => this.disconnectCall(pc, userId);
    }

    disconnectCall(pc, senderId) {
        if (pc.iceConnectionState === 'disconnected') {
            this.broadcast.makeApiCall({
                type: LEAVE_CALL,
                from: senderId,
            });
        }
    }

    exchangeCandidate(userId, e) {
        this.broadcast.makeApiCall({
            type: EXCHANGE,
            from: this.props.currentUserId,
            to: userId,
            sdp: JSON.stringify(e.candidate)
        })
    }

    appendRemoteVideo(userId, e) {
        const documentId = `remote-video-box-${userId}`;
        if (document.getElementById(documentId)) {
            return;
        }
        const remoteVid = document.createElement("video");
        remoteVid.id = documentId;
        remoteVid.autoplay = "autoplay";
        remoteVid.playsInline = "playsInline";
        remoteVid.className = "remote-video-participant video-component";
        remoteVid.srcObject = e.stream;
        this.setState({
            hasJoinedRemotely: true
        });
        this.remoteVideoContainer.appendChild(remoteVid);
    }

    leaveCall = () => {
        const pcKeys = Object.keys(this.pcPeers);
        for (let i = 0; i < pcKeys.length; i++) {
            this.pcPeers[pcKeys[i]].close();
        }
        this.pcPeers = {};
        this.localVideoContainer.srcObject.getTracks().forEach((track) => {
            track.stop();
        });
        this.localVideoContainer.srcObject = null;
        consumer.subscriptions.subscriptions = [];
        this.remoteVideoContainer.innerHTML = "";
        this.broadcast.makeApiCall({
            type: LEAVE_CALL,
            from: this.props.currentUserId
        });
        this.props.history.push('./')
    }

    exchange(data) {
        const peerConnection = this.getPeerConnection(data);
        this.broadcast.exchangeData(peerConnection, data);
    }

    initializePC(userId) {
        const peerConnection = new RTCPeerConnection(ice);
        this.pcPeers[userId] = peerConnection;
        this.localStream.getTracks().forEach(track => peerConnection.addTrack(track, this.localStream));
        return peerConnection;
    }

    createPeerConnection(userId) {
        const peerConnection = this.initializePC(userId);
        this.handlePCEvents(peerConnection, userId);
        return peerConnection;
    };

    getPeerConnection(data) {
        let peerConnection;
        if (this.pcPeers[data.from]) {
            peerConnection = this.pcPeers[data.from];
        } else {
            peerConnection = this.createPeerConnection(data.from);
        }
        return peerConnection;
    }

    toggleAudio = () => {
        const audioTracks = this.localStream.getAudioTracks();
        if (audioTracks.length > 0) {
            const audio = this._toggleMediaTrack(audioTracks[0]);
            this.setState({audio: audio});
        }
    }

    toggleVideo = () => {
        const videoTracks = this.localStream.getVideoTracks();
        if (videoTracks.length > 0) {
            const video = this._toggleMediaTrack(videoTracks[0]);
            this.setState({video: video});
        }
    }

    _toggleMediaTrack = (mediaTrack) => {
        let isMediaOn;
        if (mediaTrack.enabled) {
            mediaTrack.enabled = false;
            isMediaOn = false;
        } else {
            mediaTrack.enabled = true;
            isMediaOn = true;
        }
        return isMediaOn;
    }

    render() {
        const {hasJoinedLocally, hasJoinedRemotely, audio, video} = this.state;
        const callProps = {
            isAudioOn: audio,
            isVideoOn: video,
            hasJoinedLocally: hasJoinedLocally,
            onAudioClick: this.toggleAudio,
            onVideoClick: this.toggleVideo,
            onCallEndClick: this.leaveCall,
            onJoinClick: this.joinCall,
        };

        return (
            <div className="video-call-container">
                <div className='video-main'>
                    <div className='video-paper'>
                        <div className='flex-video'>
                            <video id="local-video-box" autoPlay playsInline
                                   className='video-component local-video' muted="muted"></video>
                            {
                                hasJoinedLocally && ! hasJoinedRemotely && <div>Waiting for the other person to join...</div>
                            }
                        </div>
                        <div id="remote-calls-container" className='flex-video'>
                        </div>
                    </div>
                </div>
                <VideoControl {...callProps} className='local-video-control'/>
            </div>
        );
    }
}

VideoCall.propTypes = {
    conversationId: PropTypes.string.isRequired,
    currentUserId: PropTypes.number.isRequired,
    currentUserName: PropTypes.string.isRequired,
    history: PropTypes.object.isRequired,
};
