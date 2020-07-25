import React from 'react';
import PropTypes from 'prop-types';

const AssignmentBody = ({chapterTitle, question, instructions, points, due_date}) => {
    return (
        <div className='assignment-body'>
            <h3>{chapterTitle}</h3>
            <h4>{question}</h4>
            <div>Total points: <span>{points}</span></div>
            <div>Due date: <span>{due_date}</span></div>
            <div>
                {instructions}
            </div>
        </div>
    )
}

AssignmentBody.propTypes = {
    question: PropTypes.string.isRequired,
    instructions: PropTypes.string.isRequired,
    points: PropTypes.number.isRequired,
    due_date: PropTypes.string.isRequired,
    chapterTitle: PropTypes.string.isRequired,
}

export default AssignmentBody;
