import React from 'react';
import PropTypes from 'prop-types';

export default class EducationList extends React.Component {
    render() {
        const {education} = this.props;
        return (
            <div className='education-list'>
                <h3>Education</h3>
                <div>
                    {
                        education.map((education, index) => (
                            <div className='education-item' key={`education-item-${index}`}>
                                <h4> {education.title}</h4>
                                {JSON.stringify(education)}
                            </div>
                        ))

                    }
                </div>
            </div>
        )
    }
}

EducationList.propTypes = {
    education: PropTypes.array.isRequired,
};
