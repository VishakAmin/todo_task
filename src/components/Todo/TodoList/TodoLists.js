import React from 'react'
import TodoListItem from '../TodoListItem/TodoListItem'
import classes from "./TodoList.module.css"

const TodoLists = props => {
  return (
    <ul className={classes.listItems}>
      { props.list.map(list => (
        <TodoListItem
          key={list.id}
          id={list.id}
          onDelete={props.onDeletelist}
          onComplete={props.onCompletedList}
          onUpdate={props.onUpdateTodoList}
          onEdit={props.onEditList}
          text = {list.text}
          comp = {list.completed}

        > 
        {/* <div className={classes.items}>
          <div className={ list.completed ? classes.strike :  classes.text}>
            {list.text}            
          </div>
        </div> */}

        </TodoListItem>
      ))
      }
      
    </ul>

  )
}

export default TodoLists
