import React from 'react';
import svg from "../../../assets/images/illustrations/discussion-scene.svg";
import TeacherQuiz from "./TeacherQuiz";
import StudentQuiz from "./StudentQuiz";


const QuizModal = ({role}) => {
    return (
        <div id="quizModal" className="modal fade" tabIndex="-1" role="dialog"
             aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog space-top-2" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalCenterTitle">{role === 'teacher' ? 'Teacher': 'Student'}</h5>
                        <button type="button" className="btn btn-xs btn-icon btn-soft-secondary"
                                data-dismiss="modal" aria-label="Close">
                            <svg aria-hidden="true" width="10" height="10" viewBox="0 0 18 18"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path fill="currentColor"
                                      d="M11.5,9.5l5-5c0.2-0.2,0.2-0.6-0.1-0.9l-1-1c-0.3-0.3-0.7-0.3-0.9-0.1l-5,5l-5-5C4.3,2.3,3.9,2.4,3.6,2.6l-1,1 C2.4,3.9,2.3,4.3,2.5,4.5l5,5l-5,5c-0.2,0.2-0.2,0.6,0.1,0.9l1,1c0.3,0.3,0.7,0.3,0.9,0.1l5-5l5,5c0.2,0.2,0.6,0.2,0.9-0.1l1-1 c0.3-0.3,0.3-0.7,0.1-0.9L11.5,9.5z"/>
                            </svg>
                        </button>
                    </div>
                    <div className="modal-body">
                        {
                            role === 'teacher' ?  <TeacherQuiz/> : <StudentQuiz/>
                        }
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-white" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuizModal;