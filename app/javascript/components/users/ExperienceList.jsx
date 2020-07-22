import React from 'react';
import PropTypes from 'prop-types';

export default class ExperienceList extends React.Component {
    render() {
        const {experiences} = this.props;
        return (
            <div className='education-list'>
                {
                    experiences.map((experience, index) => (
                        <div className='experience-item' key={`experience-item-${index}`}>
                            <div className="media-body mb-2">
                                <small className="d-block small font-weight-bold text-cap">{experience.year_start} - {experience.year_end}</small>
                                <h3 className="mt-1 mb-1">{experience.title}
                                </h3>
                                <p className="mb-1">{experience.location}, {experience.country}</p>
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
