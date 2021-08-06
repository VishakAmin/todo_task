import React from 'react'
import classes from "./Button.module.css"

//passing color as classes
const Button = ({type, onClick, children, color}) => {
  return (
    <div>
        <button type={type} onClick={onClick} className={ color === "red" ? classes.red :  color === "green" ? classes.green : color === "yellow"? classes.button: classes.btn} >
            {children}
        </button>
    </div>
  )
}



export default Button

