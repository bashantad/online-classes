import React, {Fragment} from "react";
import {Link} from "react-router-dom";
import {withRouter} from 'react-router';
import PropTypes from "prop-types";
import courseApi from "../../apis/courseApi";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from '@material-ui/core/Grid';
import Paper from "@material-ui/core/Paper";
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import Skeleton from '@material-ui/lab/Skeleton';
import ReviewList from "../reviews/ReviewList";
import NewReview from "../reviews/NewReview";

export class CourseDetail extends React.Component {
    state = {
        course: null,
        loading: true,
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

    submitReview = (rating, comment) => {
        courseApi.reviews(this._getCourseId()).create({
            rating: rating,
            comment: comment,
        })
        .then(res => res.json())
        .then(response => {
            const {course} = this.state;
            const reviews = [response, ...course.reviews];
            course.reviews = reviews;
            this.setState({course: course})
        });
    }

    handleClose = () => {
        this.setState({errNotification: false});
    };

    render() {
        const {course, errNotification, vertical, horizontal} = this.state;
        const reviews = course && course.reviews;

        return (
            <div className="main-root">
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
                        <NewReview submitReview={this.submitReview} />
                        <Divider/>
                        {
                            reviews === null ?
                                <div className='comment-loading'>
                                    <Skeleton/>
                                    <Skeleton/>
                                    <Skeleton/>
                                </div>
                                :
                                <ReviewList reviews={reviews}/>
                        }

                    </Paper>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className='svg-bottom'>
                        <path fill="#3F51B5" fillOpacity="1" d="M0,320L720,32L1440,160L1440,320L720,320L0,320Z"></path>
                    </svg>
                    <Snackbar
                        anchorOrigin={{vertical, horizontal}}
                        open={errNotification}
                        onClose={this.handleClose}
                        autoHideDuration={6000}
                        message={'Please type a message.'}
                        key={vertical + horizontal}
                        className='comment-snackbar'
                        action={
                            <>
                                <IconButton size="small" aria-label="close" color="inherit"
                                            onClick={this.handleClose}>
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
