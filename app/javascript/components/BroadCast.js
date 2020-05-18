import callApi from "./calls/callApi";
import {EXCHANGE} from "../utils/VideoCallUtil";

export default class BroadCast {
    constructor(conversationId, senderId) {
        this.conversationId = conversationId;
        this.senderId = senderId;
    }

    makeApiCall(data) {
        callApi.broadcast(this.conversationId, data);
    }

    createAnswer(pc, receiverId) {
        pc.createAnswer().then(answer => {
            pc.setLocalDescription(answer).then(() => {
                this.makeApiCall({
                    type: EXCHANGE,
                    from: this.senderId,
                    to: receiverId,
                    sdp: JSON.stringify(pc.localDescription)
                });
            })
        })
    }

    createOffer(pc, receiverId) {
        pc.createOffer().then(offer => {
            pc.setLocalDescription(offer).then(() => {
                setTimeout(() => {
                    this.makeApiCall({
                        type: EXCHANGE,
                        from: this.senderId,
                        to: receiverId,
                        sdp: JSON.stringify(pc.localDescription),
                    })
                }, 0);
            })
        })
    }

    exchangeData(pc, data) {
        const {candidate, sdp, from} = data;
        if (candidate) {
            this._addIceCandidate(pc, candidate)
        }
        if (sdp) {
            this._setRemoteDescription(sdp, pc, from);
        }
    }

    _addIceCandidate(pc, candidate) {
        const parsedCandidate = JSON.parse(candidate)
        pc.addIceCandidate(new RTCIceCandidate(parsedCandidate))
    }

    _setRemoteDescription(sdp, pc, from) {
        const parsedSdp = JSON.parse(sdp);
        if (parsedSdp && !parsedSdp.candidate) {
            pc.setRemoteDescription(parsedSdp).then(() => {
                if (parsedSdp.type === 'offer') {
                    this.createAnswer(pc, from);
                }
            })
        }
    }
}
