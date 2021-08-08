import React from 'react'
import TodoListItem from '../TodoListItem/TodoListItem'
import classes from "./TodoLists.module.css"

const TodoLists = ({onDeletelist, onCompletedList,onUpdateTodoList,onEditList,list}) => {
  return (
    <ul className={classes.listItems}>
      { list.map(list => (
        <TodoListItem
          key={list.id}
          id={list.id}
          onDelete={onDeletelist}
          onComplete={onCompletedList}
          onUpdate={onUpdateTodoList}
          onEdit={onEditList}
          text = {list.text}
          comp = {list.completed}
          priority = {list.priority}

        > 
        </TodoListItem>
      ))
      }
      
    </ul>

  )
}

export default TodoLists
