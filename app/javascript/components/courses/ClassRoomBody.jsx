import React from "react";
import PropTypes from "prop-types";
import WithLoading from "../common/WithLoading";
import ChapterList from "./classroom/ChapterList";

export const ClassRoomBody = ({chapters, navigateToCourseContent, navigateToAssignmentContent, body, reviews}) => {
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
                        {body}
                    </div>
                </div>
                <div>
                    {JSON.stringify(reviews)}
                </div>
            </div>
        </main>
    );
};

ClassRoomBody.propTypes = {
    navigateToCourseContent: PropTypes.func.isRequired,
    navigateToAssignmentContent: PropTypes.func.isRequired,
    body: PropTypes.string,
    reviews: PropTypes.array,
    chapters: PropTypes.array,
};

export default WithLoading(ClassRoomBody);
