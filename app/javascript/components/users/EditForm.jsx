import React, {useState} from 'react';
import qualificationApi from "../../apis/qualificationApi";

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

const EditForm = ({data, type}) => {
    const id = data.id;
    const [name_of_institution, setName_of_institution] = useState(data.name_of_institution);
    const [title, setTitle] = useState(data.title);
    const [year_start, setYear_start] = useState(data.year_start);
    const [year_end, setYear_end] = useState(data.year_end);
    const [country, setCountry] = useState(data.country);
    const [location, setLocation] = useState(data.location);
    const [education, setEducation] = useState([]);
    const [experience, setExperience] = useState([]);

    const labels = mappingLabels[type];


    const editQualification = (data) => {
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

    const submitForm = (event) => {
        editQualification({
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
    return (
        <div>
            <div className="modal fade " id="editModal" tabIndex="-1" role="dialog"
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
                                           value={name_of_institution}
                                           className="form-control"
                                           onChange={e => setName_of_institution(e.target.value)}
                                           placeholder={labels.name_of_institution}/>
                                    {/*        {*/}
                                    {/*            formErrors.name_of_institution && <span>*/}
                                    {/*    {formErrors.name_of_institution}*/}
                                    {/*</span>*/}
                                    {/*        }*/}
                                </div>
                                <div className="form-group qualification-input col-md-6 col-sm-12">
                                    <input type="text" name="title" value={title}
                                           className="form-control"
                                           onChange={e => setTitle(e.target.value)}
                                           placeholder={labels.title}/>
                                    {/*        {*/}
                                    {/*            formErrors.title && <span>*/}
                                    {/*    {formErrors.title}*/}
                                    {/*</span>*/}
                                    {/*        }*/}
                                </div>
                                <div className="form-group qualification-input col-md-6 col-sm-12">
                                    <input type="text" name="year_start"
                                           value={year_start} className="form-control"
                                           onChange={e => setYear_start(e.target.value)}
                                           placeholder={labels.year_start}/>
                                    {/*        {*/}
                                    {/*            formErrors.year_start && <span>*/}
                                    {/*    {formErrors.year_start}*/}
                                    {/*</span>*/}
                                    {/*        }*/}
                                </div>
                                <div className="form-group qualification-input col-md-6 col-sm-12">
                                    <input type="text" name="year_end" value={year_end}
                                           className="form-control"
                                           onChange={e => setYear_end(e.target.value)}
                                           placeholder={labels.year_end}/>
                                    {/*        {*/}
                                    {/*            formErrors.year_end && <span>*/}
                                    {/*    {formErrors.year_end}*/}
                                    {/*</span>*/}
                                    {/*        }*/}
                                </div>
                                <div className="form-group qualification-input col-md-6 col-sm-12">
                                    <input type="text" name="location" value={location}
                                           className="form-control"
                                           onChange={e => setLocation(e.target.value)}
                                           placeholder={labels.location}/>
                                    {/*        {*/}
                                    {/*            formErrors.location && <span>*/}
                                    {/*    {formErrors.location}*/}
                                    {/*</span>*/}
                                    {/*        }*/}
                                </div>
                                <div className="form-group qualification-input col-md-6 col-sm-12">
                                    <input type="text" name="country" value={country}
                                           className="form-control"
                                           onChange={e => setCountry(e.target.value)}
                                           placeholder={labels.country}/>
                                    {/*        {*/}
                                    {/*            formErrors.country && <span>*/}
                                    {/*    {formErrors.country}*/}
                                    {/*</span>*/}
                                    {/*        }*/}
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
        </div>
    );
};

export default EditForm;