import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Call from "../components/Call";
import VideoCallWrapper from "../components/VideoCallWrapper";
import MessageWrapper from "../components/MessageWrapper";
import CallHistory from "../components/CallHistory";
import CourseDetail from "../components/courses/CourseDetail";
import EnrolledCourses from "../components/courses/EnrolledCourses";
import ClassRoom from "../components/courses/ClassRoom";
import Qualification from "../components/users/Qualification";
import NotFoundPage from "../components/NotFoundPage";
import Courses from "../components/Courses";
import EngineeringManagerLandingPage from "../components/landing/EngineeringManager";
import SeniorSoftwareEngineerLandingPage from "../components/landing/SeniorSoftwareEngineer";
import SoftwareEngineerLandingPage from "../components/landing/SoftwareEngineer";

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/users/qualifications" exact component={Qualification} />
      <Route path="/enrolled_courses" exact component={EnrolledCourses} />
      <Route path="/courses" exact component={Courses} />
      <Route path="/become-software-engineer" exact component={SoftwareEngineerLandingPage} />
      <Route path="/become-senior-software-engineer" exact component={SeniorSoftwareEngineerLandingPage} />
      <Route path="/become-software-engineering-manager" exact component={EngineeringManagerLandingPage} />
      <Route path="/classrooms/courses/:courseId" exact component={ClassRoom} />
      <Route path="/classrooms/courses/:courseId/chapters/:chapterId/assignments/:assignmentId" exact component={ClassRoom} />
      <Route path="/classrooms/courses/:courseId/chapters/:chapterId/course_contents/:courseContentId" exact component={ClassRoom} />
      <Route path="/courses/:courseId" exact component={CourseDetail} />
      <Route path="/classroom/:id" exact component={Call} />
      <Route path="/call_history" exact component={CallHistory} />
      <Route path="/calls/:userId/join/:callingCode" exact component={VideoCallWrapper} />
      <Route path="/courses/:course_id/messages" exact component={MessageWrapper} />
      <Route path="/*" exact component={NotFoundPage} />
    </Switch>
  </Router>
);
