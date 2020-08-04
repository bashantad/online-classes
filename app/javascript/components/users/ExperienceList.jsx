import React from 'react';
import PropTypes from 'prop-types';
import EditExperienceQualification from "./EditExperienceQualification";
import DeleteExperienceQualification from "./DeleteExperienceQualification";


export default class ExperienceList extends React.Component {
    state = {
        index: null,
        data: {},
        id: ''
    }

    endLabel = ({year_end}) => {
        return !!year_end ? year_end : 'Present';
    }

    render() {
        const {experiences} = this.props;
        const handleClick = (index) => {
            this.setState({index: index, data: experiences[index]})
        }
        return (
            <div className='experience-list'>
                <ul className='timeline'>
                    {
                        experiences.map((experience, index) => (
                            <li className='experience-item d-flex' key={`experience-item-${index}`}>
                                <span className="media-body mb-2">
                                    <h3 className="mt-1 mb-1">
                                        {experience.name_of_institution}, <span
                                        className='text-body h4'>{experience.year_start} - {this.endLabel(experience)}</span>
                                    </h3>
                                    <p className="mb-1">{experience.title}, {experience.location}, {experience.country} </p>
                                </span>
                                <span>
                                    <button type="button" className="btn btn-ghost-info btn-icon btn-xs"
                                            onClick={() => handleClick(index)}
                                            data-toggle="modal" data-target="#editModalExp">
                                      <i className="fas fa-pen"></i>
                                    </button>
                                    <button type="button" className="btn btn-ghost-danger btn-icon btn-xs ml-2"
                                            data-toggle="modal" data-target="#deleteExperienceModal"
                                            onClick={() => handleClick(index)}>
                                      <i className="fas fa-trash"></i>
                                    </button>
                                </span>
                            </li>
                        ))
                    }
                </ul>
                <EditExperienceQualification data={this.state.data} index={this.state.index} {...this.props}/>
                <DeleteExperienceQualification data={this.state.data} index={this.state.index} {...this.props}/>
            </div>
        )
    }
}

ExperienceList.propTypes = {
    experiences: PropTypes.array.isRequired,
    editQualification: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired,
    formErrors: PropTypes.object.isRequired,
    qualificationType: PropTypes.string.isRequired,
};
