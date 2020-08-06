import React from 'react';
import PropTypes from 'prop-types';
import RenderHtml from "../../../common/RenderHtml";
import courseSvg from "../../../../../assets/images/illustrations/flowers.svg";

const CourseContentBody = ({chapterTitle, title, description_html, duration}) => {
    return (
        <>
            <div className="card-header">
                <h4 className="card-title"> {chapterTitle}</h4>
            </div>
            <div className="card-body">
                <div className="card card-bordered overflow-hidden p-5">
                    <h4>
                        {title}
                    </h4>
                    <div>
                        <RenderHtml body={description_html}/>
                    </div>
                    <div>
                        {duration}
                    </div>
                    <div className="position-absolute bottom-0 right-0 mr-5 w-sm-35 max-w-11rem">
                        <figure className="mx-auto">
                            <img className="img-fluid" src={courseSvg} alt="Course"/>
                        </figure>
                    </div>
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
