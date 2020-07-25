import React from "react";
import PropTypes from "prop-types";
import WithLoading from "../common/WithLoading";
import ChapterList from "./classroom/sidebar/ChapterList";
import ClassRoomBody from "./ClassRoomBody";

export const ClassRoomContent = ({navigateToCourseContent, navigateToAssignmentContent, course, params}) => {
    const {reviews, chapters} = course;
    return (
        <main id="content" role="main">
            <div className='enrolled-classroom'>
                <div className="row">
                    <div className="col-md-5 col-lg-4">
                        <ChapterList chapters={chapters}
                                     navigateToCourseContent={navigateToCourseContent}
                                     navigateToAssignmentContent={navigateToAssignmentContent}
                        />
                    </div>
                    <div className="col-md-7 col-lg-8">
                        <ClassRoomBody params={params} course={course} />
                    </div>
                </div>
                <div>
                    {JSON.stringify(reviews)}
                </div>
            </div>
        </main>
    );
};

ClassRoomContent.propTypes = {
    navigateToCourseContent: PropTypes.func.isRequired,
    navigateToAssignmentContent: PropTypes.func.isRequired,
    course: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
};

export default WithLoading(ClassRoomContent);
