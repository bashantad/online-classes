import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Call from "../components/Call";
import VideoCallWrapper from "../components/VideoCallWrapper";
import MessageWrapper from "../components/MessageWrapper";
import CallHistory from "../components/CallHistory";

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/classroom/:id" exact component={Call} />
      <Route path="/call_history" exact component={CallHistory} />
      <Route path="/calls/:user_id/join/:calling_code" exact component={VideoCallWrapper} />
      <Route path="/courses/:course_id/messages" exact component={MessageWrapper} />
    </Switch>
  </Router>
);
