import React from 'react';
import PropTypes from 'prop-types';

const commonLabels = {
    year_start: 'Start Year',
    location: 'Location',
    country: 'Country',
}

const mappingLabels = {
    Education: {
        ...commonLabels,
        name_of_institution: 'Name of the institution',
        type: 'Education',
        year_end: 'End Year (leave blank if you are still studying)',
        title: 'Name of the Degree'
    },
    Experience: {
        ...commonLabels,
        name_of_institution: 'Name of the Company',
        year_end: 'End Year (leave blank if you are still working)',
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

export default class NewForm extends React.Component {
    state = {
        ...initialState,
    };

    resetForm = () => {
        this.setState({...initialState});
    }

    handleValueChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState(
            {
                [name]: value
            }
        )
    }

    submitForm = (event) => {
        const {name_of_institution, year_start, year_end, location, country, title} = this.state;
        const {qualificationType, addQualification} = this.props;
        addQualification({
            type: qualificationType,
            name_of_institution,
            year_start,
            year_end,
            location,
            country,
            title,
        });

        // this.resetForm(); //TODO this is a temporary solution as it does clear the form on validation errors and has to be fixed
    }

    render() {
        const {name_of_institution, year_start, year_end, location, country, title} = this.state;
        const {qualificationType, formErrors} = this.props;
        const labels = mappingLabels[qualificationType];
        return (
            <div className="modal fade " id="formModal" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel"><i className='fas fa-plus fa-md mr-1'></i> Add New</h5>
                            <button type="button" className="btn btn-xs btn-icon btn-soft-secondary"
                                    data-dismiss="modal" aria-label="Close">
                                <i className='fas fa-times fa-sm'></i>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className='row'>
                                <div className="form-group qualification-input col-md-6 col-sm-12">
                                    <input type="text" name="name_of_institution" value={name_of_institution}
                                           className="form-control"
                                           onChange={this.handleValueChange}
                                           placeholder={labels.name_of_institution}/>
                                    {
                                        formErrors.name_of_institution && <span>
                                {formErrors.name_of_institution}
                            </span>
                                    }
                                </div>
                                <div className="form-group qualification-input col-md-6 col-sm-12">
                                    <input type="text" name="title" value={title} className="form-control"
                                           onChange={this.handleValueChange}
                                           placeholder={labels.title}/>
                                    {
                                        formErrors.title && <span>
                                {formErrors.title}
                            </span>
                                    }
                                </div>
                                <div className="form-group qualification-input col-md-6 col-sm-12">
                                    <input type="text" name="year_start" value={year_start} className="form-control"
                                           onChange={this.handleValueChange}
                                           placeholder={labels.year_start}/>
                                    {
                                        formErrors.year_start && <span>
                                {formErrors.year_start}
                            </span>
                                    }
                                </div>
                                <div className="form-group qualification-input col-md-6 col-sm-12">
                                    <input type="text" name="year_end" value={year_end} className="form-control"
                                           onChange={this.handleValueChange}
                                           placeholder={labels.year_end}/>
                                    {
                                        formErrors.year_end && <span>
                                {formErrors.year_end}
                            </span>
                                    }
                                </div>
                                <div className="form-group qualification-input col-md-6 col-sm-12">
                                    <input type="text" name="location" value={location} className="form-control"
                                           onChange={this.handleValueChange}
                                           placeholder={labels.location}/>
                                    {
                                        formErrors.location && <span>
                                {formErrors.location}
                            </span>
                                    }
                                </div>
                                <div className="form-group qualification-input col-md-6 col-sm-12">
                                    <input type="text" name="country" value={country} className="form-control"
                                           onChange={this.handleValueChange}
                                           placeholder={labels.country}/>
                                    {
                                        formErrors.country && <span>
                                {formErrors.country}
                            </span>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-white" data-dismiss="modal">Close</button>
                            <button className='btn btn-white' onClick={this.resetForm}>Reset</button>
                            <button type="button" className="btn btn-primary" onClick={this.submitForm}>Add</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

NewForm.propTypes = {
    addQualification: PropTypes.func.isRequired,
    qualificationType: PropTypes.string.isRequired,
    formErrors: PropTypes.object.isRequired,
};
