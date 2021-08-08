import React from 'react'
import classes from "./Select.module.css"

const Select = ({value, onChange , children}) => {
    return (
        <div>
             <select className={classes.select} value={value} onChange={onChange} required>
               {children}
          </select>
        </div>
    )
}

export default Select
