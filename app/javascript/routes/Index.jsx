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
import ClassRoomContent from "../components/courses/ClassRoomContent";
import Qualification from "../components/users/Qualification";

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/users/qualifications" exact component={Qualification} />
      <Route path="/enrolled_courses" exact component={EnrolledCourses} />
      <Route path="/classrooms/courses/:courseId" exact component={ClassRoom} />
      <Route path="/classrooms/courses/:courseId/chapters/:chapterId/contents/:courseContentId" exact component={ClassRoomContent} />
      <Route path="/courses/:courseId" exact component={CourseDetail} />
      <Route path="/classroom/:id" exact component={Call} />
      <Route path="/call_history" exact component={CallHistory} />
      <Route path="/calls/:userId/join/:callingCode" exact component={VideoCallWrapper} />
      <Route path="/courses/:course_id/messages" exact component={MessageWrapper} />
    </Switch>
  </Router>
);
