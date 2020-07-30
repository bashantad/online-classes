import React from 'react';
import PropTypes from 'prop-types';

const VideoControl = ({isAudioOn, isVideoOn, hasJoinedLocally, onAudioClick, onVideoClick, onCallEndClick, onJoinClick}) => {
    return (
        <div className='video-call-control-bar'>
            <div className='video-call-control-icon' onClick={onVideoClick}>
                <button className='btn btn-pill btn-primary'>
                    {isVideoOn ? <i className='fa fa-video' aria-label="video"></i> :
                        <i className='fa fa-video-slash' aria-label="videoOff"></i>}
                </button>
            </div>
            <div className='video-call-control-icon'>
                {
                    hasJoinedLocally ?
                        <button className='btn btn-pill btn-danger' onClick={onCallEndClick} aria-label="end"><i className='fa fa-phone-slash'></i></button>
                        :
                        <button className='btn btn-pill btn-info' onClick={onJoinClick} aria-label="call"><i className='fa fa-phone'></i></button>
                }
            </div>
            <div className='video-call-control-icon' onClick={onAudioClick}>
                <button className='btn btn-pill btn-primary'>
                    {isAudioOn ? <i className='fa fa-microphone p-1' aria-label="video" aria-label="audio"></i> :
                        <i className='fa fa-microphone-slash' aria-label="videoOff" aria-label="audioOff"></i>}
                </button>
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
