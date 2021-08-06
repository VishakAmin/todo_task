import React,{useState} from 'react'
import Button from '../../UI/Button/Button';

import classes from  "./TodoInput.module.css"

const TodoInput = (props) => {

  const [inputValue, setInputValue] = useState(props.edit ?  props.edit.value : "");
  
  //mobex
  const todoInputChangeHandler = (e) => {
    setInputValue(e.target.value)
  }
  
  const formSubmitHandler = (e) => {
    e.preventDefault();
    props.edit ? props.onSubmit(inputValue) : props.onAddTodo(inputValue)
    console.log(inputValue);
    setInputValue("")
  }
  
  const buttonValue = props.edit ?  "Update" : "Add"
  const placeholderValue = props.edit ? "Update your Todo" : "Enter your todo"

  return (

    <form onSubmit={formSubmitHandler} className={classes.form}>
        <div className={classes.formControl}>
          <input type="text" value={inputValue} required onChange={todoInputChangeHandler} placeholder={placeholderValue}/>
          <input type="text"  required onChange={todoInputChangeHandler} placeholder="Select the feild"/>
          <Button type="submit">{buttonValue}</Button>
       </div>
    </form>
  
  )
}


export default TodoInput;
