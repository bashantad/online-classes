import React from 'react';
import { withRouter } from 'react-router';
import { JOIN_CALL, LEAVE_CALL, EXCHANGE, ice } from '../utils/VideoCallUtil'
import callApi from "./calls/callApi";
import consumer from "../channels/consumer";

class VideoCall extends React.Component{
    constructor(props){
        super(props);
        this.pcPeers = {};
        this.localVideoRef = React.createRef();
        this.senderId = Math.floor(Math.random() * 10000);
    }

    _getConversationId = () => {
        return this.props.match.params.id;
    }

    broadCast = (data) => {
        callApi.broadcast(this._getConversationId(), data);
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
        consumer.subscriptions.create({
            channel: "CallsChannel"
        },
        {
            connected: () => {
                console.log('CONNECTED');
                this.broadCast({ type: JOIN_CALL, from: this.senderId });
            },
            received: (data) => {
                console.log("RECEIVED: ", data);
                if (data.from === this.senderId) return;

                switch (data.type) {
                    case JOIN_CALL:
                        return this.join(data);
                    case EXCHANGE:
                        if (data.to !== this.senderId) return;
                        return this.exchange(data);
                    case LEAVE_CALL:
                        return this.removeUser(data);
                    default:
                        return;
                }
            }
        });
    }

    join(data){
        this.createPC(data.from, true)
    }

    removeUser(data){
        let video = document.getElementById(`remoteVideoContainer+${data.from}`);
        video && video.remove();

        let peers = this.pcPeers
        delete peers[data.from]
    }

    createOffer = (pc, userId) => {
        pc.createOffer().then(offer => {
            pc.setLocalDescription(offer).then(() => {
                setTimeout(() => {
                    this.broadCast({
                        type: EXCHANGE,
                        from: this.senderId,
                        to: userId,
                        sdp: JSON.stringify(pc.localDescription),
                    })
                }, 0);
            })
        })
    }

    createPC(userId, offerBool){
        const pc = new RTCPeerConnection(ice);

        this.pcPeers[userId] = pc;
        this.localStream.getTracks().forEach(track => pc.addTrack(track, this.localStream));
        if (offerBool) {
            this.createOffer(pc, userId);
        }
        this.handlePCEvents(pc, userId);
        return pc;
    };

    handlePCEvents(pc, userId) {
        pc.onicecandidate = (e) => this.exchangeCandidate(userId, e);
        pc.ontrack = (e) => this.appendRemoteVideo(userId, e);
        pc.oniceconnectionstatechange = (e) => this.disconnectCall(pc, userId);
    }

    disconnectCall(pc, userId) {
        if (pc.iceConnectionState === 'disconnected') {
            this.broadCast({
                type: LEAVE_CALL,
                from: userId,
            });
        }
    }

    exchangeCandidate(userId, e) {
        this.broadCast({
            type: EXCHANGE,
            from: this.senderId,
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
        this.localVideo.srcObject.getTracks().forEach(function (track) {
            track.stop();
        })
        this.localVideo.srcObject = null;
        App.cable.subscriptions.subscriptions = [];
        this.remoteVideoContainer.innerHTML = "";
        this.broadCast({
            type: LEAVE_CALL,
            from: this.senderId
        });
    }



    exchange(data) {
        const pc = this.getPeerConnection(data);
        if (data.candidate) {
            let candidate = JSON.parse(data.candidate)
            pc.addIceCandidate(new RTCIceCandidate(candidate))
        }
        if (data.sdp) {
            const sdp = JSON.parse(data.sdp);
            if (sdp && !sdp.candidate) {
                pc.setRemoteDescription(sdp).then(() => {
                    if (sdp.type === 'offer') {
                        this.createAnswer(pc, data);
                    }
                })
            }
        }
    }

    getPeerConnection(data) {
        let pc;
        if (this.pcPeers[data.from]) {
            pc = this.pcPeers[data.from];
        } else {
            pc = this.createPC(data.from, false);
        }
        return pc;
    }

    createAnswer = (pc, data) => {
        pc.createAnswer().then(answer => {
            pc.setLocalDescription(answer).then(() => {
                this.broadCast({
                    type: EXCHANGE,
                    from: this.senderId,
                    to: data.from,
                    sdp: JSON.stringify(pc.localDescription)
                });
            })
        })
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

export default withRouter(VideoCall);
