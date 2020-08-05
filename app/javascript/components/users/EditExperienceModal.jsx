import React, {useEffect, useState} from 'react';
import {mappingLabels} from './NewQualification'
import PropTypes from "prop-types";

const EditExperienceModal = ({data, qualificationType, formErrors, updateQualification}) => {
    const [name_of_institution, setName_of_institution] = useState('');
    const [title, setTitle] = useState('');
    const [year_start, setYear_start] = useState('');
    const [year_end, setYear_end] = useState('');
    const [country, setCountry] = useState('');
    const [location, setLocation] = useState('');
    const [id, setId] = useState('');

    useEffect(() => {
        setName_of_institution(data?.name_of_institution);
        setTitle(data?.title);
        setYear_start(data?.year_start);
        setYear_end(data?.year_end);
        setCountry(data?.country);
        setLocation(data?.location)
        setId(data?.id)
    }, [data])

    const labels = mappingLabels[qualificationType];

    const submitForm = (event) => {
        updateQualification(id, {
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
    return (
        <div className="modal fade " id="editModalExp" tabIndex="-1" role="dialog"
             aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel"><i
                            className='fas fa-pen fa-md mr-1'></i> Edit</h5>
                        <button type="button" className="btn btn-xs btn-icon btn-soft-secondary"
                                data-dismiss="modal" aria-label="Close">
                            <i className='fas fa-times fa-sm'></i>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className='row'>
                            <div className="form-group qualification-input col-md-6 col-sm-12">
                                <input type="text" name="name_of_institution"
                                       defaultValue={name_of_institution}
                                       className="form-control"
                                       onChange={e => setName_of_institution(e.target.value)}
                                       placeholder={labels.name_of_institution}/>
                                {
                                    formErrors?.name_of_institution && <span>
                                        {formErrors.name_of_institution}
                                    </span>
                                }
                            </div>
                            <div className="form-group qualification-input col-md-6 col-sm-12">
                                <input type="text" name="title"
                                       defaultValue={title}
                                       className="form-control"
                                       onChange={e => setTitle(e.target.value)}
                                       placeholder={labels.title}/>
                                {
                                    formErrors?.title && <span>
                                        {formErrors.title}
                                    </span>
                                }
                            </div>
                            <div className="form-group qualification-input col-md-6 col-sm-12">
                                <input type="text" name="year_start"
                                       defaultValue={year_start}
                                       className="form-control"
                                       onChange={e => setYear_start(e.target.value)}
                                       placeholder={labels.year_start}/>
                                {
                                    formErrors?.year_start && <span>
                                        {formErrors.year_start}
                                    </span>
                                }
                            </div>
                            <div className="form-group qualification-input col-md-6 col-sm-12">
                                <input type="text" name="year_end"
                                       defaultValue={year_end}
                                       className="form-control"
                                       onChange={e => setYear_end(e.target.value)}
                                       placeholder={labels.year_end}/>
                                {
                                    formErrors?.year_end && <span>
                                        {formErrors.year_end}
                                    </span>
                                }
                            </div>
                            <div className="form-group qualification-input col-md-6 col-sm-12">
                                <input type="text" name="location"
                                       defaultValue={location}
                                       className="form-control"
                                       onChange={e => setLocation(e.target.value)}
                                       placeholder={labels.location}/>
                                {
                                    formErrors?.location && <span>
                                        {formErrors.location}
                                    </span>
                                }
                            </div>
                            <div className="form-group qualification-input col-md-6 col-sm-12">
                                <input type="text" name="country"
                                       defaultValue={country}
                                       className="form-control"
                                       onChange={e => setCountry(e.target.value)}
                                       placeholder={labels.country}/>
                                {
                                    formErrors?.country && <span>
                                        {formErrors.country}
                                    </span>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-white"
                                data-dismiss="modal">Close
                        </button>
                        <button type="submit" className="btn btn-primary"
                                onClick={submitForm}>Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

EditExperienceModal.propTypes = {
    updateQualification: PropTypes.func.isRequired,
    formErrors: PropTypes.object.isRequired,
    qualificationType: PropTypes.string.isRequired,
};

export default EditExperienceModal;
