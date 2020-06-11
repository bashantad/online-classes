import React from 'react';
import './VideoCallingLandingPage.scss';
import Button from "@material-ui/core/Button";

export default class VideoCallLandingPage extends React.Component {
    state = {
        code: ''
    };

    handleCodeChange = (event) => {
        this.setState({code: event.target.value});
    }

    handleRoomCreateClick = () => {
        const {code} = this.state;
        if (!!code) {
            this.setState({code: ''});
        }
    }
    render() {
        const {code} = this.state;
        const disabled = !code.trim();

        return (
              <div className='video-call-landing-page'>
                  <div>
                    Pick a calling code
                  </div>
                  <div>
                      <input type="text" onChange={this.handleCodeChange} value={code}/>
                  </div>
                  <div>
                      <Button variant="contained" color="primary" disabled={disabled}
                              onClick={this.handleRoomCreateClick}>
                          Goto my room
                      </Button>
                  </div>
              </div>
          );
    }
}
