import React from 'react';
import PropTypes from 'prop-types';

import avatar from '../../../../assets/images/components/160x160/img1.jpg'
import teacher from '../../../../assets/images/illustrations/top-vendor.svg'
import {isEmpty} from "../../../utils/utils";

const endLabel = ({year_end}) => {
    return !!year_end ? year_end : 'Present';
}

const AboutInstructor = ({avatar_image_urls, educations, experiences, full_name, linkedin_url, short_bio, twitter_url, is_teacher,email}) => {
    return (
        <div className="border-top pt-7 mt-7">
            <h3 className="mb-4">About the instructor</h3>

            <div className="row">
                <div className="col-lg-3 mb-4 mb-lg-0">
                    <div className="avatar avatar-xl avatar-circle mb-3">
                        <img className="avatar-img"
                             src={isEmpty(avatar_image_urls) ? avatar: avatar_image_urls}
                             alt="Image Description"/>
                        {is_teacher ? <img className="bg-white position-absolute bottom-0 right-0 rounded-circle p-1"
                                           src={teacher} alt="Verified Teacher" width="28" height="28"
                                           title="Teacher"/> : ''}
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
                            <i className="fa fa-book-open"></i>
                        </div>
                        <div className="media-body">
                            29 courses
                        </div>
                    </div>
                </div>

                <div className="col-lg-9">
                    <div className="mb-3 border-bottom pb-2">
                        <span className='d-flex'>
                            <h4 className="h5 mb-1"><a href="author.html">{full_name}</a></h4>
                        <a href={linkedin_url} className='text-secondary' data-toggle="tooltip" data-placement="top" title="LinkedIn"><i className="fab fa-linkedin mr-2 ml-2"></i></a>
                        <a href={twitter_url} className='text-secondary' data-toggle="tooltip" data-placement="top" title="Twitter"><i className="fab fa-twitter"></i></a>
                        </span>
                        <span
                            className="d-block font-size-1 font-weight-bold">{isEmpty(email) ? '' : email}</span>
                        <span
                            className="d-block font-size-1 font-weight-bold">{isEmpty(short_bio) ? '' : short_bio}</span>
                    </div>

                    <h6><i className="fas fa-graduation-cap mr-1 text-body"></i>Qualifications</h6>
                    {educations.map(education => (
                        <span className="media-body">
                                    <h5 className="mb-1">
                                        {education.name_of_institution}, <span
                                        className='text-body h6'>{education.year_start} - {endLabel(education)}</span>
                                    </h5>
                                    <p className="mb-1">{education.title}, {education.location}, {education.country} </p>
                                </span>
                    ))}
                    <h6 className='mt-4'><i className="fas fa-briefcase mr-1 text-body"></i>Experience</h6>
                    {experiences.map(experience => (
                        <span className="media-body">
                                    <h5 className="mb-1">
                                        {experience.name_of_institution}, <span
                                        className='text-body h6'>{experience.year_start} - {endLabel(experience)}</span>
                                    </h5>
                                    <p className="mb-1">{experience.title}, {experience.location}, {experience.country} </p>
                                </span>
                    ))}
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
