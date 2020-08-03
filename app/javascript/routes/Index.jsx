import React, {Suspense, lazy} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Loading from "../components/common/Loading";

const Home = lazy(() => import('../components/Home'));
const VideoCallWrapper = lazy(() => import("../components/VideoCallWrapper"));
const MessageWrapper = lazy(() => import("../components/MessageWrapper"));
const CallHistory = lazy(() => import("../components/CallHistory"));
const CourseDetail = lazy(() => import("../components/courses/CourseDetail"));
const EnrolledCourses = lazy(() => import("../components/courses/EnrolledCourses"));
const ClassRoom = lazy(() => import("../components/courses/ClassRoom"));
const Qualification = lazy(() => import("../components/users/Qualification"));
const NotFoundPage = lazy(() => import("../components/NotFoundPage"));
const Courses = lazy(() => import("../components/Courses"));
import LandingRoutes from "./LandingRoutes";

export default (
  <Router>
    <Suspense fallback={<Loading />}>
      <Switch>
        // Public routes
        <Route path="/" exact component={Home}/>
        <Route path="/calls/:userId/join/:callingCode" exact component={VideoCallWrapper}/>
        <Route path="/courses" exact component={Courses}/>

        //Private routes
        <Route path="/users/qualifications" exact component={Qualification}/>
        <Route path="/enrolled_courses" exact component={EnrolledCourses}/>
        <Route path="/classrooms/courses/:courseId" exact component={ClassRoom}/>
        <Route path="/classrooms/courses/:courseId/chapters/:chapterId/assignments/:assignmentId" exact
               component={ClassRoom}/>
        <Route path="/classrooms/courses/:courseId/chapters/:chapterId/course_contents/:courseContentId" exact
               component={ClassRoom}/>
        <Route path="/courses/:courseId" exact component={CourseDetail}/>
        <Route path="/call_history" exact component={CallHistory}/>
        <Route path="/courses/:course_id/conversations/:conversation_id/messages" exact component={MessageWrapper}/>
        <LandingRoutes />
        <Route path="/*" exact component={NotFoundPage}/>
      </Switch>
    </Suspense>
  </Router>
);
