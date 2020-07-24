import PropTypes from "prop-types";
import React from "react";
import ChapterPreviewContent from "./ChapterPreviewContent";

const ChapterPreview = ({chapterTitle, chapterId, course_contents}) => {
    return (
        <div className="card border mb-1">
            <div className="card-header card-collapse" id="coursesHeadingOne">
                <a className="btn btn-link btn-sm btn-block card-btn p-3"
                   href="#" role="button" data-toggle="collapse"
                   data-target="#coursesCollapseOne"
                   aria-expanded="true" aria-controls="coursesCollapseOne">
                    <span className="row">
                        <span className="col-8">
                          <span className="media">
                            <span className="card-btn-toggle mr-3 ml-0">
                              <span className="card-btn-toggle-default">&#x2b;</span>
                              <span className="card-btn-toggle-active">&minus;</span>
                            </span>
                            <span className="media-body">
                              <span
                                  className="text-body font-weight-bold mr-5">
                                  {chapterTitle}
                              </span>
                            </span>
                          </span>
                        </span>
                        <span className="col-4 text-right">
                          <span className="row">
                            <span className="col-lg-6">
                              <span className="text-muted">
                                  {course_contents.length} lectures
                              </span>
                            </span>
                            <span className="col-lg-6">
                              <span className="text-muted">
                                  duration
                              </span>
                            </span>
                          </span>
                        </span>
                    </span>
                </a>
            </div>

            {
                course_contents.map((course_content) => {
                    const {title, duration, preview, id} = course_content;
                    return <ChapterPreviewContent contentTitle={title} duration={duration} key={`content-${chapterId}-${id}`} preview={preview}/>
                })
            }
        </div>
    )
}

ChapterPreview.propTypes = {
    chapterTitle: PropTypes.string.isRequired,
    chapterId: PropTypes.number.isRequired,
    course_contents: PropTypes.array.isRequired,
}

export default ChapterPreview;
