import React from 'react';

import CallControl from './calls/CallControl';
import LocalVideo from './calls/LocalVideo';

export class Call extends React.Component {
    state = {
        video: false,
        audio: false,
        sharing: false,
    }
    constructor(props) {
        super(props);

        this.toggleAudio = this.toggleAudio.bind(this);
        this.toggleVideo = this.toggleVideo.bind(this);
        this.toggleSharing = this.toggleSharing.bind(this);
    }
    toggleVideo() {
        this.setState({video: !this.state.video});
    }

    toggleAudio() {
        this.setState({audio: !this.state.audio});
    }

    toggleSharing() {
        this.setState({sharing: !this.state.sharing});
    }

    render() {
        const {audio, video, sharing, chat} = this.state;
        const panelProps = {
            isAudioOn: audio,
            isVideoOn: video,
            isSharingOn: sharing,
            onAudioClick: this.toggleAudio,
            onVideoClick: this.toggleVideo,
            onSharingClick: this.toggleSharing,
        }

        return <div className = 'call-page container'>
                <CallControl {...panelProps}/>
                {
                    <LocalVideo audio={audio} video={video}/>
                }
        </div>
    }
}

export default Call;
