import React from "react";
import PropTypes from "prop-types";
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import Rating from '@material-ui/lab/Rating';
import {isEmpty} from "../../utils/utils";

import avatar from '../../../assets/images/components/160x160/img2.jpg'

export default class NewReview extends React.Component {
    state = {
        rating: 0,
        comment: '',
        err: false
    };

    handleCommentChange = (event) => {
        this.setState({comment: event.target.value})
    }

    handleRatingChange = (event) => {
        this.setState({rating: event.target.value})
    }

    handleAlertClose = () => {
        this.setState({err: false})
    }
    submitReview = () => {
        const {rating, comment, err} = this.state;
        !isEmpty(comment) ? this.props.submitReview(rating, comment) : this.setState({err: true});
        this.setState({rating: 0, comment: ''});
    }

    render() {
        const {comment, err} = this.state;
        const {setReviewShow} = this.props;
        return (
            <div className="card mt-3">
                <div className='row container space-1'>
                    <div className="col-md-12">
                        {err &&
                        <div className="alert alert-soft-danger alert-dismissible fade show mb-4" role="alert">
                            <strong>Review Empty!</strong> Please enter a review to post.
                            <button type="button" className="close btn-sm btn-pill" data-dismiss="alert" aria-label="Close"
                                    onClick={this.handleAlertClose}>
                                <i className='fa fa-times-circle mt-1'></i>
                            </button>
                        </div>
                        }
                        <div className="form-group">
                            <label className="input-label d-flex align-items-center" htmlFor="review"> <Avatar
                                alt="Remy Sharp" src={avatar}/> <span className='text-body font-weight-bold ml-3'>User Name</span></label>
                            <input type="textarea" id="review" className="form-control" value={comment}
                                   onChange={this.handleCommentChange}
                                   placeholder="Enter Review"/>
                        </div>

                        <div className="form-group d-flex">
                            <label className="input-label d-flex align-items-center pt-2"
                                   htmlFor="review">Rating</label>

                            <div className="form-check form-check-inline ml-4">
                                <div className="custom-control custom-radio">
                                    <input type="radio" id="1" className="custom-control-input" value={1}
                                           onClick={this.handleRatingChange}
                                           name="customInlineRadio"/>
                                    <label className="custom-control-label"
                                           htmlFor="1">Poor</label>
                                </div>
                            </div>
                            <div className="form-check form-check-inline">
                                <div className="custom-control custom-radio">
                                    <input type="radio" id="2" onClick={this.handleRatingChange}
                                           value={2}
                                           className="custom-control-input indeterminate-checkbox"
                                           name="customInlineRadio"/>
                                    <label className="custom-control-label"
                                           htmlFor="2">Satisfactory</label>
                                </div>
                            </div>
                            <div className="form-check form-check-inline">
                                <div className="custom-control custom-radio">
                                    <input type="radio" id="3" onClick={this.handleRatingChange}
                                           value={3}
                                           className="custom-control-input indeterminate-checkbox"
                                           name="customInlineRadio"/>
                                    <label className="custom-control-label"
                                           htmlFor="3">Average</label>
                                </div>
                            </div>
                            <div className="form-check form-check-inline">
                                <div className="custom-control custom-radio">
                                    <input type="radio" id="4" onClick={this.handleRatingChange}
                                           value={4}
                                           className="custom-control-input indeterminate-checkbox"
                                           name="customInlineRadio"/>
                                    <label className="custom-control-label"
                                           htmlFor="4">Good</label>
                                </div>
                            </div>
                            <div className="form-check form-check-inline">
                                <div className="custom-control custom-radio">
                                    <input type="radio" id="5" onClick={this.handleRatingChange}
                                           value={5}
                                           className="custom-control-input indeterminate-checkbox"
                                           name="customInlineRadio"/>
                                    <label className="custom-control-label"
                                           htmlFor="5">Excellent</label>
                                </div>
                            </div>
                        </div>
                        <div className='float-right'>
                            <button
                                type="submit"
                                className='btn btn-primary justify-content-end'
                                onClick={this.submitReview}>
                                Post
                            </button>
                            <button
                                className='btn btn-ghost-secondary justify-content-end ml-2'
                                onClick={() => setReviewShow(false)}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            // <FormControl>
            //     <Grid container>
            //         <Grid item xs={12}>
            //             <TextField id="standard-basic" label="Add Comment..." name='comment' multiline
            //                        rows={4}
            //                        onChange={this.handleCommentChange} value={comment}/>
            //         </Grid>
            //         <Grid item xs={12} className='rating'>
            //             <Typography variant="caption" gutterBottom className='rate-course'>
            //                 Rate Course:
            //             </Typography>
            //
            //             <Rating
            //                 name="simple-controlled"
            //                 value={rating}
            //                 onChange={this.handleRatingChange}
            //             />
            //         </Grid>
            //     </Grid>
            // </FormControl>

        );
    }
}

NewReview.propTypes = {
    submitReview: PropTypes.func.isRequired,
    setReviewShow: PropTypes.func.isRequired,
};
