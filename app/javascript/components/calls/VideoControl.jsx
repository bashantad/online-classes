import React from 'react';
import PropTypes from 'prop-types';
import Mic from '@material-ui/icons/Mic';
import MicOff from '@material-ui/icons/MicOff';
import VideocamIcon from '@material-ui/icons/Videocam';
import VideocamOff from '@material-ui/icons/VideocamOff';
import CallEnd from '@material-ui/icons/CallEnd';
import Call from '@material-ui/icons/Call';
import Fab from '@material-ui/core/Fab';

const VideoControl = ({isAudioOn, isVideoOn, hasJoinedLocally, onAudioClick, onVideoClick, onCallEndClick, onJoinClick}) => {
    return (
        <div className='video-call-control-bar'>
            <div className='video-call-control-icon' onClick={onVideoClick}>
                {
                    isVideoOn ?
                        <Fab color="primary" aria-label="video">
                            <VideocamIcon/>
                        </Fab>
                        : <Fab color="primary" aria-label="videoOff">
                            <VideocamOff/>
                        </Fab>
                }
            </div>
            <div className='video-call-control-icon'>
                {
                    hasJoinedLocally ?
                        <Fab color="secondary" aria-label="end">
                            <CallEnd onClick={onCallEndClick}/>
                        </Fab>
                        : <Fab color="primary" aria-label="call" className='call-green'>
                            <Call onClick={onJoinClick}/>
                        </Fab>
                }
            </div>
            <div className='video-call-control-icon' onClick={onAudioClick}>
                {
                    isAudioOn ?
                        <Fab color="primary" aria-label="audio">
                            <Mic/>
                        </Fab>
                        : <Fab color="primary" aria-label="audioOff">
                            <MicOff/>
                        </Fab>
                }
            </div>

        </div>
    );
};

VideoControl.propTypes = {
    onVideoClick: PropTypes.func.isRequired,
    onAudioClick: PropTypes.func.isRequired,
    onCallEndClick: PropTypes.func.isRequired,
    onJoinClick: PropTypes.func.isRequired,
}

export default VideoControl;
