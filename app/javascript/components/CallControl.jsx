import React from 'react';

import Mic from '@material-ui/icons/Mic';
import MicOff from '@material-ui/icons/MicOff';
import VideocamIcon from '@material-ui/icons/Videocam';
import VideocamOff from '@material-ui/icons/VideocamOff';
import CallEnd from '@material-ui/icons/CallEnd';
import MessageIcon from '@material-ui/icons/Message';
import ScreenShare from '@material-ui/icons/ScreenShare';
import StopScreenShare from '@material-ui/icons/StopScreenShare';
import Assignment from '@material-ui/icons/Assignment';
import Notes from '@material-ui/icons/Notes';
import './CallControl.css';

const CallControl = ({isAudioOn, isVideoOn, isSharingOn, onAudioClick, onVideoClick, onMessageClick, onSharingClick}) => {
	const commonProps = {
		fontSize: 'large',
		color: 'primary'
	};
	
	return (
		<div className='call-control-bar'>
			<div className='call-control-icon' onClick={onVideoClick}>
				{
					isVideoOn ?
					<VideocamIcon {...commonProps}/>
					: <VideocamOff {...commonProps}/>
				}
			</div>
			<div className='call-control-icon' onClick={onAudioClick}>
				{
					isAudioOn ?
					<Mic {...commonProps} />
					: <MicOff {...commonProps}/>
				}
			</div>
			<div className='call-control-icon' onClick={onMessageClick}>
				<MessageIcon {...commonProps}/>
			</div>
			<div className='call-control-icon' onClick={onSharingClick}>
				{
					isSharingOn ?
					<StopScreenShare {...commonProps}/>
					: <ScreenShare {...commonProps}/>
				}
			</div>
			<div className='call-control-icon'>
				<Assignment {...commonProps} />
			</div>
			<div className='call-control-icon'>
				<Notes {...commonProps} />
			</div>
			<div className='call-control-icon'>
				<CallEnd {...commonProps} color='secondary' />
			</div>			
		</div>
	);
};

export default CallControl;
