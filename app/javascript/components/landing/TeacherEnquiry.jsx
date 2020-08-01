import React from "react";
import EnquiryForm from "./EnquiryForm";
const StudentEnquiry = () => {
    return (
        <div class="position-relative">
            <div class="container space-2">
                <div class="row justify-content-lg-between align-items-lg-center">
                    <div class="col-lg-5 mb-7 mb-lg-0">
                        <!-- Info -->
                        <div class="mb-5">
                            <h2>Thousands of experts around the world ready to help you.</h2>
                            <p>See why leading organizations choose Front Course for Business as their destination for employee learning.</p>
                        </div>
                        <h4>Learn more about:</h4>
                        <div class="media text-body mb-3">
                            <i class="fas fa-check-circle text-success mt-1 mr-2"></i>
                            <div class="media-body">
                                Unlimited access to the top 3,500+ courses
                            </div>
                        </div>
                        <div class="media text-body mb-3">
                            <i class="fas fa-check-circle text-success mt-1 mr-2"></i>
                            <div class="media-body">
                                Fresh content taught by 1,300+ experts – for any learning style
                            </div>
                        </div>
                        <div class="media text-body mb-3">
                            <i class="fas fa-check-circle text-success mt-1 mr-2"></i>
                            <div class="media-body">
                                Actionable learning insights <span class="badge badge-warning badge-pill ml-1">Beta</span>
                            </div>
                        </div>
                        <!-- End Info -->
                    </div>

                    <div class="col-lg-6">
                        <EnquiryForm />
                    </div>
                </div>
            </div>
        </div>
    );
}
