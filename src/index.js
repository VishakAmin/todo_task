import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter as Router} from "react-router-dom";
import {Link, Switch, Route} from "react-router-dom" 
import TodoComp from './components/Todo/TodoComp/TodoComp';
import Navbar from './components/UI/Navbar/Navbar';
import TodoInComp from './components/Todo/TodoInComp/TodoInComp';
import TodoDetail from './components/Todo/TodoDetail/TodoDetail';
import SignUp from './components/Todo/SignUp/SignUp';
import SignIn from './components/Todo/SignIn/SignIn';
import { AuthProvider } from './components/contexts/AuthContext';


ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
    <Router>
      <Navbar/>
      <Switch>
        <Route exact path="/sign-up">
            <SignUp/>
        </Route>
        <Route exact path="/sign-in">
            <SignIn/>
        </Route>
        <Route exact path="/completed">
            <TodoComp />
        </Route>
        <Route exact path="/not-completed">
            <TodoInComp/>
        </Route>
        <Route exact path="/">
          <App/>
        </Route>
        <Route exact path="/todo/:id">
          <TodoDetail/>
        </Route>
        
      </Switch>
      </Router>
      </AuthProvider>

  </React.StrictMode>,
  document.getElementById('root')
);
