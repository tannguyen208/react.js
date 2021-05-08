import React from "react";
import { Router, Route, Switch } from "dva/router";
// pages
import Index from "./routes/Index";
import Resume from "./routes/Resume";

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Index} />
        <Route path="/resume" component={Resume} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
