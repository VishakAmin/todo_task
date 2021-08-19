import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter as Router} from "react-router-dom";
import {Switch, Route} from "react-router-dom" 
import TodoComp from './components/Todo/TodoComp/TodoComp';
import Navbar from './components/UI/Navbar/Navbar';
import TodoInComp from './components/Todo/TodoInComp/TodoInComp';
import TodoDetail from './components/Todo/TodoDetail/TodoDetail';
import SignUp from './components/Todo/SignUp/SignUp';
import SignIn from './components/Todo/SignIn/SignIn';
import { AuthProvider } from './components/contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';


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
        <PrivateRoute exact path="/completed" component={TodoComp}/>   
        <PrivateRoute exact path="/not-completed" component={TodoInComp}/>
        <PrivateRoute exact path="/" component={App}/>
        <PrivateRoute exact path="/todo/:id" component={TodoDetail}/>
      </Switch>
      </Router>

    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
