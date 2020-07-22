import React from 'react';
import PropTypes from 'prop-types';

export default class ExperienceList extends React.Component {
    endLabel = ({year_end}) => {
        return !!year_end ? year_end : 'Present';
    }
    render() {
        const {experiences} = this.props;
        return (
            <div className='education-list'>
                {
                    experiences.map((experience, index) => (
                        <div className='experience-item' key={`experience-item-${index}`}>
                            <div className="media-body mb-2">
                                <h3 className="mt-1 mb-1">
                                    {experience.name_of_institution}, <span className='use-color-grey'>{experience.year_start} - {this.endLabel(experience)}</span>
                                </h3>
                                <p className="mb-1">
                                    {experience.title}, {experience.location}, {experience.country}
                                </p>
                                <div className="divider divider-xs divider-text ml-6 mb-2"></div>
                            </div>
                        </div>
                    ))
                }
            </div>
        )
    }
}

ExperienceList.propTypes = {
    experiences: PropTypes.array.isRequired,
};
