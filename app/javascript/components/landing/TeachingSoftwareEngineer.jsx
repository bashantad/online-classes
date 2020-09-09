import React from 'react';

import hikerImg from '../../../assets/images/illustrations/discussion-scene.svg'
import mobileArticle from '../../../assets/images/illustrations/communicating-men.svg'
import icon1 from '../../../assets/images/icons/icon-29.svg'
import icon2 from '../../../assets/images/icons/icon-24.svg'
import icon3 from '../../../assets/images/icons/icon-7.svg'
import pointers from '../../../assets/images/components/three-pointers.svg'
import airbnb from '../../../assets/images/clients-logo/airbnb-original.svg'
import dots from '../../../assets/images/components/dots-1.svg'
import stars from '../../../assets/images/illustrations/stars.svg'
import avatars from '../../../assets/images/illustrations/verified-user.svg'

const TeachingSoftwareEngineer = () => {
    return (
        <>
            <div className="container space-top-4 space-top-lg-5 space-bottom-3 space-bottom-lg-5">
                <div className="row justify-content-lg-between mb-7">
                    <div className="col-md-6 col-lg-5">
                        <div className="mb-5">
                            <h1>Ready to teach?</h1>
                            <p>Apply to teach for our community of students who wants to go to the next level. With your help, expertise and experience,
                                guide them to become a leading Software Engineer.
                            </p>
                        </div>

                        <div className="mb-3">
                            <a className="btn btn-primary btn-wide transition-3d-hover mb-2 mb-sm-0 mr-3" href="#">Start Teaching</a>
                            <a className="btn btn-link mb-2 mb-sm-0" href="#mail">Let's Talk <i
                                className="fas fa-angle-right fa-sm ml-1"></i></a>
                        </div>

                        <p className="small">Start free trial. * No credit card required.</p>
                    </div>

                    <div className="col-md-6 d-none d-md-inline-block">
                        <figure className="w-100">
                            <img className="img-fluid" src={hikerImg}
                                 alt="Hiker"/>
                        </figure>
                    </div>
                </div>
            </div>
            <div className="container space-2">
                <div className="w-lg-65 text-center mx-auto mb-5 mb-sm-9">
                    <h2 className="h1">How you will help?</h2>
                    <p>Put your expertise to good use.</p>
                </div>

                <div className="row">
                    <div className="col-md-4 mb-7">
                        <div className="text-center px-lg-3">
                            <figure className="max-w-8rem mx-auto mb-4">
                                <img className="img-fluid" src={icon1} alt="Blocks"/>
                            </figure>
                            <h3>Create Courses</h3>
                            <p>Develop you own specialized course for maximum fun and effeciency.</p>
                        </div>
                    </div>

                    <div className="col-md-4 mb-7">
                        <div className="text-center px-lg-3">
                            <figure className="max-w-8rem mx-auto mb-4">
                                <img className="img-fluid" src={icon2} alt="Chess"/>
                            </figure>
                            <h3>Learn and teach</h3>
                            <p>When one teaches, many learns.</p>
                        </div>
                    </div>

                    <div className="col-md-4 mb-7">
                        <div className="text-center px-lg-3">
                            <figure className="max-w-8rem mx-auto mb-4">
                                <img className="img-fluid" src={icon3} alt="Rocket"/>
                            </figure>
                            <h3>Grow you community</h3>
                            <p>You can interact with many users across our community and build your own group. </p>
                        </div>
                    </div>
                </div>

                <img className="img-fluid d-none d-md-block w-75 mx-auto mb-7"
                     src={pointers} alt="SVG Arrow"/>

                <div className="w-md-60 w-lg-50 text-center mx-auto mb-7 space-bottom-3">
                    <p className="text-dark"><span className="font-weight-bold">Fun and Effective. </span>Join our community and teach with Updrake</p>
                </div>
            </div>

            <div class="overflow-hidden">
                <div class="container space-bottom-4">
                    <div class="position-relative">
                        <div class="bg-light text-center rounded p-4 p-md-7">
                            <div class="mb-4">
                                <img class="max-w-11rem max-w-md-13rem mx-auto" src={airbnb} alt="Airbnb"/>
                            </div>

                            <div class="w-md-80 w-lg-50 mx-md-auto mb-6">
                                <blockquote class="lead text-dark">With Front, we're able to easily track our performance in full detail. It's become an essential tool for us to grow and engage with our audience.</blockquote>
                            </div>

                            <div class="w-lg-50 mx-lg-auto">
                                <h4 class="mb-0">Christina Kray</h4>
                                <small>Social Media Executive, Airbnb</small>
                            </div>

                        </div>


                        <figure class="max-w-15rem w-100 position-absolute bottom-0 left-0">
                            <div class="mb-n7 ml-n7">
                                <img class="img-fluid" src={dots} alt="Dots"/>
                            </div>
                        </figure>

                    </div>
                </div>
            </div>

            <div class="position-relative text-center" id='mail'>
                <div class="container space-2 space-bottom-lg-4">

                    <div class="w-md-60 mx-md-auto mb-5 mb-md-7">
                        <h2 class="h1">Join our community</h2>
                        <p>Drop us your mail and we will get back to you.</p>
                    </div>

                    <div class="w-md-75 w-lg-50 mx-md-auto">
                        <form class="js-validate mb-3">
                            <div class="form-row">
                                <div class="col-sm-8 mb-2">
                                    <div class="js-form-message">
                                        <label class="sr-only" for="signupSrEmailExample3">Your email</label>
                                        <div class="input-group input-group-pill">
                                            <input type="email" class="form-control" name="email" id="signupSrEmailExample3" placeholder="Your email" aria-label="Your email" required
                                                   data-msg="Please enter a valid email address."/>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-sm-4">
                                    <button type="submit" class="btn btn-primary btn-pill btn-wide">Get Started</button>
                                </div>
                            </div>
                        </form>

                        <p>We also have tons of other courses. <a class="font-weight-bold" href="#">Explore <i class="fas fa-angle-right ml-1"></i></a></p>
                    </div>

                    <div class="d-none d-lg-block position-absolute bottom-0 left-4 max-w-40rem w-100">
                        <img class="img-fluid" src={mobileArticle} alt="Man on Mobile"/>
                    </div>
                </div>
            </div>


            <div class="container space-2 space-top-0 bg-light">
                <div class="row justify-content-lg-center">
                    <div class="col-md-4 mb-7 mb-lg-0">
                        <div class="text-center px-md-3 px-lg-7">
                            <figure class="mb-3">
                                <img src={stars} alt="Stars" width="71" height="64"/>
                            </figure>
                            <p class="mb-0"><span class="text-dark font-weight-bold">4.83 out of 5 starts</span> from 53 reviews</p>
                        </div>
                    </div>

                    <div class="col-md-4 mb-7 mb-lg-0">
                        <div class="text-center column-divider-md column-divider-20deg px-md-3 px-lg-7">
                            <figure class="mb-3">
                                <img src={avatars} alt="avatar" width="71" height="64"/>
                            </figure>
                            <p class=" mb-0">Over <span class="text-dark font-weight-bold">500</span> support questions have been closed</p>
                        </div>

                    </div>

                    <div class="col-md-4">

                        <div class="text-center column-divider-md column-divider-20deg px-md-3 px-lg-7">
                            <figure class="mb-3">
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="71" height="64" viewBox="0 0 71.7 64">
                                    <path fill="none" stroke="#21325b" stroke-width="2" d="M47.9,1.3H20.1c-2,0-3.5,1.5-3.5,3.5v51.4c0,2,1.5,3.5,3.5,3.5h36.5c2,0,3.5-1.5,3.5-3.5v-8.6V21.2v-7.5
              L47.9,1.3z"/>
                                    <path fill="#21325b" d="M49.1,14.7c-1.1,0-1.8-0.9-1.8-1.8V2L60,14.7H49.1z"/>
                                    <line fill="none" stroke="#21325b" stroke-width="2" stroke-linecap="round" x1="48.2" y1="21" x2="28" y2="21"/>
                                    <line fill="none" stroke="#21325b" stroke-width="2" stroke-linecap="round" x1="48.2" y1="27.9" x2="28" y2="27.9"/>
                                    <line fill="none" stroke="#21325b" stroke-width="2" stroke-linecap="round" x1="48.2" y1="34.8" x2="28" y2="34.8"/>
                                    <line fill="none" stroke="#21325b" stroke-width="2" stroke-linecap="round" x1="48.2" y1="42" x2="28" y2="42"/>
                                    <path opacity=".2" fill="#21325b" d="M17.1,56V10.2c0-1.4-1.1-2.5-2.5-2.5h-0.5c-1.4,0-2.5,1.1-2.5,2.5v51.1c0,1.4,1.1,2.5,2.5,2.5h2.9h34.7
              c1.4,0,2.5-1.1,2.5-2.5v-0.5c0-1.4-1.1-2.5-2.5-2.5H19.5C18.1,58.4,17.1,57.4,17.1,56z"/>
                                </svg>
                            </figure>
                            <p class="mb-0"><span class="text-dark font-weight-bold">3,700</span> Front copies have been purchased</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="container space-2 space-top-4">
                <h2>FAQs</h2>

                <div id="basicsAccordion">
                    <div class="card shadow-none mb-3">
                        <div class="card-header card-collapse" id="basicsHeadingOne">
                            <a class="btn btn-link btn-block d-flex justify-content-between card-btn collapsed bg-white px-0" href="javascript:;" role="button" data-toggle="collapse" data-target="#basicsCollapseOne" aria-expanded="false" aria-controls="basicsCollapseOne">
                                Do you have any built-in caching?

                                <span class="card-btn-toggle">
            <span class="card-btn-toggle-default">+</span>
            <span class="card-btn-toggle-active">−</span>
          </span>
                            </a>
                        </div>
                        <div id="basicsCollapseOne" class="collapse" aria-labelledby="basicsHeadingOne" data-parent="#basicsAccordion">
                            <div class="card-body px-0">
                                <p>Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.</p>
                                <p>Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.</p>
                            </div>
                        </div>
                    </div>

                    <div class="card shadow-none mb-3">
                        <div class="card-header card-collapse" id="basicsHeadingTwo">
                            <a class="btn btn-link btn-block d-flex justify-content-between card-btn collapsed bg-white px-0" href="javascript:;" role="button" data-toggle="collapse" data-target="#basicsCollapseTwo" aria-expanded="false" aria-controls="basicsCollapseTwo">
                                Can I add/upgrade my plan at any time?

                                <span class="card-btn-toggle">
            <span class="card-btn-toggle-default">+</span>
            <span class="card-btn-toggle-active">−</span>
          </span>
                            </a>
                        </div>
                        <div id="basicsCollapseTwo" class="collapse" aria-labelledby="basicsHeadingTwo" data-parent="#basicsAccordion">
                            <div class="card-body px-0">
                                <p>Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.</p>
                                <p>Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.</p>
                            </div>
                        </div>
                    </div>

                    <div class="card shadow-none mb-3">
                        <div class="card-header card-collapse" id="basicsHeadingThree">
                            <a class="btn btn-link btn-block d-flex justify-content-between card-btn collapsed bg-white px-0" href="javascript:;" role="button" data-toggle="collapse" data-target="#basicsCollapseThree" aria-expanded="false" aria-controls="basicsCollapseThree">
                                What access comes with my hosting plan?

                                <span class="card-btn-toggle">
            <span class="card-btn-toggle-default">+</span>
            <span class="card-btn-toggle-active">−</span>
          </span>
                            </a>
                        </div>
                        <div id="basicsCollapseThree" class="collapse" aria-labelledby="basicsHeadingThree" data-parent="#basicsAccordion">
                            <div class="card-body px-0">
                                <p>Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.</p>
                                <p>Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.</p>
                            </div>
                        </div>
                    </div>

                    <div class="card shadow-none mb-3">
                        <div class="card-header card-collapse" id="basicsHeadingFour">
                            <a class="btn btn-link btn-block d-flex justify-content-between card-btn collapsed bg-white px-0" href="javascript:;" role="button" data-toggle="collapse" data-target="#basicsCollapseFour" aria-expanded="false" aria-controls="basicsCollapseFour">
                                How do I change my password?

                                <span class="card-btn-toggle">
            <span class="card-btn-toggle-default">+</span>
            <span class="card-btn-toggle-active">−</span>
          </span>
                            </a>
                        </div>
                        <div id="basicsCollapseFour" class="collapse" aria-labelledby="basicsHeadingFour" data-parent="#basicsAccordion">
                            <div class="card-body px-0">
                                <p>Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.</p>
                                <p>Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.</p>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}

export default TeachingSoftwareEngineer;

