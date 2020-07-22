import React from 'react';
import PropTypes from 'prop-types';

export default class EducationList extends React.Component {
    render() {
        const {education} = this.props;
        return (
            <div className='education-list'>
                <div>
                    {
                        education.map((education, index) => (
                            <div className='education-item' key={`education-item-${index}`}>
                                <div className="media-body mb-2">
                                    <small className="d-block small font-weight-bold text-cap">{education.year_start} - {education.year_end}</small>
                                    <h3 className="mt-1 mb-1">{education.title}
                                    </h3>
                                    <p className="mb-1">{education.location}, {education.country}</p>
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
