import React from 'react';

const Contents = () => {
    return (
        <div className="border-top pt-7 mt-7 mb-7">
            <div className="row mb-4">
                <div className="col-8">
                    <h3 className="mb-0">Course content</h3>
                </div>
                <div className="col-4 text-right">
                    <div className="row">
                        <div className="col-lg-6">
                            <span className="font-size-1">186 lectures</span>
                        </div>
                        <div className="col-lg-6">
                            <span className="font-size-1">24:10:28</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card border mb-1">
                <div className="card-header card-collapse" id="coursesHeadingOne">
                    <a className="btn btn-link btn-sm btn-block card-btn p-3"
                       href="#" role="button" data-toggle="collapse"
                       data-target="#coursesCollapseOne"
                       aria-expanded="true" aria-controls="coursesCollapseOne">
                                            <span className="row">
                                                <span className="col-8">
                                                  <span className="media">
                                                    <span className="card-btn-toggle mr-3 ml-0">
                                                      <span className="card-btn-toggle-default">&#x2b;</span>
                                                      <span className="card-btn-toggle-active">&minus;</span>
                                                    </span>
                                                    <span className="media-body">
                                                      <span
                                                          className="text-body font-weight-bold mr-5">Course overview</span>
                                                    </span>
                                                  </span>
                                                </span>
                                                <span className="col-4 text-right">
                                                  <span className="row">
                                                    <span className="col-lg-6">
                                                      <span className="text-muted">5 lectures</span>
                                                    </span>
                                                    <span className="col-lg-6">
                                                      <span className="text-muted">15:32</span>
                                                    </span>
                                                  </span>
                                                </span>
                                              </span>
                    </a>
                </div>
                <div id="coursesCollapseOne" className="collapse show"
                     aria-labelledby="coursesHeadingOne">
                    <div className="card-body p-0">
                        <div className="border-bottom py-3 pr-3 pl-6">
                            <div className="row">
                                <div className="col-8">
                                    <a className="media font-size-1 mr-5" href="#">
                                        <i className="fa fa-play-circle min-w-3rem text-center opacity-lg mt-1 mr-2 ml-1"></i>
                                        <span className="media-body">
                                            <span>Course introduction</span>
                                          </span>
                                    </a>
                                </div>
                                <div className="col-4 text-right">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <a className="font-size-1" href="#">Preview</a>
                                        </div>
                                        <div className="col-lg-6">
                                            <span
                                                className="text-primary font-size-1">06:39</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="border-bottom py-3 pr-3 pl-6">
                            <div className="row">
                                <div className="col-8">
                                    <a className="media font-size-1 mr-5" href="#">
                                        <i className="fa fa-play-circle min-w-3rem text-center opacity-lg mt-1 mr-2 ml-1"></i>
                                        <span className="media-body">
                                            <span>Course curriculum overview</span>
                                          </span>
                                    </a>
                                </div>
                                <div className="col-4 text-right">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <a className="font-size-1" href="#">Preview</a>
                                        </div>
                                        <div className="col-lg-6">
                                        <span
                                            className="text-primary font-size-1">04:00</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="border-bottom py-3 pr-3 pl-6">
                            <div className="row">
                                <div className="col-8">
                                    <a className="media font-size-1 mr-5" href="#">
                                        <i className="fa fa-play-circle min-w-3rem text-center opacity-lg mt-1 mr-2 ml-1"></i>
                                        <span className="media-body">
                                        <span>Python 2 versus Python 3</span>
                                      </span>
                                    </a>
                                </div>
                                <div className="col-4 text-right">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <a className="font-size-1" href="#">Preview</a>
                                        </div>
                                        <div className="col-lg-6">
                                            <span
                                                className="text-primary font-size-1">06:39</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card border mb-1">
                <div className="card-header card-collapse" id="coursesHeadingTwo">
                    <a className="btn btn-link btn-sm btn-block card-btn collapsed p-3"
                       href="#" role="button" data-toggle="collapse"
                       data-target="#coursesCollapseTwo"
                       aria-expanded="false" aria-controls="coursesCollapseTwo">
                                            <span className="row">
                                                <span className="col-8">
                                                  <span className="media">
                                                    <span className="card-btn-toggle mr-3 ml-0">
                                                      <span className="card-btn-toggle-default">&#x2b;</span>
                                                      <span className="card-btn-toggle-active">&minus;</span>
                                                    </span>
                                                    <span className="media-body">
                                                      <span
                                                          className="text-body font-weight-bold mr-5">Python Setup</span>
                                                    </span>
                                                  </span>
                                                </span>
                                                <span className="col-4 text-right">
                                                  <span className="row">
                                                    <span className="col-lg-6">
                                                      <span className="text-muted">5 lectures</span>
                                                    </span>
                                                    <span className="col-lg-6">
                                                      <span className="text-muted">15:32</span>
                                                    </span>
                                                  </span>
                                                </span>
                                              </span>
                    </a>
                </div>
                <div id="coursesCollapseTwo" className="collapse"
                     aria-labelledby="coursesHeadingTwo">
                    <div className="card-body p-0">
                        <div className="border-bottom py-3 pr-3 pl-6">
                            <div className="row">
                                <div className="col-8">
                                    <a className="media font-size-1 mr-5" href="#">
                                        <i className="fa fa-play-circle min-w-3rem text-center opacity-lg mt-1 mr-2 ml-1"></i>
                                        <span className="media-body">
                                                                    <span>Course line courses</span>
                                                                  </span>
                                    </a>
                                </div>
                                <div className="col-4 text-right">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <a className="font-size-1" href="#">Preview</a>
                                        </div>
                                        <div className="col-lg-6">
                                                                    <span
                                                                        className="text-primary font-size-1">08:15</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="border-bottom py-3 pr-3 pl-6">
                            <div className="row">
                                <div className="col-8">
                                    <a className="media font-size-1 mr-5" href="#">
                                        <i className="fa fa-play-circle min-w-3rem text-center opacity-lg mt-1 mr-2 ml-1"></i>
                                        <span className="media-body">
                                                                <span>Installing Python (Step by step)</span>
                                                              </span>
                                    </a>
                                </div>
                                <div className="col-4 text-right">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <a className="font-size-1" href="#">Preview</a>
                                        </div>
                                        <div className="col-lg-6">
                                                                        <span
                                                                            className="text-primary font-size-1">08:18</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="border-bottom py-3 pr-3 pl-6">
                            <div className="row">
                                <div className="col-8">
                                    <a className="media font-size-1 mr-5" href="#">
                                        <i className="fa fa-play-circle min-w-3rem text-center opacity-lg mt-1 mr-2 ml-1"></i>
                                        <span className="media-body">
                                                            <span>Running Python code</span>
                                                          </span>
                                    </a>
                                </div>
                                <div className="col-4 text-right">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <a className="font-size-1" href="#">Preview</a>
                                        </div>
                                        <div className="col-lg-6">
                                                                    <span
                                                                        className="text-primary font-size-1">17:50</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="border-bottom py-3 pr-3 pl-6">
                            <div className="row">
                                <div className="col-8">
                                                        <span className="media text-body font-size-1 mr-5">
                                                          <i className="fa fa-play-circle min-w-3rem text-center opacity-lg mt-1 mr-2 ml-1"></i>
                                                          <span className="media-body">
                                                            <span>Getting the notebooks and the course material</span>
                                                          </span>
                                                        </span>
                                </div>
                                <div className="col-4 text-right">
                                    <div className="row">
                                        <div className="col-lg-6">
                                        </div>
                                        <div className="col-lg-6">
                                            <span className="font-size-1">02:22</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="border-bottom py-3 pr-3 pl-6">
                            <div className="row">
                                <div className="col-8">
                                                        <span className="media text-body font-size-1 mr-5">
                                                          <i className="fa fa-play-circle min-w-3rem text-center opacity-lg mt-1 mr-2 ml-1"></i>
                                                          <span className="media-body">
                                                            <span>Git and Github overview (Optional)</span>
                                                          </span>
                                                        </span>
                                </div>
                                <div className="col-4 text-right">
                                    <div className="row">
                                        <div className="col-lg-6">
                                        </div>
                                        <div className="col-lg-6">
                                            <span className="font-size-1">02:49</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="collapse" id="collapseCoursesContentSection">
                <div className="card border mb-1">
                    <div className="card-header card-collapse" id="coursesHeadingSix">
                        <a className="btn btn-link btn-sm btn-block card-btn collapsed p-3"
                           href="#" role="button" data-toggle="collapse"
                           data-target="#coursesCollapseSix"
                           aria-expanded="false" aria-controls="coursesCollapseSix">
                                                <span className="row">
                                                  <span className="col-8">
                                                    <span className="media">
                                                      <span className="card-btn-toggle mr-3 ml-0">
                                                        <span className="card-btn-toggle-default">&#x2b;</span>
                                                        <span className="card-btn-toggle-active">&minus;</span>
                                                      </span>
                                                      <span className="media-body">
                                                        <span className="text-body font-weight-bold mr-5">Modules and packages</span>
                                                      </span>
                                                    </span>
                                                  </span>
                                                  <span className="col-4 text-right">
                                                    <span className="row">
                                                      <span className="col-lg-6">
                                                        <span className="text-muted">3 lectures</span>
                                                      </span>
                                                      <span className="col-lg-6">
                                                        <span className="text-muted">29:10</span>
                                                      </span>
                                                    </span>
                                                  </span>
                                                </span>
                        </a>
                    </div>
                    <div id="coursesCollapseSix" className="collapse"
                         aria-labelledby="coursesHeadingSix">
                        <div className="card-body p-0">
                            <div className="border-bottom py-3 pr-3 pl-6">
                                <div className="row">
                                    <div className="col-8">
                                                          <span className="media text-body font-size-1 mr-5">
                                                            <i className="fa fa-play-circle min-w-3rem text-center opacity-lg mt-1 mr-2 ml-1"></i>
                                                            <span className="media-body">
                                                              <span>Pip Install and PyPi</span>
                                                            </span>
                                                          </span>
                                    </div>
                                    <div className="col-4 text-right">
                                        <div className="row">
                                            <div className="col-lg-6">
                                            </div>
                                            <div className="col-lg-6">
                                                <span className="text-muted">07:46</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="border-bottom py-3 pr-3 pl-6">
                                <div className="row">
                                    <div className="col-8">
                                                          <span className="media text-body font-size-1 mr-5">
                                                            <i className="fa fa-play-circle min-w-3rem text-center opacity-lg mt-1 mr-2 ml-1"></i>
                                                            <span className="media-body">
                                                              <span>Modules and Packages</span>
                                                            </span>
                                                          </span>
                                    </div>
                                    <div className="col-4 text-right">
                                        <div className="row">
                                            <div className="col-lg-6">
                                            </div>
                                            <div className="col-lg-6">
                                                <span className="text-muted">11:39</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="border-bottom py-3 pr-3 pl-6">
                                <div className="row">
                                    <div className="col-8">
                                                          <span className="media text-body font-size-1 mr-5">
                                                            <i className="fa fa-play-circle min-w-3rem text-center opacity-lg mt-1 mr-2 ml-1"></i>
                                                            <span className="media-body">
                                                              <span>__name__ and "__main__"</span>
                                                            </span>
                                                          </span>
                                    </div>
                                    <div className="col-4 text-right">
                                        <div className="row">
                                            <div className="col-lg-6">
                                            </div>
                                            <div className="col-lg-6">
                                                <span className="text-muted">09:45</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card border mb-1">
                    <div className="card-header card-collapse" id="coursesHeadingSeven">
                        <a className="btn btn-link btn-sm btn-block card-btn collapsed p-3"
                           href="#" role="button" data-toggle="collapse"
                           data-target="#coursesCollapseSeven"
                           aria-expanded="false" aria-controls="coursesCollapseSeven">
                                                <span className="row">
                                                  <span className="col-8">
                                                    <span className="media">
                                                      <span className="card-btn-toggle mr-3 ml-0">
                                                        <span className="card-btn-toggle-default">&#x2b;</span>
                                                        <span className="card-btn-toggle-active">&minus;</span>
                                                      </span>
                                                      <span className="media-body">
                                                        <span className="text-body font-weight-bold mr-5">Errors and exceptions handling</span>
                                                      </span>
                                                    </span>
                                                  </span>
                                                  <span className="col-4 text-right">
                                                    <span className="row">
                                                      <span className="col-lg-6">
                                                        <span className="text-muted">5 lectures</span>
                                                      </span>
                                                      <span className="col-lg-6">
                                                        <span className="text-muted">45:14</span>
                                                      </span>
                                                    </span>
                                                  </span>
                                                </span>
                        </a>
                    </div>
                    <div id="coursesCollapseSeven" className="collapse"
                         aria-labelledby="coursesHeadingSeven">
                        <div className="card-body p-0">
                            <div className="border-bottom py-3 pr-3 pl-6">
                                <div className="row">
                                    <div className="col-8">
                                                          <span className="media text-body font-size-1 mr-5">
                                                            <i className="fa fa-play-circle min-w-3rem text-center opacity-lg mt-1 mr-2 ml-1"></i>
                                                            <span className="media-body">
                                                              <span>Errors and Exception Handling</span>
                                                            </span>
                                                          </span>
                                    </div>
                                    <div className="col-4 text-right">
                                        <div className="row">
                                            <div className="col-lg-6">
                                            </div>
                                            <div className="col-lg-6">
                                                <span className="text-muted">17:19</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="border-bottom py-3 pr-3 pl-6">
                                <div className="row">
                                    <div className="col-8">
                                                          <span className="media text-body font-size-1 mr-5">
                                                            <i className="fa fa-play-circle min-w-3rem text-center opacity-lg mt-1 mr-2 ml-1"></i>
                                                            <span className="media-body">
                                                              <span>Errors and Exceptions Homework</span>
                                                            </span>
                                                          </span>
                                    </div>
                                    <div className="col-4 text-right">
                                        <div className="row">
                                            <div className="col-lg-6">
                                            </div>
                                            <div className="col-lg-6">
                                                <span className="text-muted">01:30</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="border-bottom py-3 pr-3 pl-6">
                                <div className="row">
                                    <div className="col-8">
                                                          <span className="media text-body font-size-1 mr-5">
                                                            <i className="fa fa-play-circle min-w-3rem text-center opacity-lg mt-1 mr-2 ml-1"></i>
                                                            <span className="media-body">
                                                              <span>Errors and Exception Homework - Solutions</span>
                                                            </span>
                                                          </span>
                                    </div>
                                    <div className="col-4 text-right">
                                        <div className="row">
                                            <div className="col-lg-6">
                                            </div>
                                            <div className="col-lg-6">
                                                <span className="text-muted">05:16</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="border-bottom py-3 pr-3 pl-6">
                                <div className="row">
                                    <div className="col-8">
                                                          <span className="media text-body font-size-1 mr-5">
                                                            <i className="fa fa-play-circle min-w-3rem text-center opacity-lg mt-1 mr-2 ml-1"></i>
                                                            <span className="media-body">
                                                              <span>Pylint Overview</span>
                                                            </span>
                                                          </span>
                                    </div>
                                    <div className="col-4 text-right">
                                        <div className="row">
                                            <div className="col-lg-6">
                                            </div>
                                            <div className="col-lg-6">
                                                <span className="text-muted">11:36</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="border-bottom py-3 pr-3 pl-6">
                                <div className="row">
                                    <div className="col-8">
                                                          <span className="media text-body font-size-1 mr-5">
                                                            <i className="fa fa-play-circle min-w-3rem text-center opacity-lg mt-1 mr-2 ml-1"></i>
                                                            <span className="media-body">
                                                              <span>Running tests with the Unittest Library</span>
                                                            </span>
                                                          </span>
                                    </div>
                                    <div className="col-4 text-right">
                                        <div className="row">
                                            <div className="col-lg-6">
                                            </div>
                                            <div className="col-lg-6">
                                                <span className="text-muted">09:33</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="card border">
                <a className="link link-collapse btn btn-link btn-sm btn-block card-btn text-center p-3"
                   data-toggle="collapse" href="#collapseCoursesContentSection"
                   role="button"
                   aria-expanded="false" aria-controls="collapseCoursesContentSection">
                    <span className="link-collapse-default">2 more sections</span>
                    <span className="link-collapse-active">View less</span>
                </a>
            </div>
        </div>
    );
};

export default Contents;