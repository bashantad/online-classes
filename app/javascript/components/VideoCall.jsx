import React from 'react';
import PropTypes from 'prop-types';

import { JOIN_CALL, LEAVE_CALL, EXCHANGE, ice } from '../utils/VideoCallUtil'
import consumer from "../channels/consumer";
import BroadCast from './BroadCast';

export default class VideoCall extends React.Component{
    constructor(props){
        super(props);
        this.pcPeers = {};
        this.localVideoRef = React.createRef();
        this.broadcast = new BroadCast(props.conversationId, props.currentUserId);
    }

    componentDidMount(){
        this.remoteVideoContainer = document.getElementById("remote-calls-container")
        navigator.mediaDevices.getUserMedia({ audio: false, video: true })
            .then(stream => {
                this.localStream = stream;
                this.localVideoRef.current.srcObject = stream;
            }).catch(error => { console.log(error) });
    }

    joinCall(e){
        consumer.subscriptions.create({channel: "CallsChannel"},
            {
                connected: () => this.broadcast.makeApiCall({type: JOIN_CALL, from: this.props.currentUserId}),
                received: (data) => this.handleReceived(data),
            }
        )
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

    removeUser(data){
        let video = document.getElementById(`remoteVideoContainer+${data.from}`);
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
        remoteVid.id = `remoteVideoContainer+${userId}`;
        remoteVid.autoplay = "autoplay";
        remoteVid.srcObject = e.streams[0];
        this.remoteVideoContainer.appendChild(remoteVid);
    }

    leaveCall(e){
        const pcKeys = Object.keys(this.pcPeers);
        for (let i = 0; i < pcKeys.length; i++) {
            this.pcPeers[pcKeys[i]].close();
        }
        this.pcPeers = {};
        this.localVideo.srcObject.getTracks().forEach((track) => {
            track.stop();
        })
        this.localVideo.srcObject = null;
        consumer.subscriptions.subscriptions = [];
        this.remoteVideoContainer.innerHTML = "";
        this.broadcast.makeApiCall({
            type: LEAVE_CALL,
            from: this.props.currentUserId
        });
    }

    exchange(data) {
        const pc = this.getPeerConnection(data);
        this.broadcast.exchangeData(pc, data);
    }

    initializePC(userId) {
        const pc = new RTCPeerConnection(ice);
        this.pcPeers[userId] = pc;
        this.localStream.getTracks().forEach(track => pc.addTrack(track, this.localStream));
        return pc;
    }

    createPC(userId){
        const pc = this.initializePC(userId);
        this.handlePCEvents(pc, userId);
        return pc;
    };

    getPeerConnection(data) {
        let pc;
        if (this.pcPeers[data.from]) {
            pc = this.pcPeers[data.from];
        } else {
            pc = this.createPC(data.from);
        }
        return pc;
    }

    render() {
        return (
            <div className="VideoCall">
                <div id="remote-calls-container"></div>
                <video ref={this.localVideoRef} autoPlay></video>
                <button onClick={this.joinCall.bind(this)}>Join Call</button>
                <button onClick={this.leaveCall.bind(this)}>Leave Call</button>
            </div>
        );
    }
}

VideoCall.propTypes = {
    conversationId: PropTypes.string.isRequired,
    currentUserId: PropTypes.number.isRequired,
    currentUserName: PropTypes.string.isRequired,
};
