import React from 'react';
import NewForm from './NewForm';
import EducationList from './EducationList';
import ExperienceList from './ExperienceList';
import qualificationApi from '../../apis/qualificationApi';
import {isEmpty} from "../../utils/utils";

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
        modelId: ''
    }

    componentDidMount() {
        qualificationApi.getAll()
            .then(res => res.json())
            .then(response => {
                const {experiences, education} = response;
                this.setState({experiences, education, loading: false});
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
                if (!!errors) {
                    if (data.type === QUALIFICATION_TYPES.education) {
                        updateObj.educationFormErrors = errors;
                    } else {
                        updateObj.experienceFormErrors = errors;
                    }
                } else {
                    if (response.type === QUALIFICATION_TYPES.education) {
                        updateObj.education = [response, ...this.state.education];
                    } else {
                        updateObj.experiences = [response, ...this.state.experiences];
                    }
                }
                this.setState(updateObj);
            });
    }

    showQualificationForm = (qualificationType) => () => {
        this.setState({modelId: qualificationType})
    }

    render() {
        const {error, errNotification, education, experiences, loading, showEducationForm, showExperienceForm} = this.state;
        const {educationFormErrors, experienceFormErrors} = this.state;
        return (
            <>
                <div className="container space-1">
                    <div className="row justify-content-lg-between align-items-lg-center">
                        <div className="col-sm-12 col-lg-12 mb-2 mb-lg-0">
                            <div className="card">
                                <div className="container space-1">
                                    <div className="w-md-75 w-lg-85 space-bottom-1 mx-md-auto">
                                        <div className="media d-block d-sm-flex">
                                            <div className="position-relative mx-auto mb-3 mb-sm-0 mr-sm-4" style={{
                                                width: '160px',
                                                height: '160px'
                                            }}>
                                                <img className="img-fluid rounded-circle"
                                                     src="../../assets/components/160x160/img1.jpg"
                                                     alt="Image Description" width="160" height="160"/>
                                                <img
                                                    className="bg-white position-absolute bottom-0 right-0 rounded-circle p-1"
                                                    src="../../assets/illustrations/top-vendor.svg" alt="Icon"
                                                    width="36" height="36" title="Top Writer"/>
                                            </div>

                                            <div className="media-body">
                                                <div className="d-flex justify-content-between align-items-center mb-2">
                                                    <h1 className="h3">Hanna Wolfe</h1>
                                                </div>

                                                <div className="row text-body font-size-1 mb-2">
                                                    <div className="col-auto">
                                                        <span className="h6 pr-2">906</span>
                                                        <span>Posts</span>
                                                    </div>
                                                    <div className="col-auto">
                                                        <span className="h6 pr-2">19.5k</span>
                                                        <span>Followers</span>
                                                    </div>
                                                    <div className="col-auto">
                                                        <span className="h6 pr-2">109</span>
                                                        <span>Following</span>
                                                    </div>
                                                </div>

                                                <p className="mb-0">Nataly is a freelance journalist who's been
                                                    published by Popular Science, The Washington Post, USA Today, Slate,
                                                    and many more. Read more at <a className="font-weight-bold"
                                                                                   href="#">hannawolfe.com</a></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <figure
                                    className="max-w-13rem w-100 position-absolute bottom-0 right-0 z-index-n1 hide-svg">
                                    <div className="mb-n7 mr-n7">
                                        <img className="img-fluid" src="../../assets/components/dots-3.svg"
                                             alt="Image Description"/>
                                    </div>
                                </figure>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container space-1">
                    <div className="row justify-content-lg-between align-items-lg-center">
                        <div className="col-sm-12 col-lg-12 mb-2 mb-lg-0">
                            <div className="card space-1" id="education">
                                <div className=" w-lg-85 mx-auto">
                                    <div aria-labelledby="qualifications-tab">
                                        <div className="card-header">
                                            <h5 className="card-title">Education</h5>
                                            <span>
                                            <button type="button" data-toggle="modal" data-target="#formModal"
                                                    aria-controls="qualificationForm"
                                                    onClick={this.showQualificationForm(QUALIFICATION_TYPES.education)}
                                                    className="btn btn-xs btn-outline-primary font-weight-bold text-nowrap ml-1">
                                                <i className='fas fa-plus mr-1'></i> Add New
                                            </button>
                                        </span>
                                        </div>
                                        <div className="card-body">
                                            {
                                                loading ? <div className="d-flex">
                                                    <div className="spinner-border" role="status">
                                                        <span className="sr-only"></span>
                                                    </div>
                                                </div> : isEmpty(education) ? <div>
                                                    <figure className="max-w-10rem mx-auto mt-4">
                                                        <img className="img-fluid" src="../../assets/icons/icon-21.svg"
                                                             alt="SVG"/>
                                                    </figure>
                                                    <div className="text-center mt-2">Qualification not added!</div>
                                                </div> : <EducationList education={education}
                                                                        type={QUALIFICATION_TYPES.education}/>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="card space-1 mt-3" id="experience">
                                <div className=" w-lg-85 mx-auto">
                                    <div aria-labelledby="experience-tab">
                                        <div className="card-header">
                                            <h5 className="card-title">Experience</h5>
                                            <span>
                                             <button type="button" data-toggle="modal" data-target="#formModal"
                                                     aria-controls="educationForm"
                                                     onClick={this.showQualificationForm(QUALIFICATION_TYPES.experience)}
                                                     className="btn btn-xs btn-outline-primary font-weight-bold text-nowrap ml-1"
                                             ><i className='fas fa-plus mr-1'></i> Add New
                                            </button>
                                        </span>
                                        </div>
                                        <div className="card-body">
                                            {
                                                loading ? <div className="d-flex">
                                                    <div className="spinner-border" role="status">
                                                        <span className="sr-only"></span>
                                                    </div>
                                                </div> : isEmpty(experiences) ? <div>
                                                    <figure className="max-w-10rem mx-auto mt-4">
                                                        <img className="img-fluid" src="../../assets/icons/icon-42.svg"
                                                             alt="SVG"/>
                                                    </figure>
                                                    <div className="text-center mt-2">Experience not added!</div>
                                                </div> : <ExperienceList experiences={experiences}
                                                                         type={QUALIFICATION_TYPES.experience}/>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    this.state.modelId === 'Experience' ? <NewForm
                            addQualification={this.addQualification}
                            qualificationType={QUALIFICATION_TYPES.experience}
                            key='education-new-form'
                            formErrors={experienceFormErrors}/> :
                        <NewForm
                            addQualification={this.addQualification}
                            qualificationType={QUALIFICATION_TYPES.education}
                            key='education-new-form'
                            formErrors={educationFormErrors}/>

                }
            </>
        )
    }
}
