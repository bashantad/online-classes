import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Call from "../components/Call";

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/calls/:id" exact component={Call} />
    </Switch>
  </Router>
);
