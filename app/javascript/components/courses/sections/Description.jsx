import React from 'react';
import PropTypes from 'prop-types';
import RenderHtml from "../../common/RenderHtml";

const Description = ({bodyHtml}) => {
    return (
        <div className="border-top pt-7 mt-7">
            <h3 className="mb-4">Description</h3>
            <RenderHtml body={bodyHtml} />
        </div>
    );
};

Description.propTypes = {
    bodyHtml: PropTypes.string.isRequired,
}
export default Description;
