import React from 'react';
import PropTypes from 'prop-types';
import RenderHtml from "../../../common/RenderHtml";

const CourseContentBody = ({chapterTitle, title, description_html, duration}) => {
    return (
        <>
            <div className="card-header">
                <h4 className="card-title"> {chapterTitle}</h4>
            </div>
            <div className="card-body">
                <h4>
                    {title}
                </h4>
                <div>
                    <RenderHtml body={description_html}/>
                </div>
                <div>
                    {duration}
                </div>
            </div>
        </>
    )
}

CourseContentBody.propTypes = {
    title: PropTypes.string.isRequired,
    description_html: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    chapterTitle: PropTypes.string.isRequired,
}

export default CourseContentBody;
