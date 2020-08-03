import React, {Component} from 'react';
import qualificationApi from "../../apis/qualificationApi";
import NewQualification, {mappingLabels} from './NewQualification'
import PropTypes from "prop-types";

const initialState = {
    name_of_institution: '',
    year_start: '',
    type: '',
    year_end: '',
    title: '',
    location: '',
    country: '',
};

export default class EditQualificationClass extends Component {
    state = {
        ...initialState,
    };

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

    editQualification = (data) => {
        const updateObj = {};
        qualificationApi.update(id, data)
            .then(res => res.json())
            .then(response => {
                const {errors} = response;
                if (!!errors) {
                    if (data.type === 'Education') {
                        updateObj.educationFormErrors = errors;
                    } else {
                        updateObj.experienceFormErrors = errors;
                    }
                } else {
                    if (response.type === 'Education') {
                        updateObj.education = [response, ...setEducation];
                    } else {
                        updateObj.experiences = [response, ...setExperience];
                    }
                }
                this.setState(updateObj);
            });
    }

    submitForm = (event) => {
        const {name_of_institution, year_start, year_end, location, country, title} = this.state;
        const type = this.props;

        this.editQualification({
            type: type,
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
        const {type, formErrors} = this.props;
        const labels = mappingLabels[type];
        return (
            <div className="modal fade " id="editModal" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel"><i
                                className='fas fa-plus fa-md mr-1'></i> Add New</h5>
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
        );
    }
}

EditQualificationClass.propTypes = {
    type: PropTypes.string.isRequired,
    formErrors: PropTypes.object.isRequired,
};