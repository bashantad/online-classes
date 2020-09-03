import React, {useState} from 'react';

import svg from '../../../assets/images/illustrations/knowledgebase-community-2.svg'

import Quiz from '../../../../db/mockQuiz'

const Student = () => {
    const [questions, setQuestions] = useState(false)
    return (
        <div class="container space-top-2">
            <div className="bg-light rounded overflow-hidden space-top-2 space-top-lg-1 pl-md-8">
                {
                    !questions ?
                        <div className="row justify-content-lg-between align-items-lg-center ml-5 no-gutters">
                            <div className="col-lg-4">
                                <div className="mb-4">
                                    <h2 className="h1">Online Quiz</h2>
                                    <p>Quizzes can help you assess your knowledge in a fun way. Complete the quiz of
                                        your
                                        current course and earn extra credits.</p>
                                </div>
                                <button type='button' className="btn btn-primary btn-wide transition-3d-hover"
                                        onClick={() => setQuestions(true)}>Take
                                    Quiz
                                </button>
                            </div>

                            <div className="col-lg-7 space-bottom-2 ml-auto mr-4">
                                <img className="img-fluid" src={svg} alt="Image Description" style={{width: '80%'}}/>
                            </div>
                        </div> :
                        <div className='container pr-5 pl-0'>
                            <span className="d-block small font-weight-bold text-cap">Attempt All Questions</span>
                            <form class='space-2'>
                                {
                                    Quiz.map(item => (
                                        <div className="form-group">
                                            <label className="input-label">{item.question}</label>
                                            {
                                                item.type === 'select' ?

                                                    <div className="input-group input-group-md-down-break">
                                                        {
                                                            item.options.map(option => (
                                                                <div className="form-control">
                                                                    <div className="custom-control custom-radio">
                                                                        <input type="radio"
                                                                               className="custom-control-input"
                                                                               name={option}
                                                                               id={option}/>
                                                                        <label className="custom-control-label"
                                                                               htmlFor={option}>{option}</label>
                                                                    </div>
                                                                </div>

                                                            ))
                                                        }
                                                    </div>
                                                    : item.type === 'multiple' ?
                                                    <div className="form-group">
                                                        <select id="exampleFormControlSelect1" className="form-control">
                                                            <option>Choose an option</option>
                                                            {
                                                                item.options.map(option => (
                                                                    <option>{option}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    </div>
                                                    :
                                                    <input type="text" id="exampleFormControlInput1"
                                                           className="form-control"
                                                           placeholder="John Doe"/>
                                            }
                                        </div>
                                    ))
                                }
                                <button type='button' className="btn btn-primary btn-wide transition-3d-hover"
                                        onClick={() => setQuestions(false)}>
                                    Submit
                                </button>
                            </form>
                        </div>
                }

            </div>
        </div>
    );
};

export default Student;