import React from 'react';
import PropTypes from "prop-types";

const DeleteExperienceQualification = ({data, type, deleteItem}) => {

    return (
        <div className="modal fade" id="deleteExperienceModal" tabIndex="-1" role="dialog" aria-labelledby="delete"
             aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel"><i
                            className='fas fa-trash fa-md mr-1'></i> Delete</h5>
                        <button type="button" className="btn btn-xs btn-icon btn-soft-secondary" data-dismiss="modal"
                                aria-label="Close">
                            <i className='fas fa-times fa-sm'></i>
                        </button>
                    </div>
                    <div className="modal-body">
                        Are you sure you want to delete?
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-white" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" data-dismiss="modal"
                                onClick={() => deleteItem(data.id, type)}>Yes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

DeleteExperienceQualification.propTypes = {
    deleteItem: PropTypes.func.isRequired,
    formErrors: PropTypes.object.isRequired,
    qualificationType: PropTypes.string.isRequired,
};

export default DeleteExperienceQualification;