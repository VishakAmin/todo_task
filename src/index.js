import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter as Router} from "react-router-dom";
import {Link, Switch, Route} from "react-router-dom" 
import TodoComp from './components/Todo/TodoComp/TodoComp';
import Navbar from './components/UI/Navbar/Navbar';
import TodoInComp from './components/Todo/TodoInComp/TodoInComp';


ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Navbar/>
      <Switch>
        <Route exact path="/completed">
            <TodoComp />
        </Route>
        <Route exact path="/not-completed">
            <TodoInComp/>
        </Route>
        <Route exact path="/">
          <App/>
        </Route>
      </Switch>
      </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
