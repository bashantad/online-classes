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

    resetForm = (event) => {
        event.preventDefault();
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

    submitForm = () => {
        const {name_of_institution, year_start, year_end, location, country, type, title} = this.state;
        const {qualificationType, addQualification, key} = this.props;
        addQualification({
            type: qualificationType,
            name_of_institution,
            year_start,
            year_end,
            location,
            country,
            title,
        });
        this.resetForm();
    }

    render() {
        const {name_of_institution, year_start, year_end, location, country, type, title} = this.state;
        const labels = mappingLabels[this.props.qualificationType];
        return (
            <div className='new-qualification bg-light p-3 rounded'>
                <form className='row'>
                    <div className="form-group col-md-6 col-sm-12">
                        <input type="text" name="name_of_institution" value={name_of_institution} className="form-control"
                               onChange={this.handleValueChange}
                               placeholder={labels.name_of_institution}/>
                    </div>
                    <div className="form-group col-md-6 col-sm-12">
                        <input type="text" name="title" value={title} className="form-control"
                               onChange={this.handleValueChange}
                               placeholder={labels.title}/>
                    </div>
                    <div className="form-group col-md-6 col-sm-12">
                        <input type="text" name="year_start" value={year_start} className="form-control"
                               onChange={this.handleValueChange}
                               placeholder={labels.year_start}/>
                    </div>
                    <div className="form-group col-md-6 col-sm-12">
                        <input type="text" name="year_end" value={year_end} className="form-control"
                               onChange={this.handleValueChange}
                               placeholder={labels.year_end}/>
                    </div>
                    <div className="form-group col-md-6 col-sm-12">
                        <input type="text" name="location" value={location} className="form-control"
                               onChange={this.handleValueChange}
                               placeholder={labels.location}/>
                    </div>
                    <div className="form-group col-md-6 col-sm-12">
                        <input type="text" name="country" value={country} className="form-control"
                               onChange={this.handleValueChange}
                               placeholder={labels.country}/>
                    </div>
                    <div className='form-group col-md-12 col-sm-12'>
                        <button className='btn btn-sm btn-primary' style={{float: 'right'}}
                                onClick={this.submitForm}>Add
                        </button>
                        <button className='btn btn-sm btn-outline-primary mr-2' style={{float: 'right'}}
                                onClick={this.resetForm}>Reset
                        </button>
                    </div>
                </form>
                {/*<div>*/}
                {/*    Validation errors <br/>*/}
                {/*    {JSON.stringify(this.props.formErrors)}*/}
                {/*</div>*/}
            </div>
        )
    }
}

NewQualification.propTypes = {
    addQualification: PropTypes.func.isRequired,
    qualificationType: PropTypes.string.isRequired,
    formErrors: PropTypes.object.isRequired,
};
