import React, {Fragment} from "react";
import {Link} from "react-router-dom";
import {withRouter} from 'react-router';
import PropTypes from "prop-types";

import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from "@material-ui/core/Toolbar";
import Snackbar from "@material-ui/core/Snackbar";


import Header from '../components/Header';
import '../packs/index.scss'
import callApi from "../apis/callApi";
import courseApi from "../apis/courseApi";
import CardSkeleton from "./common/CardSkeleton";
import CourseCard from "./common/CourseCard";

export class Home extends React.Component {
    state = {
        error: '',
        vertical: 'bottom',
        horizontal: 'right',
        courses: [],
        errNotification: false,
        loading: true,
    }

    handleRoomCreateClick = () => {
        callApi.create()
            .then(res => res.json())
            .then(response => {
                if (response.error) {
                    this.setState({error: response.error});
                    this.setState({errNotification: true})
                } else {
                    const {user_id, calling_code} = response;
                    const callUrl = `/calls/${user_id}/join/${calling_code}`
                    this.props.history.push(callUrl);
                }
            });
    }

    handleClose = () => {
        this.setState({errNotification: false});
    };

    componentDidMount() {
        courseApi.getApprovedCourses()
            .then(res => res.json())
            .then(response => {
                if (response.error) {
                    this.setState({error: response.error});
                    this.setState({loading: false})
                    this.setState({errNotification: true})
                } else {
                    this.setState({loading: false})
                    this.setState({courses: response})
                }
            });
    }

    render() {
        const {error, horizontal, vertical, errNotification, courses, loading} = this.state;

        return (
            <div className="main-root">
                <Header/>
                <main className='main-content-react'>
                    <Toolbar></Toolbar>
                    <div className='home-search'>
                        <Paper component="form" className='search-root'>
                            <InputBase
                                className='search-input'
                                placeholder="Explore Courses"
                                inputProps={{'aria-label': 'Explore Courses'}}
                            />
                            <IconButton type="submit" className='search-button' aria-label="search">
                                <SearchIcon/>
                            </IconButton>
                        </Paper>
                    </div>
                    {
                        loading ?
                            <div className="course-cards">
                                <CardSkeleton/>
                                <CardSkeleton/>
                            </div>
                            :
                            <CourseCard courses={courses}/>
                    }
                    {
                        <Snackbar
                            anchorOrigin={{vertical, horizontal}}
                            open={errNotification}
                            onClose={this.handleClose}
                            message={error}
                            key={vertical + horizontal}
                            className='snackbar'
                            action={
                                <React.Fragment>
                                    <IconButton size="small" aria-label="close" color="inherit"
                                                onClick={this.handleClose}>
                                        <CloseIcon fontSize="small"/>
                                    </IconButton>
                                </React.Fragment>
                            }
                        />
                    }
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className='svg-bottom'>
                        <path fill="#3F51B5" fillOpacity="1" d="M0,320L720,32L1440,160L1440,320L720,320L0,320Z"></path>
                    </svg>

                </main>
            </div>
        );
    }
}

Home.propTypes = {
    history: PropTypes.object.isRequired,
};

export default withRouter(Home);
