import React from "react";
import enquiryApi from "../../apis/enquiryApi";
import {Link} from "react-router-dom";
import EnquiryFormHomeView from "./EnquiryFormHomeView";

export default class EnquiryForm extends React.Component {
    state = {
        fullName: '',
        email: '',
        phone: '',
        message: '',
        formErrors: {},
        loading: false,
        successMessage: '',
        errorMessage: '',
    }

    handleInputChange = ({target}) => {
        const {name, value} = target;
        this.setState({[name]: value});
    }

    submitEnquiry = () => {
        this.setState({loading: true});
        const {fullName, email, phone, message} = this.state;
        const data = {
            full_name: fullName,
            email: email,
            message: message,
            phone: phone,
            enquiry_type: 'Homepage',
        };

        enquiryApi.submit(data)
            .then(res => res.json())
            .then((response) => {
                if (response.success) {
                    this.setState({successMessage: response.success, loading: false});
                } else if (response.error) {
                    this.setState({errorMessage: response.error, loading: false});
                } else {
                    this.setState({formErrors: response.errors, loading: false});
                }
            })
    }

    render() {
        const {fullName, email, phone, message, formErrors, successMessage, errorMessage, loading} = this.state;
        return (
            <div className="position-relative">
                <div className="bg-primary bg-img-hero home-enquiry-bg"
                >
                    <div className="container space-top-2 space-bottom-2">
                        <div>
                            {
                                successMessage ?
                                    <>
                                        <div className="text-center py-3 course-create-bg">
                                            <h2 className="text-white text-lh-lg">Ready to upgrade your skills?
                                                <div
                                                    className="text-warning">Start exploring.
                                                </div>
                                            </h2>
                                            <span className="d-block mt-5">
                                                <Link to='/courses'
                                                      className='btn btn-light transition-3d-hover'>More Courses.</Link>
                                                    </span>
                                        </div>
                                        <div className='alert alert-success'>
                                            {successMessage}
                                        </div>
                                    </>
                                    :
                                    <>
                                        <div className="w-lg-50 text-center text-white mx-lg-auto mb-7">
                                         <span
                                             className="d-block small text-white-70 font-weight-bold text-cap mb-2">Enquiry</span>
                                            <h2 className="text-white text-lh-lg">Want to know more about us?
                                                <div
                                                    className="text-warning">Send us a message.
                                                </div>
                                            </h2>
                                        </div>
                                        <EnquiryFormHomeView isLoading={loading}
                                                             errorMessage={errorMessage}
                                                             fullName={fullName}
                                                             email={email}
                                                             phone={phone}
                                                             message={message}
                                                             formErrors={formErrors}
                                                             handleInputChange={this.handleInputChange}
                                                             submitEnquiry={this.submitEnquiry}/>
                                    </>

                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
