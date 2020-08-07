import React from "react";
import PropTypes from "prop-types";
import DefaultCourseImage from "../../../../assets/images/default-course-image.jpeg";
import GraphicsImage from "../../../../assets/images/components/graphics-1.svg";

const EnrollmentSummary = ({title, discounted_price, no_of_lessons, duration, short_description, image_urls}) => {
    const imageUrl = image_urls['220x148'] || DefaultCourseImage;
    return (
        <>
            <img className="card-img-top p-1" src={imageUrl} alt={title}/>
            <div className="card-body">
                <div className="align-items-center mb-2">
                    <span className="d-block text-dark font-weight-bold font-size-3">{title}</span>
                    <span className="d-block text-body font-size-1">{short_description}</span>
                </div>
                <span className="text-body small">
              <span>
              <i className="fas fa-chalkboard mr-2"></i>{no_of_lessons} lectures
            </span>
            <span className='ml-1 mr-1'>|</span>
            <span>
                  <i className="fas fa-clock mr-2"></i>{duration}
            </span>
            </span>
                <span className="d-block text-body font-size-2 mt-2"><span className='text-warning font-weight-bold'>$ {discounted_price}</span></span>
            </div>
        </>
    )
};

EnrollmentSummary.propTypes = {
    title: PropTypes.string.isRequired,
    discounted_price: PropTypes.number,
    no_of_lessons: PropTypes.number.isRequired,
    duration: PropTypes.string.isRequired,
    short_description: PropTypes.string.isRequired,
    image_urls: PropTypes.object.isRequired,
}

export default EnrollmentSummary;
