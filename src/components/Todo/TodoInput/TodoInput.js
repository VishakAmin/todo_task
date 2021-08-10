import React,{useState} from 'react'
import Button from '../../UI/Button/Button';
import Select from '../../UI/Select/Select';

import classes from  "./TodoInput.module.css"

const TodoInput = ({edit, onAddTodo, onSubmit}) => {

  const [inputValue, setInputValue] = useState(edit ?  edit.value : "");  
  const [priority, setPriority] = useState(edit ? edit.priority : "" )

  //mobex
  const todoInputChangeHandler = (e) => {
    setInputValue(e.target.value)
  }
  
  const todoPriorityChangeHandler = (e) => {
    setPriority(e.target.value)
  }
  
  const formSubmitHandler = (e) => {
    e.preventDefault();
    edit ? onSubmit(inputValue,priority) : onAddTodo(inputValue, priority)
    console.log(inputValue);
    setInputValue("")
    setPriority("")
  }

  const buttonValue = edit ?  "Update" : "Add"
  const placeholderValue = edit ? "Update your Todo" : "Enter your todo"
  
  return (

    <form onSubmit={formSubmitHandler}>
        <div className={classes.formControl}>
          <input type="text" value={inputValue} required onChange={todoInputChangeHandler} placeholder={placeholderValue}/>
          <Select value={priority} onChange={todoPriorityChangeHandler} required>
                <option value="" disabled hidden>Choose Priority</option>
                <option value = "low" >Low</option>
                <option value = "medium">Medium</option>
                <option value = "high"> High</option>
          </Select>
          
          <Button type="submit">{buttonValue}</Button>
       </div>
    </form>
  
  )
}


export default TodoInput;
