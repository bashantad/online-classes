import PropTypes from "prop-types";
import React from "react";
import WithLoading from "../../../common/WithLoading";

const AssignmentBody = ({chapterTitle, question, points, dueDate, instructionsHtml}) => {
    return <div className='assignment-body'>
        <h3>{chapterTitle}</h3>
        <h4>{question}</h4>
        <div>Total points: <span>{points}</span></div>
        <div>Due date: <span>{dueDate}</span></div>
        <div>
            {instructionsHtml}
        </div>
    </div>;
}

AssignmentBody.propTypes = {
    chapterTitle: PropTypes.any,
    question: PropTypes.any,
    points: PropTypes.any,
    dueDate: PropTypes.any,
    instructionsHtml: PropTypes.any
};

export default WithLoading(AssignmentBody);

