import React from 'react';

export default class LocalVideo extends React.Component {
	constructor(props) {
        super(props);
        this.localVideoRef = React.createRef();
        this.hasMediaProps = this.hasMediaProps.bind(this);
    }

    componentDidUpdate(prevProps) {
        if(this.hasMediaProps(this.props) === false) {
            return;
        }
        navigator.mediaDevices.getUserMedia(this.props)
        .then(stream => {
            this.localVideoRef.current.srcObject = stream;
        }).catch(err => {
            console.log(err);
        });
    }

    hasMediaProps({audio, video}) {
        return audio || video;
    }

    render() {
        const hasMedia = this.hasMediaProps(this.props);
        return (
            <>
                {
                    hasMedia && <video ref={this.localVideoRef} autoPlay></video>
                }
            </>
    	)
    }
}
