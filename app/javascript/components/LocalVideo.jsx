import React from 'react';

export default class LocalVideo extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
            localStream: null,            
        }
        this.videoRef = React.createRef()
    }

    componentDidMount() {
    	const {audio, video} = this.props;
    	const mediaProperties = {audio, video};    	
    	navigator.mediaDevices.getUserMedia(mediaProperties)
        .then(stream => {
            this.videoRef.current.srcObject = stream;
        }).catch(err => console.log(err));
    }

    render() {
    	return (
    		<video ref={this.videoRef} autoPlay></video>
    	)
    }
}
