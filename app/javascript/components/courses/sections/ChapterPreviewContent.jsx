import React from 'react';
import PropTypes from 'prop-types';

const ChapterPreviewContent = ({contentTitle, duration, preview}) => {
    return (
        <div id="coursesCollapseOne" className="collapse show"
             aria-labelledby="coursesHeadingOne">
            <div className="card-body p-0">
                <div className="border-bottom py-3 pr-3 pl-6">
                    <div className="row">
                        <div className="col-8">
                            <a className="media font-size-1 mr-5" href="#">
                                <i className="fa fa-play-circle min-w-3rem text-center opacity-lg mt-1 mr-2 ml-1"></i>
                                <span className="media-body">
                                    <span>
                                        {contentTitle}
                                    </span>
                                </span>
                            </a>
                        </div>
                        <div className="col-4 text-right">
                            <div className="row">
                                <div className="col-lg-6">
                                    <a className="font-size-1" href="#">Preview</a>
                                </div>
                                <div className="col-lg-6">
                                    <span className="text-primary font-size-1">
                                        {duration}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

ChapterPreviewContent.propTypes = {
    contentTitle: PropTypes.string.isRequired,
    duration: PropTypes.string,
    preview: PropTypes.bool.isRequired,
}

export default ChapterPreviewContent;
