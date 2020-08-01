import React from "react";
import enquiryApi from "../../apis/enquiryApi";
import {Link} from "react-router-dom";
import EnquiryFormView from "./EnquiryFormView";

export default class EnquiryForm extends React.Component {
    state = {
        fullName: '',
        email: '',
        phone: '',
        formErrors: {},
        loading: false,
        successMessage: '',
        errorMessage: '',
    }

    handleInputChange = ({target}) => {
        const { name, value } = target;
        this.setState({[name]: value});
    }

    submitEnquiry = () => {
        this.setState({loading: true});
        const {fullName, email, phone} = this.state;
        const data = {
            full_name: fullName,
            email: email,
            phone: phone,
            enquiry_type: 'Software Developer Landing Page',
        };

        enquiryApi.submit(data)
            .then(res => res.json())
            .then((response) => {
                if(response.success) {
                    this.setState({successMessage: response.success, loading: false});
                } else if(response.error) {
                    this.setState({errorMessage: response.error, loading: false});
                } else {
                    this.setState({formErrors: response.errors, loading: false});
                }
            })
    }
    render() {
        const {fullName, email, phone, formErrors, successMessage, errorMessage, loading} = this.state;
        return (
            <div className="js-validate card border w-md-85 w-lg-100 mx-md-auto">
                <div className="card-header bg-primary text-white text-center py-4 px-5 px-md-6">
                    <h4 className="text-white mb-0">
                        Want to know more about the course
                    </h4>
                </div>

                <div className="card-body p-md-6">
                    {
                        successMessage ?
                            <>
                                <div className='alert alert-success'>
                                    {successMessage}
                                </div>
                                Start exploring <Link to='/courses'>courses</Link>
                            </>
                            : <EnquiryFormView isLoading={loading}
                                               errorMessage={errorMessage}
                                               fullName={fullName}
                                               email={email}
                                               phone={phone}
                                               formErrors={formErrors}
                                               handleInputChange={this.handleInputChange}
                                               submitEnquiry={this.submitEnquiry} />

                    }
                </div>
            </div>
        );
    }
}
