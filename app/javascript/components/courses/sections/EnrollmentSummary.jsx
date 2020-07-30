import React from "react";
import PropTypes from "prop-types";
import DefaultCourseImage from "../../../../assets/images/default-course-image.jpeg";

const EnrollmentSummary = ({title, discounted_price, no_of_lessons, duration, short_description, image_urls}) => {
    const imageUrl = image_urls['220x148'] || DefaultCourseImage;
    return (
        <div>
            <div>
            <img className="card-img-top" src={imageUrl} alt="Image Description"/>
            </div>
          <h3>
            {title}
          </h3>
          <div>
            {short_description}
          </div>
          <div>
            {no_of_lessons} lessons
          </div>
          <div>
            Course fee: ${discounted_price}
          </div>
          <div>
            Duration: {duration}
          </div>
        </div>
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
