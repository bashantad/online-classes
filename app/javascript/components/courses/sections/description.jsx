import React from 'react';

const Description = props => {
    const {course} = props
    return (
        <div className="border-top pt-7 mt-7">
            <h3 className="mb-4">Description</h3>

            <p>Become a Python Programmer and learn one of employer's most requested skills
                of
                2019!</p>

            <p>This is the most comprehensive, yet straight-forward, course for the Python
                programming language on Udemy! Whether you have never programmed before,
                already
                know basic syntax, or want to learn about the advanced features of Python,
                this
                course is for you! In this course we will teach you Python 3. (Note, we also
                provide
                older Python 2 notes in case you need them)</p>

            <div className="collapse" id="collapseDescriptionSection">
                <p>With over 100 lectures and more than 20 hours of video this comprehensive
                    course
                    leaves no stone unturned! This course includes quizzes, tests, and
                    homework
                    assignments as well as 3 major projects to create a Python project
                    portfolio!</p>

                <p>This course will teach you Python in a practical manner, with every
                    lecture comes
                    a full coding screencast and a corresponding code notebook! Learn in
                    whatever
                    manner is best for you!</p>

                <p>We will start by helping you get Python installed on your computer,
                    regardless of
                    your operating system, whether its Linux, MacOS, or Windows, we've got
                    you
                    covered!</p>

                <p>We cover a wide variety of topics, including:</p>

                <ul className="text-body pl-6">
                    <li>Command Line Basics</li>
                    <li>Installing Python</li>
                    <li>Running Python Code</li>
                    <li>Strings</li>
                    <li>Lists&nbsp;</li>
                    <li>Dictionaries</li>
                    <li>Tuples</li>
                    <li>Sets</li>
                    <li>Number Data Types</li>
                    <li>Print Formatting</li>
                    <li>Functions</li>
                    <li>Scope</li>
                    <li>args/kwargs</li>
                    <li>Built-in Functions</li>
                    <li>Debugging and Error Handling</li>
                    <li>Modules</li>
                    <li>External Modules</li>
                    <li>Object Oriented Programming</li>
                    <li>Inheritance</li>
                    <li>Polymorphism</li>
                    <li>File I/O</li>
                    <li>Advanced Methods</li>
                    <li>Unit Tests</li>
                    <li>and much more!</li>
                </ul>

                <p>This course comes with a 30 day money back guarantee! If you are not
                    satisfied in
                    any way, you'll get your money back. Plus you will keep access to the
                    Notebooks
                    as a thank you for trying out the course!</p>
            </div>

            <a className="link link-collapse small font-size-1 font-weight-bold pt-1"
               data-toggle="collapse" href="#collapseDescriptionSection" role="button"
               aria-expanded="false" aria-controls="collapseDescriptionSection">
                <span className="link-collapse-default">Read more</span>
                <span className="link-collapse-active">Read less</span>
                <span className="link-icon ml-1">+</span>
            </a>
        </div>
    );
};

export default Description;