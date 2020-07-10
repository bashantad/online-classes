import React from 'react';
import NewQualification from './NewQualification';
import EducationList from './EducationList';
import ExperienceList from './ExperienceList';
import qualificationApi from '../../apis/qualificationApi';

const QUALIFICATION_TYPES = {
    education: 'Education',
    experience: 'Experience',
};

export default class Qualification extends React.Component {
    state = {
        education: [],
        experiences: [],
        loading: true,
        errNotification: false,
        error: '',
        showEducationForm: false,
        showExperienceForm: false,
        educationFormErrors: {},
        experienceFormErrors: {},
    }

    componentDidMount() {
        qualificationApi.getAll()
            .then(res => res.json())
            .then(response => {
                const {experiences, education} = response;
                this.setState({experiences, education});
            }).catch(err => {
                this.setState({loading: false, errNotification: true, error: 'Something went wrong'});
            });
    }

    addQualification = (data) => {
        const updateObj = {};
        qualificationApi.create(data)
            .then(res => res.json())
            .then(response => {
                const {errors} = response;
                if(!!errors) {
                    if(data.type === QUALIFICATION_TYPES.education) {
                        updateObj.educationFormErrors = errors;
                    } else {
                        updateObj.experienceFormErrors = errors;
                    }
                } else {
                    if(response.type === QUALIFICATION_TYPES.education) {
                        updateObj.education = [response, ...this.state.education];
                    } else {
                        updateObj.experiences = [response, ...this.state.experiences];
                    }
                }
                this.setState(updateObj);
            });
    }

    showQualificationForm = (qualificationType) => () => {
        const formObj = {};
        const formKey = `show${qualificationType}Form`;
        formObj[formKey] = true;
        this.setState(formObj);
    }

    render() {
        const {error, errNotification, education, experiences, loading, showEducationForm, showExperienceForm} = this.state;
        const {educationFormErrors, experienceFormErrors} = this.state;
        return (
            <div className='education-and-experience'>
                <div className='education-container'>
                    <button onClick={this.showQualificationForm(QUALIFICATION_TYPES.education)}>
                        Add new Qualification
                    </button>
                    {
                        showEducationForm && <NewQualification
                            addQualification = { this.addQualification }
                            qualificationType = { QUALIFICATION_TYPES.education}
                            key = 'education-new-form'
                            formErrors = { educationFormErrors } />
                    }

                    {
                        education.length > 0 && <EducationList education = { education } />
                    }
                </div>
                <div className='experience-container'>
                    <button onClick={this.showQualificationForm(QUALIFICATION_TYPES.experience)}>
                        Add new Experience
                    </button>
                    {
                        showExperienceForm && <NewQualification
                            addQualification={ this.addQualification }
                            qualificationType={ QUALIFICATION_TYPES.experience }
                            key = 'education-new-form'
                            formErrors = { experienceFormErrors } />
                    }

                    {
                        experiences.length > 0 && <ExperienceList experiences={experiences} />
                    }
                </div>
            </div>
        )
    }
}
