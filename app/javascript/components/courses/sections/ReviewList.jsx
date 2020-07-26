import React from 'react';
import {isEmpty} from '../../../utils/utils'

const ReviewList = ({reviews}) => {
    return (
        <div className="border-top pt-7 mt-7">
            <div className="row justify-content-md-between align-items-md-center">
                <div className="col-md-6">
                    <h3 className="mb-0">Reviews</h3>
                </div>
                <div className="col-md-6">
                    <form className="input-group input-group-sm">
                        <input type="search" className="form-control"
                               placeholder="Search reviews"
                               aria-label="Search reviews"/>
                        <div className="input-group-append">
                            <button type="button" className="btn btn-primary">
                                <i className="fa fa-search"></i>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            {isEmpty(reviews) ?
                <div>
                    <figure className="max-w-8rem mx-auto mt-8">
                        <img className="img-fluid" src="../../assets/icons/icon-4.svg" alt="SVG"/>
                    </figure>
                    <div className="mx-auto custom-align-center">No Reviews</div>
                </div> :
                reviews && reviews.map(review => (
                    <div className="pt-5 mt-5" key={review.id}>
                        <div className="row mb-2">
                            <div className="col-lg-4 mb-3 mb-lg-0">

                                <div className="media align-items-center">
                                    <div className="avatar avatar-circle mr-3">
                                        <img className="avatar-img"
                                             src={isEmpty(review.user.avatar_image_urls) ? '../../assets/components/160x160/img1.jpg' : review.user.avatar_image_urls['60x40']}
                                             alt={review.user.full_name}/>
                                    </div>
                                    <div className="media-body">
                                        <span className="d-block text-body font-size-1">April 3, 2019</span>
                                        <h4 className="mb-0">{review.user.full_name}</h4>
                                    </div>
                                </div>

                            </div>

                            <div className="col-lg-8">
                                <ul className="list-inline mb-2">
                                    <li className="list-inline-item mx-0"><img
                                        src="../../assets/illustrations/star.svg"
                                        alt="Review rating"
                                        width="16" height="16"/></li>
                                    <li className="list-inline-item mx-0"><img
                                        src="../../assets/illustrations/star.svg"
                                        alt="Review rating"
                                        width="16" height="16"/></li>
                                    <li className="list-inline-item mx-0"><img
                                        src="../../assets/illustrations/star.svg"
                                        alt="Review rating"
                                        width="16" height="16"/></li>
                                    <li className="list-inline-item mx-0"><img
                                        src="../../assets/illustrations/star.svg"
                                        alt="Review rating"
                                        width="16" height="16"/></li>
                                    <li className="list-inline-item mx-0"><img
                                        src="../../assets/illustrations/star.svg"
                                        alt="Review rating"
                                        width="16" height="16"/></li>
                                </ul>

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

            <div className="border-top text-center pt-5 mt-5">
                <a className="btn btn-sm btn-outline-primary transition-3d-hover" href="#">See all Reviews</a>
            </div>
        </div>
    );
};

export default ReviewList;