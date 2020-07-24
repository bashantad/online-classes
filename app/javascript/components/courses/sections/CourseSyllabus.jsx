import React from 'react';
import PropTypes from 'prop-types';
import ChapterPreview from "./ChapterPreview";

const CourseSyllabus = ({chapters, lecture_count, duration}) => {
    return (
        <div className="border-top pt-7 mt-7 mb-7">
            <div className="row mb-4">
                <div className="col-8">
                    <h3 className="mb-0">Course content</h3>
                </div>
                <div className="col-4 text-right">
                    <div className="row">
                        <div className="col-lg-6">
                            <span className="font-size-1">{lecture_count} lectures</span>
                        </div>
                        <div className="col-lg-6">
                            <span className="font-size-1">{duration}</span>
                        </div>
                    </div>
                </div>
            </div>
            {
                chapters.map((chapter, index) => {
                    const {id, title, course_contents} = chapter;
                    return <ChapterPreview chapterTitle={title} chapterId={id} course_contents={course_contents} key={`chapter-${index}-content`}/>
                })
            }

            <div className="card border">
                <a className="link link-collapse btn btn-link btn-sm btn-block card-btn text-center p-3"
                   data-toggle="collapse" href="#collapseCoursesContentSection"
                   role="button"
                   aria-expanded="false" aria-controls="collapseCoursesContentSection">
                    <span className="link-collapse-default">2 more sections</span>
                    <span className="link-collapse-active">View less</span>
                </a>
            </div>
        </div>
    );
};

CourseSyllabus.propTypes = {
    chapters: PropTypes.array.isRequired,
    lecture_count: PropTypes.number.isRequired,
    duration: PropTypes.string.isRequired,
}

export default CourseSyllabus;
