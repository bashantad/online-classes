import React from "react";
import {Link} from "react-router-dom";

import Header from '../components/Header';

import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import ClassIcon from '@material-ui/icons/Class';
import MessageIcon from '@material-ui/icons/Message';
import CallIcon from '@material-ui/icons/Call';

import '../packs/index.scss'

const Home = () => (
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

                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    className='welcome-btn'
                    startIcon={<CallIcon/>}
                >
                    <Link
                        to="/calls/1"
                        className="btn btn-lg custom-button"
                        role="button"
                    >
                        Join Calls
                    </Link>
                </Button>
            </div>
        </Container>
    </div>
);

export default Home;
