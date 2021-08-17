import React from 'react'
import {NavLink, useHistory,Link} from "react-router-dom" 
import { useAuth } from '../../contexts/AuthContext'
import classes from "./Navbar.module.css"


const Navbar = () => {

    const {logout, currentUser} = useAuth()
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
            {currentUser ? (
                
                <nav className={classes.nav}>
                <ul>
                    <li>
                        <NavLink to="/">Home</NavLink>
                    </li> 
                    <li>
                        <NavLink to="/completed" activeclassname={classes.active}> Completed</NavLink>
                    </li>                   
                    <li>
                        <NavLink to="/not-completed" activeclassname={classes.active}> Not Completed</NavLink>
                   </li>
                   <li>
                        <Link onClick={onClickHandler} to="/sign-in" activeclassname={classes.active} > Logout</Link>
                   </li>
                </ul>
             </nav>
            ) : (
                <nav className={classes.nav}>
                <ul>
                    <li>
                        <NavLink to="/sign-up">Sign Up</NavLink>
                    </li> 
                    <li>
                        <NavLink to="/sign-in">Login</NavLink>
                    </li> 
                </ul>
               </nav>

            )}

 
        </header>
     )
}

export default Navbar
