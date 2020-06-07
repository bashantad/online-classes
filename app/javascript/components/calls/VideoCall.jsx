import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

import { JOIN_CALL, LEAVE_CALL, EXCHANGE, ice } from '../../utils/VideoCallUtil'
import consumer from "../../channels/consumer";
import BroadCast from './BroadCast';
import './VideoCall.scss';
import VideoControl from "./VideoControl";

export default class VideoCall extends React.Component{
    constructor(props) {
        super(props);
        this.pcPeers = {};
        this.localVideoRef = React.createRef();
        this.broadcast = new BroadCast(props.conversationId, props.currentUserId);
        this.state = {
            hasJoinedTheCall: false,
            audio: true,
            video: true,
        }
    }

    componentDidMount() {
        this.remoteVideoContainer = document.getElementById("remote-calls-container")
        navigator.mediaDevices.getUserMedia({
            audio: false,
            video: true,
        }).then(stream => {
            this.localStream = stream;
            this.localVideoRef.current.srcObject = stream;
        }).catch(error => { console.log(error) });
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
        this.setState({hasJoinedTheCall: true});
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
        pc.ontrack = (e) => this.appendRemoteVideo(userId, e);
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
        const remoteVid = document.createElement("video");
        remoteVid.id = `remote-video-box-${userId}`;
        remoteVid.autoplay = "autoplay";
        remoteVid.className = "remote-video-participant";
        remoteVid.srcObject = e.streams[0];
        this.remoteVideoContainer.appendChild(remoteVid);
    }

    leaveCall = () => {
        const pcKeys = Object.keys(this.pcPeers);
        for (let i = 0; i < pcKeys.length; i++) {
            this.pcPeers[pcKeys[i]].close();
        }
        this.pcPeers = {};
        this.localVideoRef.current.srcObject.getTracks().forEach((track) => {
            track.stop();
        })
        this.setState({hasJoinedTheCall: true});
        this.localVideoRef.current.srcObject = null;
        consumer.subscriptions.subscriptions = [];
        this.remoteVideoContainer.innerHTML = "";
        this.broadcast.makeApiCall({
            type: LEAVE_CALL,
            from: this.props.currentUserId
        });
        this.setState({hasJoinedTheCall: false});
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

    }

    toggleVideo = () => {
        const videoTrack = this.localStream.getVideoTracks();
        if(videoTrack.length > 0) {
            this.localStream.removeTrack(videoTrack[0]);
        }
        this.localVideoRef.current.srcObject = this.localStream;
    }

    render() {
        const {hasJoinedTheCall, audio, video} = this.state;
        const callProps = {
            isAudioOn: audio,
            isVideoOn: video,
            onAudioClick: this.toggleAudio,
            onVideoClick: this.toggleVideo,
            onCallEndClick: this.leaveCall,
        };

        return (
            <div className="video-call-container">
                <div id="remote-calls-container"></div>
                <video ref={this.localVideoRef} autoPlay></video>
                {
                    !hasJoinedTheCall && <Button variant="contained" color="primary" onClick={this.joinCall}>
                        Join call
                    </Button>
                }

                {
                    hasJoinedTheCall && <VideoControl {...callProps} />
                }
            </div>
        );
    }
}

VideoCall.propTypes = {
    conversationId: PropTypes.string.isRequired,
    currentUserId: PropTypes.number.isRequired,
    currentUserName: PropTypes.string.isRequired,
};
