import React from "react";
import PropTypes from "prop-types";

import CourseCard from "../common/CourseCard";
import WithLoading from "../common/WithLoading";

const CourseListView = ({ courses, handleEnroll, handleDetails }) => {
    return <div className="container space-sm-2 space-bottom-lg-3">
        <div className="w-md-80 text-center mx-md-auto mb-9">
            <h2>Featured courses</h2>
            <p>Discover your perfect program in our courses.</p>
        </div>
        {
            <div className="course-cards">
                {
                    courses.map((course, index) =>
                        <CourseCard
                            key={`course-item-${index}`}
                            isEnrolled={false}
                            key={`course-${index}-card`}
                            course={course}
                            handleButtonClick={handleEnroll}
                            handleDetails={handleDetails}/>
                    )
                }
            </div>
        }
    </div>;
}

CourseListView.propTypes = {
    courses: PropTypes.array.isRequired,
    handleEnroll: PropTypes.func.isRequired,
    handleDetails: PropTypes.func.isRequired,
}

export default WithLoading(CourseListView);
