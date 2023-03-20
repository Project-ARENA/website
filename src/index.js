import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./style.css";
import Contact from "./views/contact";
import Register from "./views/register";
import TEST from "./views/test";
import Home from "./views/home";
import Login from "./views/login";
import Competitions from "./views/competitions";
import About from './views/about'
import AdminHome from './views/admin-home'
import AdminTeams from './views/admin-teams'
import AdminCompetitions from './views/admin-competitions'
import AdminProfile from './views/admin-profile'

const App = () => {
  return (
    <Router>
      <div>
        <Route component={Contact} exact path="/contact" />
        <Route component={Register} exact path="/register" />
        <Route component={TEST} exact path="/test" />
        <Route component={Home} exact path="/" />
        <Route component={Login} exact path="/login" />
        <Route component={Competitions} exact path="/competitions" />
        <Route component={About} exact path="/about" />
        <Route component={AdminHome} exact path="/admin-home" />
        <Route component={AdminTeams} exact path="/admin-teams" />
        <Route component={AdminCompetitions} exact path="/admin-competitions" />
        <Route component={AdminProfile} exact path="/admin-profile" />
      </div>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
