import React from "react";
import {Link} from "react-router-dom";
import { withRouter } from 'react-router';
import PropTypes from "prop-types";

import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import ClassIcon from '@material-ui/icons/Class';
import MessageIcon from '@material-ui/icons/Message';
import CallIcon from '@material-ui/icons/Call';

import Header from '../components/Header';
import '../packs/index.scss'
import callApi from "../apis/callApi";

export class Home extends React.Component {
    state = {
        error: '',
    }

    handleRoomCreateClick = () => {
        callApi.create()
            .then(res => res.json())
            .then(response => {
                if(response.error) {
                    this.setState({error: response.error});
                } else {
                    const {user_id, calling_code} = response;
                    const callUrl = `/calls/${user_id}/join/${calling_code}`
                    this.props.history.push(callUrl);
                }
            });
    }

    render() {
        const {error} = this.state;
        return (
            <div>
                <Header/>
                <Container maxWidth="sm" className='welcome'>
                    <div className='welcome-main'>
                        <Typography variant="h4" className='welcome-title'>
                            VCRoom
                        </Typography>

                        <Paper className='welcome-paper'>
                            <Typography variant="h6" className="lead">
                                Search the virtual classes that are running now.
                            </Typography>
                            <div className='search'>
                                <div className='searchIcon'>
                                    <SearchIcon/>
                                </div>
                                <InputBase
                                    placeholder="Search…"
                                    classes='search-main'
                                    inputProps={{'aria-label': 'search'}}
                                />
                            </div>
                        </Paper>
                    </div>
                </Container>

                <Container maxWidth="md">
                    <div className='welcome-buttons'>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            className='welcome-btn'
                            startIcon={<ClassIcon/>}
                        >
                            <Link
                                to="/classroom/1"
                                className="btn btn-lg custom-button"
                                role="button"
                            >
                                Join class
                            </Link>
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            className='welcome-btn'
                            startIcon={<MessageIcon/>}
                        >
                            <Link
                                to="/courses/1/messages"
                                className="btn btn-lg custom-button"
                                role="button"
                            >
                                Join Messages
                            </Link>
                        </Button>

                        <div className='video-call-component'>
                            <div>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    className='welcome-btn'
                                    onClick={this.handleRoomCreateClick}
                                    startIcon={<CallIcon/>}
                                >
                                    Create one click video conference room
                                </Button>
                                {
                                    error && <div>{error}</div>
                                }
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }
}

Home.propTypes = {
    history: PropTypes.object.isRequired,
};

export default withRouter(Home);
