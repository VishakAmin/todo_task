import React from 'react'
import classes from "./Button.module.css"

//passing color as classes
const Button = ({type, onClick, children, color, disabled}) => {

  let colorClasses = classes.btn;

  if (color === "red"){
    colorClasses = classes.red
  }

  if (color === "green"){
    colorClasses = classes.green
  }

  if (color === "yellow"){
    colorClasses = classes.yellow
  }

  return (
    <div>
        <button type={type} onClick={onClick} className={ colorClasses } disabled={disabled} >
          {children}
        </button>
    </div>
  )
}



export default Button
