import React from "react";
const Header = () => (
    <div className="bg-primary">
        <div className="container space-2">
            <div className="row justify-content-lg-between align-items-lg-center text-center text-lg-left">
                <div className="col-lg-5 mb-5 mb-lg-0">
                    <h2 className="text-white mb-0">
                        Become a software developer in 9 months
                    </h2>
                </div>

                <div className="col-lg-5 text-lg-right">
                    <a className="btn btn-indigo btn-wide btn-pill transition-3d-hover mx-1 mb-2" href="#enquiry-form">Get Started</a>
                    <a className="btn btn-light btn-wide btn-pill transition-3d-hover mx-1 mb-2" href="#">Learn More</a>
                </div>
            </div>
        </div>
    </div>
);

export default Header;
