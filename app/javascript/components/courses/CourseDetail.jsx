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
                    <div className="position-relative">
                        <div className="gradient-y-overlay-lg-white bg-img-hero space-2 course-detail-bg-img">
                        <div className="container space-top-2">
                            <div className="row">
                                <div className="col-md-7 col-lg-8">
                                    <small
                                        className="btn btn-xs btn-success btn-pill text-uppercase mb-2">{course && course.course_for}</small>
                                    <h1 className="text-lh-sm">{course && course.title}</h1>
                                    <p>{course && course.body}</p>

                                    <div className="d-flex align-items-center flex-wrap">
                                        <div className="d-flex align-items-center mr-4">
                                            <div className="avatar-group">
                                         <span className="avatar avatar-xs avatar-circle">
                                          <img className="avatar-img" src="../../assets/components/160x160/img1.jpg"
                                               alt="Image Description"/>
                                          </span>
                                            </div>
                                            <span className="pl-2">Created by <a className="link-underline"
                                                                                 href="#">{course && course.owner.full_name}</a></span>
                                        </div>
                                        <div className="d-flex align-items-center flex-wrap">
                                            <li className="list-inline-item mx-0"><img
                                                src="../../assets/illustrations/star.svg" alt="Review rating"
                                                width="14"/></li>
                                            <li className="list-inline-item mx-0"><img
                                                src="../../assets/illustrations/star.svg" alt="Review rating"
                                                width="14"/></li>
                                            <li className="list-inline-item mx-0"><img
                                                src="../../assets/illustrations/star.svg" alt="Review rating"
                                                width="14"/></li>
                                            <li className="list-inline-item mx-0"><img
                                                src="../../assets/illustrations/star.svg" alt="Review rating"
                                                width="14"/></li>
                                            <li className="list-inline-item mx-0"><img
                                                src="../../assets/illustrations/star.svg" alt="Review rating"
                                                width="14"/></li>

                                            <span className="d-inline-block">
                                            <span className="text-dark font-weight-bold mr-1">4.87</span>
                                            <span className="text-muted">(1.5k+ reviews)</span>
                                          </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
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
