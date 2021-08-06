import React,{useState} from 'react'
import Button from '../../UI/Button/Button';

import classes from  "./TodoInput.module.css"

const TodoInput = (props) => {

  const [inputValue, setInputValue] = useState(props.edit ?  props.edit.value : "");  
  const [priorty, setPriorty] = useState("")

  
  //mobex
  const todoInputChangeHandler = (e) => {
    setInputValue(e.target.value)
  }
  

  const todoPriortyChangeHandler = (e) => {
    setPriorty(e.target.value)
  }
  
  const formSubmitHandler = (e) => {
    e.preventDefault();
    props.edit ? props.onSubmit(inputValue) : props.onAddTodo(inputValue, priorty)
    console.log(inputValue);
    setInputValue("")
    setPriorty("")
  }

  
  const buttonValue = props.edit ?  "Update" : "Add"
  const placeholderValue = props.edit ? "Update your Todo" : "Enter your todo"

  return (

    <form onSubmit={formSubmitHandler} className={classes.form}>
        <div className={classes.formControl}>
          <input type="text" value={inputValue} required onChange={todoInputChangeHandler} placeholder={placeholderValue}/>
          <select value={priorty}  required onChange={todoPriortyChangeHandler}> 
                <option value="" disabled hidden>Choose Priorty</option>
                <option value = "low" >Low</option>
                <option value = "medium">Medium</option>
                <option value = "high"> High</option>
          </select>
          <Button type="submit">{buttonValue}</Button>
       </div>
    </form>
  
  )
}


export default TodoInput;
