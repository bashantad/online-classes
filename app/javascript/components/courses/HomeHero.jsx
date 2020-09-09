import React from "react";
import ReadingImage from "../../../assets/images/illustrations/reading.svg";

const HomeHero = () => {
    return <div className="container space-2">
        <div className="row justify-content-lg-between align-items-lg-center">
            <div className="col-sm-10 col-lg-5 mb-7 mb-lg-0">
                <img className="img-fluid" src={ReadingImage} alt="Reading image"/>
            </div>

            <div className="col-lg-6">
                <div className="mb-5">
                    <h2 className="display-4 mb-3">
                        Learn skills to
                        <br/>
                        build your career
                    </h2>
                    <p className="lead">
                        With our platform, you only learn what matters i.e things needed for you to get a job or get promoted.
                    </p>
                </div>

                <div className="d-sm-flex align-items-sm-center flex-sm-wrap">
                    <a className="btn btn-primary mb-2" href="/users/sign_up">
                        Get Started
                    </a>

                    <div className="mx-2"></div>

                    <a className="js-fancybox video-player video-player-btn media align-items-center text-dark mb-2"
                       href="#"
                       data-hs-fancybox-options='{
                         "src": "//youtube.com/0qisGSwZym4",
                         "caption": "Front - Responsive Website Template",
                         "speed": 700,
                         "buttons": ["fullScreen", "close"],
                         "youtube": {
                           "autoplay": 1
                         }
                       }'>
                            <span className="video-player-icon shadow-soft mr-3">
                                <i className="fa fa-play"></i>
                            </span>
                            <span className="media-body">
                                How it works
                            </span>
                    </a>
                </div>
            </div>
        </div>
    </div>;
}

export default HomeHero;
