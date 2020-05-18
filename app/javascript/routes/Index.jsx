import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Call from "../components/Call";
import VideoCallWrapper from "../components/VideoCallWrapper";

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/classroom/:id" exact component={Call} />
      <Route path="/calls/:id" exact component={VideoCallWrapper} />
    </Switch>
  </Router>
);
