import React from 'react';
import PropTypes from 'prop-types';

export default class EducationList extends React.Component {
    endLabel = ({year_end}) => {
        return !!year_end ? year_end : 'Present';
    }
    render() {
        const {education} = this.props;
        return (
            <div className='education-list'>
                <div>
                    {
                        education.map((education, index) => (
                            <div className='education-item' key={`education-item-${index}`}>
                                <div className="media-body mb-2">
                                    <h3 className="mt-1 mb-1">
                                        {education.name_of_institution}, <span className='use-color-grey'>{education.year_start} - {this.endLabel(education)}</span>
                                    </h3>
                                    <p className="mb-1">{education.title}, {education.location}, {education.country} </p>
                                    <div className="divider divider-xs divider-text ml-6 mb-2"></div>
                                </div>
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
