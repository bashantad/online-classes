import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Call from "../components/Call";
import VideoCallWrapper from "../components/VideoCallWrapper";
import MessageWrapper from "../components/MessageWrapper";
import CallHistory from "../components/CallHistory";
import CourseDetail from "../components/courses/CourseDetail";
import EnrolledCourses from "../components/courses/EnrolledCourses";
import Qualification from "../components/users/Qualification";

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/users/qualifications" exact component={Qualification} />
      <Route path="/enrolled_courses" exact component={EnrolledCourses} />
      <Route path="/courses/:course_id" exact component={CourseDetail} />
      <Route path="/classroom/:id" exact component={Call} />
      <Route path="/call_history" exact component={CallHistory} />
      <Route path="/calls/:user_id/join/:calling_code" exact component={VideoCallWrapper} />
      <Route path="/courses/:course_id/messages" exact component={MessageWrapper} />
    </Switch>
  </Router>
);
