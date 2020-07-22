import React from 'react';
import PropTypes from 'prop-types';

const Description = ({body}) => {
    return (
        <div className="border-top pt-7 mt-7">
            <h3 className="mb-4">Description</h3>
            {body}
        </div>
    );
};

Description.propTypes = {
    body: PropTypes.string.isRequired,
}
export default Description;
