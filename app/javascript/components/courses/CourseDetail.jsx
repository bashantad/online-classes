import React, {Fragment} from "react";
import {Link} from "react-router-dom";
import {withRouter} from 'react-router';
import PropTypes from "prop-types";
import Header from '../../components/Header';
import courseApi from "../../apis/courseApi";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from '@material-ui/core/Grid';
import Paper from "@material-ui/core/Paper";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Snackbar from '@material-ui/core/Snackbar';
import Rating from '@material-ui/lab/Rating';
import SendIcon from '@material-ui/icons/Send';
import CloseIcon from '@material-ui/icons/Close';
import FormControl from '@material-ui/core/FormControl';
import Skeleton from '@material-ui/lab/Skeleton';
import Comment from "../common/Comment";


export class CourseDetail extends React.Component {
    state = {
        course: null,
        loading: true,
        rating: '',
        message: '',
        errNotification: false,
        vertical: 'bottom',
        horizontal: 'right',
    }

    _getCourseId = () => {
        return this.props.match.params.course_id;
    }

    componentDidMount() {
        courseApi.getById(this._getCourseId())
            .then(res => res.json())
            .then(response => {
                this.setState({course: response, loading: false});
            }).catch(err => {
            this.setState({loading: false, error: 'Something went wrong'});
        });
    }

    submitReview = () => {
        this.state.message === '' ?
            this.setState({errNotification: true})
            :
        courseApi.reviews(this._getCourseId()).create({
            rating: this.state.rating, comment: this.state.message
        })
            .then(res => res.json())
            .then(response => {
                const {course} = this.state;
                const reviews = [response, ...course.reviews];
                course.reviews = reviews;
                this.setState({course: course})
            });
    }

    render() {
        const {course, rating, message,errNotification, vertical, horizontal} = this.state;
        const reviews = course && course.reviews;
        const handleChange = (event) => {
            this.setState({message: event.target.value})
        };

        const handleClose = () => {
            this.setState({errNotification: false});
        };

        return (
            <div className="main-root">
                <Header/>
                <main className='main-content-react'>
                    <Toolbar></Toolbar>
                    <Paper className='course-detail-paper'>
                        <div className='course-cover'>
                            <Grid container>
                                <Grid item xs={12} sm={6}>
                                    <img
                                        src='https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80'
                                        alt=''/>
                                </Grid>
                                <Grid item xs={12} sm={6} className='course-details'>
                                    <Grid container className='first-grid'>
                                        <Grid item xs={12}>
                                            <Typography variant="h5" gutterBottom>
                                                {course && course.title}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="subtitle1" gutterBottom>
                                                For: <span>{course && course.course_for}</span>
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} className='course-owner-details'>
                                            <Grid container>
                                                <Grid item xs={2}>
                                                    <Avatar alt={course && course.owner.full_name}
                                                            src={course && course.owner.avatar_image_urls}/>
                                                </Grid>
                                                <Grid item xs={8} className='course-margin-top'>
                                                    <Typography variant="body1" gutterBottom>
                                                        {course && course.owner.full_name}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} className='price-box'>
                                            <Typography variant="h6" gutterBottom className='course-margin-top'>
                                                <span> ${course && course.price}</span>
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Typography variant="subtitle1" gutterBottom>
                                        Description: <span>{course && course.body}</span>
                                    </Typography>
                                </Grid>
                            </Grid>
                        </div>
                        <Divider/>
                        <div className="comments">
                            <Grid container>
                                <Grid item xs={12} sm={1} className='comment-avatar'>
                                    <Avatar alt="Remy Sharp" src=""/>
                                </Grid>
                                <Grid item xs={12} sm={9}>
                                    <FormControl>
                                        <Grid container>
                                            <Grid item xs={12}>
                                                <TextField id="standard-basic" label="Add Comment..." name='comment' multiline rows={4}
                                                           onChange={handleChange}/>
                                            </Grid>
                                            <Grid item xs={12} className='rating'>
                                                <Typography variant="caption" gutterBottom className='rate-course'>
                                                    Rate Course:
                                                </Typography>

                                                <Rating
                                                    name="simple-controlled"
                                                    // value={rating}
                                                    onChange={(event, newValue) => {
                                                        this.setState({rating: newValue})
                                                    }}
                                                />
                                            </Grid>
                                        </Grid>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        className='comment-send-btn'
                                        startIcon={<SendIcon/>}
                                        type="submit"
                                        onClick={this.submitReview}>
                                        Post
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                        <Divider/>
                        {
                            reviews === null ?
                                <div className='comment-loading'>
                                    <Skeleton/>
                                    <Skeleton/>
                                    <Skeleton/>
                                </div>
                                :
                                <Comment reviews={reviews}/>
                        }

                    </Paper>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className='svg-bottom'>
                        <path fill="#3F51B5" fillOpacity="1" d="M0,320L720,32L1440,160L1440,320L720,320L0,320Z"></path>
                    </svg>
                    <Snackbar
                        anchorOrigin={{vertical, horizontal}}
                        open={errNotification}
                        onClose={handleClose}
                        autoHideDuration={6000}
                        message={'Please type a message.'}
                        key={vertical + horizontal}
                        className='comment-snackbar'
                        action={
                            <>
                                <IconButton size="small" aria-label="close" color="inherit"
                                            onClick={handleClose}>
                                    <CloseIcon fontSize="small"/>
                                </IconButton>
                            </>
                        }
                    />
                </main>
            </div>
        );
    }
}

CourseDetail.propTypes = {
    history: PropTypes.object.isRequired,
};

export default withRouter(CourseDetail);
