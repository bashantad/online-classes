import React from 'react';

import noPage from '../../assets/images/illustrations/error-number-404.svg'

const NotFoundPage = () => (
    <>
    <main id="content" role="main">
        <div className="d-lg-flex">
            <div className="container d-lg-flex align-items-lg-center space-4">
                <div className="w-lg-60 w-xl-50">
                    <div className="mb-4">
                        <img className="max-w-23rem mb-3" src={noPage}
                             alt="SVG Illustration"/>
                            <p className="lead">Oops! Looks like you followed a bad link. <br/> If you think this is a
                                problem with us, please <a href="#">tell us.</a></p>
                    </div>
                    <a className="btn btn-wide btn-primary transition-3d-hover" href="/">Back
                        Home</a>
                </div>
            </div>
        </div>

    </main>

<footer className="position-absolute right-0 bottom-0 left-0">
    <div className="container">
        <div className="d-flex justify-content-between align-items-center space-1">
            <p className="small text-muted mb-0">&copy; Front. 2020 Htmlstream.</p>

            <ul className="list-inline mb-0">
                <li className="list-inline-item">
                    <a className="btn btn-xs btn-icon btn-ghost-secondary" href="#">
                        <i className="fab fa-facebook-f"></i>
                    </a>
                </li>
                <li className="list-inline-item">
                    <a className="btn btn-xs btn-icon btn-ghost-secondary" href="#">
                        <i className="fab fa-google"></i>
                    </a>
                </li>
                <li className="list-inline-item">
                    <a className="btn btn-xs btn-icon btn-ghost-secondary" href="#">
                        <i className="fab fa-twitter"></i>
                    </a>
                </li>
                <li className="list-inline-item">
                    <a className="btn btn-xs btn-icon btn-ghost-secondary" href="#">
                        <i className="fab fa-github"></i>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</footer>
    </>
);

export default NotFoundPage;
