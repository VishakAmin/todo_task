import React from 'react'
import {Router,NavLink, Switch, Route} from "react-router-dom" 
import classes from "./Navbar.module.css"

const Navbar = () => {
    return (
        <header className={classes.header}>
            <div className={classes.logo}>
                Todo App
            </div>
            <nav className={classes.nav}>
                <ul>
                    <li>
                        <NavLink to="/">Home</NavLink>
                    </li> 
                    <li>
                        <NavLink to="/completed" activeClassName={classes.active}> Completed</NavLink>
                    </li>                   
                    <li>
                        <NavLink to="/not-completed" activeClassName={classes.active}> Not Completed</NavLink>
                   </li>
                   <li>
                        <NavLink to="/sign-in" activeClassName={classes.active}> Logout</NavLink>
                   </li>
                </ul>
             </nav>
 
        </header>
     )
}

export default Navbar
