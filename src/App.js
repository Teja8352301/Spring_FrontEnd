import React from "react";
import "./App.css"
import {
  BrowserRouter as Router} from "react-router-dom";
import {Routes} from './router/routes'
import {Navlinks} from './containers/nav-links'


const App = (props) => {
  return (
    <div>
      <Router basename="/spring">
        <Navlinks/>
        <Routes/>
      </Router>
    </div>
  );
}

export default App