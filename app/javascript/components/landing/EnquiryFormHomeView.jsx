import React from "react";
import PropTypes from "prop-types";
import WithLoading from "../common/WithLoading";

const EnquiryFormView = ({formErrors, fullName, phone, message, email, handleInputChange, submitEnquiry}) => {
    return (
        <div>
            <div className="position-relative w-lg-50 z-index-2 mx-lg-auto">
                <div className="card shadow-lg p-4 p-lg-7">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="js-form-message form-group mb-3">
                                <label htmlFor="name" className="input-label">Full name</label>
                                <input type="text" className="form-control" name="fullName"
                                       placeholder="Please enter your name." value={fullName}
                                       onChange={handleInputChange}/>
                            </div>
                        </div>

                        <div className="col-sm-12">
                            <div className="js-form-message form-group mb-3">
                                <label htmlFor="emailAddress" className="input-label">Email
                                    address</label>
                                <input type="email" className="form-control" name="email"
                                       placeholder="Please enter a valid email address." required value={email}
                                       onChange={handleInputChange}/>
                            </div>
                            {
                                formErrors.email && <span className='field-error'>
                                                    {formErrors.email}
                                                </span>
                            }
                        </div>

                        <div className="col-sm-12">
                            <div className="js-form-message form-group mb-3">
                                <label htmlFor="phone" className="input-label">Phone
                                    <span
                                        className="text-muted font-weight-normal ml-1">(optional)</span></label>
                                <input type="text" className="form-control" name="phone"
                                       value={phone}
                                       onChange={handleInputChange}/>
                            </div>
                        </div>

                        <div className="col-sm-12">
                            <div className="js-form-message form-group mb-3">
                                <label htmlFor="message" className="input-label">Message</label>
                                <textarea className="form-control" rows="3" name="message"
                                          value={message}
                                          onChange={handleInputChange}
                                          placeholder="Hi there, I would like to ..." required
                                          data-msg="Please enter your message."></textarea>
                            </div>
                        </div>
                    </div>

                    <div className="d-md-flex justify-content-md-end">
                        <button type="submit" className="btn btn-primary btn-wide transition-3d-hover" onClick={submitEnquiry}>Submit
                        </button>
                    </div>
                </div>
            </div>

            <figure className="position-absolute right-0 bottom-0 left-0">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" style={{marginBottom: '-8px'}}>
                    <path fill="#ffffff" fill-opacity="1" d="M0,288L1440,64L1440,320L0,320Z"></path>
                </svg>
            </figure>
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
