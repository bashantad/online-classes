import React from 'react';
import PropTypes from 'prop-types';
import EditForm from "./EditForm";
import DeleteModal from "./DeleteModal";

export default class ExperienceList extends React.Component {
    state = {
        index: null,
    }

    endLabel = ({year_end}) => {
        return !!year_end ? year_end : 'Present';
    }

    render() {
        const {experiences, type} = this.props;
        const passIndex = (index) => {
            this.setState({index: index})
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
                                            onClick={() => passIndex(index)}
                                            data-toggle="modal" data-target="#editModal">
                                      <i className="fas fa-pen"></i>
                                    </button>
                                    <button type="button" className="btn btn-ghost-danger btn-icon btn-xs ml-2"
                                            data-toggle="modal" data-target="#deleteModal"
                                            onClick={() => passIndex(index)}>
                                      <i className="fas fa-trash"></i>
                                    </button>
                                </span>
                            </li>
                        ))
                    }
                </ul>
                {this.state.index !== null ? <EditForm data={experiences[this.state.index]} type={type}/>
                    : ''}
                <DeleteModal data={experiences[this.state.index]}/>
            </div>
        )
    }
}

ExperienceList.propTypes = {
    experiences: PropTypes.array.isRequired,
};
