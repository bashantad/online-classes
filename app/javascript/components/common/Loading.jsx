import React from 'react';

const Loading = () => (
    <div className="course-cards mt-3 mb-2">
        <div className="d-flex justify-content-center text-primary">
            <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    </div>
);
export default Loading;
