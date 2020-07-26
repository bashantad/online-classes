import React from 'react';
import PropTypes from 'prop-types';
const RenderHtml = ({body}) => <div dangerouslySetInnerHTML={{__html: body}}/>;

RenderHtml.propTypes = {
    body: PropTypes.string.isRequired,
};

export default RenderHtml;
