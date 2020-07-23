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
                <ul className='timeline'>
                    {
                        education.map((education, index) => (
                            <li className='education-item ' key={`education-item-${index}`}>
                                <span className="media-body mb-2">
                                    <h3 className="mt-1 mb-1">
                                        {education.name_of_institution}, <span className='text-body h4'>{education.year_start} - {this.endLabel(education)}</span>
                                    </h3>
                                    <p className="mb-1">{education.title}, {education.location}, {education.country} </p>
                                </span>
                            </li>
                        ))
                    }
                </ul>
            </div>
        )
    }
}

EducationList.propTypes = {
    education: PropTypes.array.isRequired,
};
