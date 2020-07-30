import React from "react";
import PropTypes from "prop-types";
import {isEmpty} from "../../utils/utils";
import StarRating from './StarRating'
import Avatar from "../common/Avatar";

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
                            <label className="input-label d-flex align-items-center" htmlFor="review">
                                <Avatar />
                                <span className='text-body font-weight-bold ml-3'>User Name</span>
                            </label>
                            <div className="form-group d-flex">
                                <StarRating
                                    numberOfStars="5"
                                    currentRating="0"
                                    onClick={this.setRating}
                                    posted={posted}
                                />
                            </div>
                            <textarea type="textarea" id="review" className="form-control" value={comment}
                                      onChange={this.handleCommentChange}
                                      rows={4}
                                      placeholder="Write your review..."/>
                        </div>

                        <div className='float-right'>
                            <button
                                type="submit"
                                className='btn btn-primary justify-content-end'
                                onClick={this.submitReview}>
                                Submit
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
        );
    }
}

NewReview.propTypes = {
    submitReview: PropTypes.func.isRequired,
    setReviewShow: PropTypes.func.isRequired,
};
