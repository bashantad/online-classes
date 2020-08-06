import React from 'react';
import PropTypes from 'prop-types';

import avatar from '../../../assets/images/components/160x160/img1.jpg'

const AboutInstructor = ({avatar_image_urls, educations, experiences, full_name, linkedin_url, short_bio, twitter_url}) => {
    return (
        <div className="border-top pt-7 mt-7">
            <h3 className="mb-4">About the instructor</h3>

            <div className="row">
                <div className="col-lg-4 mb-4 mb-lg-0">
                    <div className="avatar avatar-xl avatar-circle mb-3">
                        <img className="avatar-img"
                             src={avatar}
                             alt="Image Description"/>
                    </div>


                    <div className="media text-body font-size-1 mb-2">
                        <div className="min-w-3rem text-center mr-2">
                            <i className="fa fa-star"></i>
                        </div>
                        <div className="media-body">
                            4.87 Instructor rating
                        </div>
                    </div>


                    <div className="media text-body font-size-1 mb-2">
                        <div className="min-w-3rem text-center mr-2">
                            <i className="fa fa-comments"></i>
                        </div>
                        <div className="media-body">
                            1,533 reviews
                        </div>
                    </div>


                    <div className="media text-body font-size-1 mb-2">
                        <div className="min-w-3rem text-center mr-2">
                            <i className="fa fa-user"></i>
                        </div>
                        <div className="media-body">
                            23,912 students
                        </div>
                    </div>

                    <div className="media text-body font-size-1 mb-2">
                        <div className="min-w-3rem text-center mr-2">
                            <i className="fa fa-play"></i>
                        </div>
                        <div className="media-body">
                            29 courses
                        </div>
                    </div>
                </div>

                <div className="col-lg-8">
                    <div className="mb-2">
                        <h4 className="h5 mb-1"><a href="author.html">Nataly Gaga</a></h4>
                        <span
                            className="d-block font-size-1 font-weight-bold">Head of Data Science, Pierian Data Inc.</span>
                    </div>

                    <p>Nataly Gaga has a BS and MS in Mechanical Engineering from Santa
                        Clara
                        University and
                        years of experience as a professional instructor and trainer for
                        Data
                        Science and
                        programming. She has publications and patents in various fields such
                        as
                        microfluidics,
                        materials science, and data science technologies.</p>
                </div>
            </div>
        </div>
    );
};

AboutInstructor.propTypes = {
    avatar_image_urls: PropTypes.object.isRequired,
    educations: PropTypes.array.isRequired,
    experiences: PropTypes.array.isRequired,
    full_name: PropTypes.string.isRequired,
    linkedin_url: PropTypes.string,
    short_bio: PropTypes.string,
    twitter_url: PropTypes.string,
}

export default AboutInstructor;
