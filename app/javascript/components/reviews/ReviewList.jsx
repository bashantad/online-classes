import React, {useState} from 'react';
import {isEmpty} from '../../utils/utils'

import noReview from '../../../assets/images/icons/icon-4.svg'
import avatar from '../../../assets/images/components/160x160/img1.jpg'
import NewReview from "./NewReview";
import StarView from "./StarView";
import Avatar from "../common/Avatar";

const ReviewList = ({reviews, submitReview}) => {
    const [showReviewForm, setShowReviewForm] = useState(false)

    return (
        <div className="border-top pt-4 mt-7 mb-4">
            <div className="row justify-content-md-between align-items-md-center">
                <div className="col-md-6 d-flex">
                    <h3 className="mb-0">Reviews</h3>
                    {
                        submitReview ?
                            <button type="button" data-toggle="collapse"
                                    data-target="#reviewForm" aria-expanded="false"
                                    aria-controls="reviewForm"
                                    onClick={() => setShowReviewForm(!showReviewForm)}
                                    className="btn btn-xs btn-outline-primary font-weight-bold text-nowrap ml-3">
                                <i className='fas fa-plus mr-1'></i>
                                Write a review
                            </button> : ''
                    }
                </div>

                <div className="col-md-5">
                    <form className="input-group input-group-sm">
                        <input type="search" className="form-control" placeholder="Search reviews"
                               aria-label="Search reviews"/>
                        <div className="input-group-append">
                            <button type="button" className="btn btn-primary">
                                <i className="fa fa-search"></i>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            {
                showReviewForm ?
                    <div className="review-form">
                        <NewReview submitReview={submitReview} setReviewShow={setShowReviewForm}/>
                    </div>
                : ''
            }

            {
                isEmpty(reviews) ?
                <div>
                    <figure className="max-w-8rem mx-auto mt-8">
                        <img className="img-fluid" src={noReview} alt="SVG"/>
                    </figure>
                    <div className="mx-auto custom-align-center">No Reviews</div>
                </div> :
                reviews && reviews.map(review => (
                    <div className="pt-5 mt-5" key={`review-item-${review.id}`}>
                        <div className="row mb-2">
                            <div className="col-lg-4 mb-3 mb-lg-0">

                                <div className="media align-items-center">
                                    <Avatar imageUrl={review.user.avatar_image_urls['60x40']} />
                                    <div className="media-body">
                                        <span className="d-block text-body font-size-1">{review.created_at}</span>
                                        <h4 className="mb-0">{review.user.full_name}</h4>
                                    </div>
                                </div>

                            </div>

                            <div className="col-lg-8">
                                <StarView noOfStars={review.rating} />
                                <p>{review.comment}</p>
                            </div>
                        </div>

                        <div className="font-size-1">
                            <span>Was this helpful?</span>
                            <span className="ml-2">
                                  <a className="btn btn-xs btn-outline-secondary" href="#">Yes</a>
                            </span>
                            <span className="ml-2">
                                  <a className="btn btn-xs btn-outline-secondary" href="#">No</a>
                            </span>
                            <span className="ml-3">
                                  <i className="far fa-flag text-body mr-1"></i>
                                  <a className="text-muted" href="#">Report</a>
                            </span>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default ReviewList;