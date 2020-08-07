import PropTypes from "prop-types";
import React from "react";
import WithLoading from "../../../common/WithLoading";
import RenderHtml from "../../../common/RenderHtml";

import assignmentSvg from '../../../../../assets/images/illustrations/support-man.svg'

const AssignmentBody = ({chapterTitle, question, points, dueDate, instructionsHtml}) => {
    return <>
        <div className="card-header">
            <h4 className="card-title mb-2">{chapterTitle} - Assignment</h4>
        </div>
        <div className="card-body">
            <div className="card card-bordered h-100 overflow-hidden p-5">
                <div className="w-65 pr-2">
                    <h4>{question}</h4>
                    <RenderHtml body={instructionsHtml}/>
                    <div className='mt-4'><small>Total points: <span>{points}</span></small></div>
                    <div><small>Due date: <span>{dueDate}</span></small></div>
                </div>
                <div className="position-absolute right-0 w-50 mt-2 d-lg-block d-none">
                    <figure className="w-lg-40 mx-auto">
                        <img className="img-fluid" src={assignmentSvg} alt="Assignment"/>
                    </figure>
                </div>
            </div>
        </div>
    </>
        ;
}

AssignmentBody.propTypes = {
    chapterTitle: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    points: PropTypes.number.isRequired,
    dueDate: PropTypes.string.isRequired,
    instructionsHtml: PropTypes.string.isRequired,
};

export default WithLoading(AssignmentBody);

