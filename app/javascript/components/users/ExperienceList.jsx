import React from 'react';
import PropTypes from 'prop-types';

export default class ExperienceList extends React.Component {
    render() {
        const {experiences} = this.props;
        return (
            <div className='education-list'>
                <h3>Experience</h3>
                {
                    experiences.map((experience, index) => (
                        <div className='experience-item' key={`experience-item-${index}`}>
                            <h4> {experience.title}</h4>
                            {JSON.stringify(experience)}
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
