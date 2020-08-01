import React from "react";
import EnquiryForm from "./EnquiryForm";

const StudentEnquiry = () => {
    return (
        <div className="position-relative">
            <div className="container space-2">
                <div className="row justify-content-lg-between align-items-lg-center">
                    <div className="col-lg-5 mb-7 mb-lg-0">
                        <div className="mb-5">
                            <h2>Thousands of experts around the world ready to help you.</h2>
                            <p>See why leading organizations choose Front Course for Business as their destination for employee learning.</p>
                        </div>
                        <h4>Learn more about:</h4>
                        <div className="media text-body mb-3">
                            <i className="fas fa-check-circle text-success mt-1 mr-2"></i>
                            <div className="media-body">
                                Unlimited access to the top 3,500+ courses
                            </div>
                        </div>
                        <div className="media text-body mb-3">
                            <i className="fas fa-check-circle text-success mt-1 mr-2"></i>
                            <div className="media-body">
                                Fresh content taught by 1,300+ experts – for any learning style
                            </div>
                        </div>
                        <div className="media text-body mb-3">
                            <i className="fas fa-check-circle text-success mt-1 mr-2"></i>
                            <div className="media-body">
                                Actionable learning insights <span className="badge badge-warning badge-pill ml-1">Beta</span>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <EnquiryForm />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StudentEnquiry;
