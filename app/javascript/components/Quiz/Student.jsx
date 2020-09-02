import React from 'react';

import svg from '../../../assets/images/illustrations/knowledgebase-community-2.svg'

const Student = () => {
    return (
        <div class="container space-top-2">
            <div class="bg-light rounded overflow-hidden space-top-2 space-top-lg-1 pl-5 pl-md-8">
                <div class="row justify-content-lg-between align-items-lg-center no-gutters">
                    <div class="col-lg-4">
                        <div class="mb-4">
                            <h2 class="h1">Online Quiz</h2>
                            <p>Quizzes can help you assess your knowledge in a fun way. Complete the quiz of your
                                current course and earn extra credits.</p>
                        </div>
                        <a class="btn btn-primary btn-wide transition-3d-hover" data-toggle="modal"
                           data-target="#quizModal" href='#'>Take Quiz</a>
                    </div>

                    <div class="col-lg-7 space-bottom-2 ml-auto mr-4">
                        <img class="img-fluid" src={svg} alt="Image Description" style={{width: '80%'}}/>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Student;