import React from "react";
import PropTypes from "prop-types";

const AssignmentContent = ({question, assignmentId, points, dueDate, chapterId, navigateToAssignmentContent}) => {
    return (
        <div onClick={() => navigateToAssignmentContent(chapterId, assignmentId)}>
            {question} - {points} - {dueDate}
        </div>
    );
}

AssignmentContent.propTypes = {
    question: PropTypes.string.isRequired,
    assignmentId: PropTypes.number.isRequired,
    points: PropTypes.number.isRequired,
    dueDate: PropTypes.string.isRequired,
    chapterId: PropTypes.number.isRequired,
    navigateToAssignmentContent: PropTypes.func.isRequired,
}

export default AssignmentContent;
