import React from 'react';
import Grid from '@material-ui/core/Grid';

import CallControl from '../components/CallControl';
import LocalVideo from './calls/LocalVideo';
import ChatWrapper from '../components/ChatWrapper';
import Header from '../components/Header';

export class Call extends React.Component {
    state = {
        video: false,
        audio: false,
        sharing: false,
        chat: false,
    }
    constructor(props) {
        super(props);

        this.toggleAudio = this.toggleAudio.bind(this);
        this.toggleVideo = this.toggleVideo.bind(this);
        this.toggleSharing = this.toggleSharing.bind(this);
        this.toggleMessage = this.toggleMessage.bind(this);
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
    toggleMessage() {
        this.setState({chat: !this.state.chat});
    }

    render() {
        const {audio, video, sharing, chat} = this.state;
        const panelProps = {
            isAudioOn: audio,
            isVideoOn: video,
            isSharingOn: sharing,
            onAudioClick: this.toggleAudio,
            onVideoClick: this.toggleVideo,
            onMessageClick: this.toggleMessage,
            onSharingClick: this.toggleSharing,
        }

        const chatProps = {
            open: chat,
            handleClose: this.toggleMessage
        };

        return <div className = 'call-page'>
            <Header />
            <ChatWrapper {...chatProps} />
            <Grid container spacing={0}>
                <CallControl {...panelProps}/>
                {
                    <LocalVideo audio={audio} video={video}/>
                }
            </Grid>
        </div>
    }
}

export default Call;
