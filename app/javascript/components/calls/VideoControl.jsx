import React from 'react';
import PropTypes from 'prop-types';
import Mic from '@material-ui/icons/Mic';
import Paper from '@material-ui/core/Paper';
import MicOff from '@material-ui/icons/MicOff';
import VideocamIcon from '@material-ui/icons/Videocam';
import VideocamOff from '@material-ui/icons/VideocamOff';
import CallEnd from '@material-ui/icons/CallEnd';
import Call from '@material-ui/icons/Call';
import Fab from '@material-ui/core/Fab';

const VideoControl = ({isAudioOn, isVideoOn, hasJoinedTheCall, onAudioClick, onVideoClick, onCallEndClick, onJoinClick}) => {
    const commonProps = {
        fontSize: 'large',
        color: 'primary'
    };

    return (
        <Paper className='video-call-control-bar'>
            <div className='video-call-control-icon' onClick={onVideoClick}>
                {
                    isVideoOn ?
                        <VideocamIcon {...commonProps}/>
                        : <VideocamOff {...commonProps}/>
                }
            </div>
            <div className='video-call-control-icon' onClick={onAudioClick}>
                {
                    isAudioOn ?
                        <Mic {...commonProps} />
                        : <MicOff {...commonProps}/>
                }
            </div>
            <div className='video-call-control-icon'>
                {
                    hasJoinedTheCall ?
                        <CallEnd {...commonProps} color='secondary' onClick={onCallEndClick}/>
                        : <Call {...commonProps} onClick={onJoinClick} />
                }
            </div>
        </Paper>
    );
};

VideoControl.propTypes = {
    onVideoClick: PropTypes.func.isRequired,
    onAudioClick: PropTypes.func.isRequired,
    onCallEndClick: PropTypes.func.isRequired,
    onJoinClick: PropTypes.func.isRequired,
}

export default VideoControl;
