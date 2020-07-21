import React from 'react';
import PropTypes from 'prop-types';

const commonLabels = {
    year_start: 'Start Year',
    year_end: 'End Year',
    location: 'Location',
    country: 'Country',
}

const mappingLabels = {
    Education: {
        ...commonLabels,
        name_of_institution: 'Name of the institution',
        type: 'Education',
        title: 'Name of the Degree'
    },
    Experience: {
        ...commonLabels,
        name_of_institution: 'Name of the Company',
        type: 'Experience',
        title: 'Job Title',
    }
}

const initialState = {
    name_of_institution: '',
    year_start: '',
    type: '',
    year_end: '',
    title: '',
    location: '',
    country: '',
};

export default class NewQualification extends React.Component {
    state = {
        ...initialState,
    };

    resetForm = () => {
        this.setState({...initialState});
    }

    handleNameChange = (event) => {
        this.setState({name_of_institution: event.target.value})
    }

    submitForm = () => {
        const {name_of_institution, year_start, year_end, location, country, type, title} = this.state;
        const {qualificationType, addQualification,key} = this.props;
        console.log(qualificationType)
        addQualification({
            type: qualificationType,
            name_of_institution,
            year_start,
            year_end,
            location,
            country,
            name_of_institution,
            title,
        });
        this.resetForm();
    }

    render() {
        const {name_of_institution, year_start, year_end, location, country, type, title} = this.state;
        const labels = mappingLabels[this.props.qualificationType];
        return (
            <div className="modal fade" id="userModal" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="btn btn-xs btn-icon btn-soft-secondary"
                                    data-dismiss="modal"
                                    aria-label="Close">
                                <svg aria-hidden="true" width="10" height="10" viewBox="0 0 18 18"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path fill="currentColor"
                                          d="M11.5,9.5l5-5c0.2-0.2,0.2-0.6-0.1-0.9l-1-1c-0.3-0.3-0.7-0.3-0.9-0.1l-5,5l-5-5C4.3,2.3,3.9,2.4,3.6,2.6l-1,1 C2.4,3.9,2.3,4.3,2.5,4.5l5,5l-5,5c-0.2,0.2-0.2,0.6,0.1,0.9l1,1c0.3,0.3,0.7,0.3,0.9,0.1l5-5l5,5c0.2,0.2,0.6,0.2,0.9-0.1l1-1 c0.3-0.3,0.3-0.7,0.1-0.9L11.5,9.5z"/>
                                </svg>
                            </button>
                        </div>
                        <div className="modal-body">
                            {labels.name_of_institution}
                            <input onChange={this.handleNameChange} value={name_of_institution}/>
                            <button onClick={this.submitForm}>Save</button>
                            <div>
                                Validation errors <br/>
                                {JSON.stringify(this.props.formErrors)}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-white" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Add</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

NewQualification.propTypes = {
    addQualification: PropTypes.func.isRequired,
    qualificationType: PropTypes.string.isRequired,
    formErrors: PropTypes.object.isRequired,
};
