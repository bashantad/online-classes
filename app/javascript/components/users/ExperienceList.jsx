import React from 'react';
import PropTypes from 'prop-types';
import EditExperienceModal from "./EditExperienceModal";
import DeleteExperienceModal from "./DeleteExperienceModal";


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
                                     <span data-toggle="modal" data-target="#editModalExp">
                                        <button type="button" className="btn btn-ghost-info btn-icon btn-xs"
                                                data-toggle='tooltip' title='Edit' data-placement="top"
                                                onClick={() => handleClick(index)}>
                                      <i className="fas fa-pen"></i>
                                    </button>
                                    </span>

                                    <span data-toggle="modal" data-target="#deleteExperienceModal">
                                    <button type="button" className="btn btn-ghost-danger btn-icon btn-xs ml-2"
                                            data-toggle="tooltip"  title='Delete' data-placement="top"
                                            onClick={() => handleClick(index)}>
                                      <i className="fas fa-trash"></i>
                                    </button>
                                    </span>
                                </span>
                            </li>
                        ))
                    }
                </ul>
                <EditExperienceModal data={this.state.data} index={this.state.index} {...this.props}/>
                <DeleteExperienceModal data={this.state.data} index={this.state.index} {...this.props}/>
            </div>
        )
    }
}

ExperienceList.propTypes = {
    experiences: PropTypes.array.isRequired,
    updateQualification: PropTypes.func.isRequired,
    deleteQualification: PropTypes.func.isRequired,
    formErrors: PropTypes.object.isRequired,
    qualificationType: PropTypes.string.isRequired,
};
