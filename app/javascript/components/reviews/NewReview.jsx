import React from "react";
import PropTypes from "prop-types";
import Avatar from '@material-ui/core/Avatar';
import {isEmpty} from "../../utils/utils";

import avatar from '../../../assets/images/components/160x160/img2.jpg'

import Rating from './Rating'

export default class NewReview extends React.Component {
    state = {
        rating: 0,
        comment: '',
        err: false,
        posted: false,
    };

    handleCommentChange = (event) => {
        this.setState({comment: event.target.value})
    }

    handleAlertClose = () => {
        this.setState({err: false})
    }

    setRating = rating => {
        this.setState({rating: rating});
    };

    submitReview = () => {
        const {rating, comment, err} = this.state;
        !isEmpty(comment) && !isEmpty(rating) ? this.props.submitReview(rating, comment) : this.setState({err: true});
        this.setState({rating: 0, comment: '', posted: true});
    }

    render() {
        const {comment, err, posted} = this.state;
        const {setReviewShow} = this.props;
        return (
            <div className="card mt-3">
                <div className='row container space-1'>
                    <div className="col-md-12">
                        {err &&
                        <div className="alert alert-soft-danger alert-dismissible fade show mb-4" role="alert">
                            <strong>Review Empty!</strong> Please enter a review to post.
                            <button type="button" className="close btn-sm btn-pill" data-dismiss="alert"
                                    aria-label="Close"
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
                            <label className="d-flex align-items-center pt-1 h6"
                                   htmlFor="review">Rating</label>
                            <Rating
                                numberOfStars="5"
                                currentRating="0"
                                onClick={this.setRating}
                                posted={posted}
                            />
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
