import React, {Fragment} from "react";
import {Link} from "react-router-dom";
import {withRouter} from 'react-router';
import PropTypes from "prop-types";

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Toolbar from "@material-ui/core/Toolbar";
import Rating from '@material-ui/lab/Rating';

import Header from '../components/Header';
import '../packs/index.scss'
import callApi from "../apis/callApi";

export class Home extends React.Component {
    state = {
        error: '',
        vertical: 'bottom',
        horizontal: 'right',
        open: false,
    }

    handleRoomCreateClick = () => {
        callApi.create()
            .then(res => res.json())
            .then(response => {
                if (response.error) {
                    this.setState({error: response.error});
                    this.setState({open: true})
                } else {
                    const {user_id, calling_code} = response;
                    const callUrl = `/calls/${user_id}/join/${calling_code}`
                    this.props.history.push(callUrl);
                }
            });
    }

    handleClose = () => {
        console.log(this.state.open)
        this.setState({open: false});
    };

    render() {
        const {error, horizontal, vertical, open} = this.state;
        const courses = [
            {
                name: 'Applied Science',
                cover: 'https://images.unsplash.com/photo-1567427018141-0584cfcbf1b8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
                id: 'AS12',
                desc: 'Neque porro quisquam.',
                call: true,
                messages: true,
                video: true,
                rating: 2,
            },
            {
                name: 'Astronomy',
                cover: 'https://images.unsplash.com/photo-1515651571008-95427bed8e0b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1373&q=80',
                id: 'AS12',
                desc: 'Neque porro.',
                call: true,
                messages: true,
                video: true,
                rating: 4,
            },
            {
                name: 'Deep Learning',
                cover: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80',
                id: 'AS12',
                desc: 'Neque porro quisquam est qui.',
                call: true,
                messages: true,
                video: true,
                rating: 3.5,
            }, {
                name: 'Nano Science',
                cover: 'https://images.unsplash.com/photo-1535127022272-dbe7ee35cf33?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
                id: 'AS12',
                desc: 'Neque porro quisquam.',
                call: true,
                messages: true,
                video: true,
                rating: 4.5,
            }, {
                name: 'Hydro Mechanics',
                cover: 'https://images.unsplash.com/photo-1558652862-e6cf47acff59?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
                id: 'AS12',
                desc: 'Neque porro quisquam est.',
                call: true,
                messages: true,
                video: true,
                rating: 2,
            },
        //     {
        //         name: 'React JS',
        //         cover: 'https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1476&q=80',
        //         id: 'AS12',
        //         desc: 'Neque porro quisquam est qui.',
        //         call: true,
        //         messages: true,
        //         video: true,
        //     rating: 2,
        // },
        ]
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
                    <div className="course-cards">
                        { courses.map(card => (
                            <Card className='course-card-item'>
                                <CardActionArea>
                                    <CardMedia
                                        className='course-media'
                                        image={card.cover}
                                        title="Contemplative Reptile"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {card.name}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {card.desc}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <div className="rating">
                                    <Rating name="half-rating" defaultValue={card.rating} precision={0.5}/>
                                </div>

                                <CardActions>
                                    <Button size="small" color="primary">
                                        Call
                                    </Button>
                                    <Button size="small" color="primary">
                                        Messages
                                    </Button>
                                    <Button size="small" color="primary">
                                        Video
                                    </Button>
                                </CardActions>
                            </Card>
                        ))}
                    </div>

                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className='svg-bottom'>
                        <path fill="#3F51B5" fill-opacity="1" d="M0,320L720,32L1440,160L1440,320L720,320L0,320Z"></path>
                    </svg>

                    {/*other option*/}
                    {/*<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className='svg-bottom'>*/}
                    {/*    <path fill="#3F51B5" fill-opacity="1"*/}
                    {/*          d="M0,320L720,192L1440,160L1440,320L720,320L0,320Z"></path>*/}
                    {/*</svg>*/}

                    {/*<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className='svg-bottom'>*/}
                    {/*    <path fill="#3F51B5" fill-opacity="1"*/}
                    {/*          d="M0,320L120,309.3C240,299,480,277,720,245.3C960,213,1200,171,1320,149.3L1440,128L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"></path>*/}
                    {/*</svg>*/}
                    {/*----------*/}

                </main>
            </div>
        );
    }
}

Home.propTypes = {
    history: PropTypes.object.isRequired,
};

export default withRouter(Home);
