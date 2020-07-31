import React from 'react';
import PropTypes from 'prop-types';
import EditForm from "./EditForm";
import DeleteModal from "./DeleteModal";

export default class EducationList extends React.Component {
    state = {
        index: null,
    }

    endLabel = ({year_end}) => {
        return !!year_end ? year_end : 'Present';
    }

    render() {
        const {education, type} = this.props;
        const passIndex = (index) => {
            this.setState({index: index})
        }

        return (
            <div className='education-list'>
                <ul className='timeline'>
                    {
                        education.map((education, index) => (
                            <li className='education-item d-flex' key={`education-item-${index}`}>
                                <span className="media-body mb-2">
                                    <h3 className="mt-1 mb-1">
                                        {education.name_of_institution}, <span
                                        className='text-body h4'>{education.year_start} - {this.endLabel(education)}</span>
                                    </h3>
                                    <p className="mb-1">{education.title}, {education.location}, {education.country} </p>
                                </span>
                                <span>
                                    <button type="button" className="btn btn-ghost-info btn-icon btn-xs"
                                            data-toggle="modal" data-target="#editModal"
                                            onClick={() => passIndex(index)}>
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
                {this.state.index !== null ? <EditForm data={education[this.state.index]} type={type}/>
                    : ''}
                <DeleteModal data={education[this.state.index]}/>

            </div>
        )
    }
}

EducationList.propTypes = {
    education: PropTypes.array.isRequired,
};
