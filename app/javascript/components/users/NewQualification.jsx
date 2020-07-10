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
    state  = {
        ...initialState,
    };

    resetForm = () => {
        this.setState({...initialState});
    }

    handleNameChange = (event) => {
        this.setState({name_of_institution: event.target.value})
    }

    submitForm = () => {
        const { name_of_institution, year_start, year_end, location, country, type, title } = this.state;
        const {qualificationType, addQualification} = this.props;
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
        const { name_of_institution, year_start, year_end, location, country, type, title } = this.state;
        const labels = mappingLabels[this.props.qualificationType];
        return (
            <div className='new-qualification'>
                <div className='name-of-institution'>
                    {labels.name_of_institution}
                    <input onChange={this.handleNameChange} value={name_of_institution} />
                    <button onClick={this.submitForm}>Save</button>
                    <div>
                        Validation errors <br />
                        {JSON.stringify(this.props.formErrors)}
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
