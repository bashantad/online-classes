import React from 'react';

import svg from '../../../assets/images/illustrations/discussion-scene.svg'
import TeacherQuiz from "./TeacherQuiz";
import QuizModal from "./quizModal";

const Teacher = () => {
    return (
        <div class="container space-top-2">
            <div class="bg-light rounded overflow-hidden space-top-2 space-top-lg-1 pl-5 pl-md-8">
                <div class="row justify-content-lg-between align-items-lg-center no-gutters">
                    <div class="col-lg-4">
                        <div class="mb-4">
                            <h2 class="h1">Online Quiz</h2>
                            <p>Quizzes can help you assess your students as well as make learning fun. You can create
                                your own quiz and share with the students</p>
                        </div>
                        <a class="btn btn-primary btn-wide transition-3d-hover" data-toggle="modal"
                           data-target="#quizModal" href='#'>Create a Quiz</a>
                    </div>

                    <div class="col-lg-7 space-1 ml-auto mr-2">
                        <img class="img-fluid " src={svg} alt="Image Description"/>
                    </div>
                </div>
            </div>

            <QuizModal role='teacher'/>
        </div>
    );
};

export default Teacher;