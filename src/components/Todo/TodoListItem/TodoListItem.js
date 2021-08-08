import React,{useState} from 'react'
import Button from '../../UI/Button/Button'
import TodoInput from '../TodoInput/TodoInput'
import classes from "./TodoListItem.module.css"

const TodoListItem = ({onDelete, onComplete, id, text, priority, onUpdate, comp}) => {

  const [edit, setEdit] = useState({
    id: null,
    value : "",
    priority: "",
  })

  const deleteHandler = () => {
    onDelete(id)
  }

  const completeHandler = () => {
    onComplete(id)
  }

  const submitHandler = (value, priority) => {
      onUpdate(edit.id, value, priority)
      setEdit({
        id: null,
        value : ""
      })
  }

  
  return (
      <>
          {edit.id ? (<TodoInput edit={edit} onSubmit={submitHandler}/>) : (
               <li className={classes.listItem}>
               <div className={classes.items}>
                 <div className={ classes.text}>
                   {text}            
                 </div>
                </div>
                <div className={classes.button}> 
                <Button color= "red" onClick={deleteHandler}>Delete</Button>
                  {comp ? "":<Button color= "yellow" onClick={() => setEdit({id: id, value:text, priority:priority})}>Update</Button>}
                <Button color="green" onClick={completeHandler}>{comp ? "Incompete" : "Complete"}</Button>                          
              </div>
              </li>
          )}
      </> 
  )
}

export default TodoListItem
