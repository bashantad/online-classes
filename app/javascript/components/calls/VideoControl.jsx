import React from 'react';
import PropTypes from 'prop-types';
import Mic from '@material-ui/icons/Mic';
import MicOff from '@material-ui/icons/MicOff';
import VideocamIcon from '@material-ui/icons/Videocam';
import VideocamOff from '@material-ui/icons/VideocamOff';
import CallEnd from '@material-ui/icons/CallEnd';

const VideoControl = ({isAudioOn, isVideoOn, onAudioClick, onVideoClick, onCallEndClick}) => {
    const commonProps = {
        fontSize: 'large',
        color: 'primary'
    };

    return (
        <div className='video-call-control-bar'>
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
                <CallEnd {...commonProps} color='secondary' onClick={onCallEndClick}/>
            </div>
        </div>
    );
};

VideoControl.propTypes = {
    onVideoClick: PropTypes.func.isRequired,
    onAudioClick: PropTypes.func.isRequired,
    onCallEndClick: PropTypes.func.isRequired,
}

export default VideoControl;
