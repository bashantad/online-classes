import React from "react";
import PropTypes from "prop-types";
import WithLoading from "../common/WithLoading";

const EnquiryFormView = ({formErrors, fullName, phone, email, handleInputChange, submitEnquiry}) => {
    return (
        <div id="enquiry-form">
            <div className="row">
                <div className="col-sm-12 mb-3">
                    <div className="js-form-message form-group">
                        <label htmlFor="firstName" className="input-label">Full name</label>
                        <input type="text" className="form-control" name="fullName"
                               placeholder="Nataly Gaga" value={fullName}
                               onChange={handleInputChange}/>
                    </div>
                </div>

                <div className="col-sm-12 mb-3">
                    <div className="js-form-message form-group">
                        <label htmlFor="emailAddress" className="input-label">Email
                            address</label>
                        <input type="email" className="form-control" name="email"
                               placeholder="example@gmail.com" required value={email}
                               onChange={handleInputChange}/>
                    </div>
                    {
                        formErrors.email && <span>
                                                    {formErrors.email}
                                                </span>
                    }
                </div>

                <div className="col-sm-12 mb-3">
                    <div className="js-form-message form-group">
                        <label htmlFor="phone" className="input-label">Phone
                            (optional)</label>
                        <input type="text" className="form-control" name="phone"
                               value={phone}
                               onChange={handleInputChange}/>
                    </div>
                </div>
            </div>

            <div className="row align-items-center">
                <div className="col-sm-5 text-sm-right">
                    <button type="submit" className="btn btn-sm btn-primary transition-3d-hover"
                            onClick={submitEnquiry}>
                        Submit
                    </button>
                </div>
            </div>
        </div>
    )
}

EnquiryFormView.propTypes = {
    formErrors: PropTypes.object.isRequired,
    fullName: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
    handleInputChange: PropTypes.func.isRequired,
    submitEnquiry: PropTypes.func.isRequired,
}

export default WithLoading(EnquiryFormView);
