import React from 'react';

import CallControl from '../components/CallControl';
import LocalVideo from '../components/LocalVideo';
import Grid from '@material-ui/core/Grid';

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
        this.openMessage = this.openMessage.bind(this);
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
    openMessage() {

    }

    render() {
        const {audio, video, sharing} = this.state;
        const panelProps = {
            isAudioOn: audio,
            isVideoOn: video,
            isSharingOn: sharing,
            onAudioClick: this.toggleAudio,
            onVideoClick: this.toggleVideo,
            onMessageClick: this.openMessage,
            onSharingClick: this.toggleSharing,
        }
        
        return <div className = 'call-page'>
            <Grid container spacing={1}>
                <CallControl {...panelProps}/>
                {
                    <LocalVideo audio={audio} video={video}/>
                }
            </Grid>
        </div>
    }
}

export default Call;