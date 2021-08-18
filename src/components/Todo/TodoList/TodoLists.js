import React,{useRef} from 'react'
import TodoListItem from '../TodoListItem/TodoListItem'
import classes from "./TodoLists.module.css"

const TodoLists = ({onDeletelist, onCompletedList,onUpdateTodoList,onEditList,list,compList=false}) => {

  const renders = useRef(0)
  console.log("Render", renders.current++);
  return (
    <ul className={classes.listItems}>
   
              { list.map((list,index) => (
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
                  index={index}
                  compList = {compList}
                /> 
              ))
              }

    </ul>

  )
};

export default TodoLists
