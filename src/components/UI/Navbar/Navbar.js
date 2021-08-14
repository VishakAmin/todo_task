import React from 'react'
import {NavLink, useHistory} from "react-router-dom" 
import { useAuth } from '../../contexts/AuthContext'
import classes from "./Navbar.module.css"


const Navbar = () => {

    const {logout} = useAuth()
    const history = useHistory();

    const onClickHandler = async () => {
        try{
            await logout()
            history.push("/sign-in")
         }
        catch{
            alert("Failed to Logout")
        }
    }

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
                        <a onClick={onClickHandler} activeClassName={classes.active} > Logout</a>
                   </li>
                </ul>
             </nav>
 
        </header>
     )
}

export default Navbar
