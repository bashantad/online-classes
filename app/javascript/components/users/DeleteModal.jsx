import React from 'react';
import qualificationApi from "../../apis/qualificationApi";

const DeleteModal = (data) => {
    console.log(data)
    const deleteItem = () => {
        qualificationApi.delete(data.data.id)
            .then(res => res.json())
            .then(response => {
                const {errors} = response;
                if (!!errors) {
                 console.log(error)
                    }
                else {
                    console.log('Success')
                }
            })
    }

    return (
    <div className="modal fade" id="deleteModal" tabIndex="-1" role="dialog" aria-labelledby="delete" aria-hidden="true">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel"><i
                        className='fas fa-trash fa-md mr-1'></i> Delete</h5>
                    <button type="button" className="btn btn-xs btn-icon btn-soft-secondary" data-dismiss="modal" aria-label="Close">
                        <i className='fas fa-times fa-sm'></i>
                    </button>
                </div>
                <div className="modal-body">
                    Are you sure you want to delete?
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-white" data-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" onClick={() => deleteItem()}>Yes</button>
                </div>
            </div>
        </div>
    </div>
    );
};

export default DeleteModal;