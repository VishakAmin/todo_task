import React,{useState} from 'react'
import Button from '../../UI/Button/Button'
import TodoInput from '../TodoInput/TodoInput'
import classes from "./TodoListItem.module.css"

const TodoListItem = (props) => {

  const [edit, setEdit] = useState({
    id: null,
    value : ""
  })

  const deleteHandler = () => {
    props.onDelete(props.id)
  }

  const completeHandler = () => {
    props.onComplete(props.id)
  }

  const submitHandler = (value) => {
      props.onUpdate(edit.id, value)
      setEdit({
        id: null,
        value : ""
      })
  }
  if(edit.id){
    return <TodoInput edit={edit} onSubmit={submitHandler}/>
  }

  return (
    <li className={classes.listItem}>
        <div className={classes.items}>
          <div className={ props.comp ? classes.strike :  classes.text}>
            {props.text}            
          </div>
        </div>
        <div className={classes.button}> 
            <Button color= "red" onClick={deleteHandler}>Delete</Button>
            {props.comp ? "":<Button color= "yellow" onClick={() => setEdit({id: props.id, value:props.text})}>Update</Button>}
            <Button color="green" onClick={completeHandler}>{props.comp ? "Incompete" : "Complete"}</Button>                          
          </div>
    </li>
  )
}

export default TodoListItem
