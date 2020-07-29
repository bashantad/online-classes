import React from "react";
import PropTypes from "prop-types";

const Assignment = ({question, assignmentId, points, dueDate, chapterId, navigateToAssignmentContent}) => {
    return (
        <li className="nav-item">
            <a type='button' className="nav-link" onClick={() => navigateToAssignmentContent(chapterId, assignmentId)}>
                <i className="fas fa-pencil-alt nav-icon"></i>
                {question} - {points} - {dueDate}
            </a>
        </li>
    );
}

Assignment.propTypes = {
    question: PropTypes.string.isRequired,
    assignmentId: PropTypes.number.isRequired,
    points: PropTypes.number.isRequired,
    dueDate: PropTypes.string.isRequired,
    chapterId: PropTypes.number.isRequired,
    navigateToAssignmentContent: PropTypes.func.isRequired,
}

export default Assignment;
