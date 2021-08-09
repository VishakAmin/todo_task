
import React,{useState, useEffect} from 'react';
import './App.css';
import TodoInput from './components/Todo/TodoInput/TodoInput';
import TodoLists from './components/Todo/TodoList/TodoLists';
import uuid from 'react-uuid'
import Button from './components/UI/Button/Button';
import Select from './components/UI/Select/Select';
import {DragDropContext, Droppable} from "react-beautiful-dnd"

const getlocalStorageItems = () => {
  const todo = localStorage.getItem('lists');
  if(todo){
    return JSON.parse(todo)
  }
  else{
    return []
  }
}

function App() {
  const [todoList, setTodoList] = useState(getlocalStorageItems())
  const [completedTodo, setCompletedTodo] = useState([])
  const [incompleteTodo, setIncompletedTodo] = useState([])  
  const [priorityFilter,  setPriorityFilter] = useState("all")
  const [todoFilter, setTodoFilter] = useState([])
  const [sortType, setSortType] = useState("")
  
 
  useEffect(() => {
    localStorage.setItem('lists', JSON.stringify(todoList))
    setCompletedTodo(todoList.filter(list => list.completed === true))
    setIncompletedTodo(todoList.filter(list => list.completed === false))
    },[todoList])


  let todo = (
    <p style={{textAlign:"center"}}>No Todo Found. Can you add one?</p>
  )

  let compTodo = (
    <p style={{textAlign:"center"}}>No Work Completed yet. </p>
  )

  const addTodoList = (task, priority) => {
    setTodoList(prevList => {
      const updatedList = [...prevList];
      updatedList.unshift({text:task, id: uuid(), completed: false, priority:priority })
      return updatedList;
    })
    setTodoFilter(todoList)
    setTodoFilter("")
    setSortType("")
    console.log(todoList);
  }

  const deleteTodolist = (id) => {
    setTodoList(prevList => {
      const updatedList = prevList.filter(list => list.id !== id);
      return updatedList
    })
  }

  const updateTodoList = (id, newValue, newPriority) => {
    setTodoList(prevList =>  prevList.map( list =>  (
      list.id === id ? {text:newValue, id:id, completed:false, priority:newPriority} : list
    )))
    setPriorityFilter("")
    console.log(id,newValue);
  }

  const completedTodolist = (id) => {
      let completed = todoList.map(list=>{
        return list.id === id ? { ...list, completed: !list.completed } : { ...list};
      })
      setTodoList(completed)
      setPriorityFilter("")
  }

  const removeAllList = () => {
    setTodoList(todoList.filter(list => list.completed === false))
    setPriorityFilter("")
    setSortType("")
  }

  const handlePriorityFilter = (e) => {
    setPriorityFilter(e.target.value)
    const filterTodo = e.target.value === "all" ? todoList : e.target.value === "high" ? todoList.filter(list => list.priority === "high")  : e.target.value === "low" ? todoList.filter(list => list.priority === "low") : todoList.filter(list => list.priority === "medium")  
    setTodoFilter(filterTodo)
    setCompletedTodo(filterTodo.filter(list => list.completed === true))
    setIncompletedTodo(filterTodo.filter(list => list.completed === false))
  }
  
  const handleSort = (e) => {
    setSortType(e.target.value);
    const newList = [...todoList]
    const sortArray = newList.sort( (a,b) => {
      const CheckSort = (sortType === "asc") ? -1 : 1;
      return CheckSort * a.text.localeCompare(b.text)
    })
    setTodoList(sortArray)
    console.log("sasas",sortArray);
  }
  
  console.log(todoList, todoFilter);
  console.log(completedTodo, incompleteTodo);
  console.log(sortType);


  

  if (incompleteTodo.length > 0) {
    todo = (
      <Droppable droppableId="list">
      {(provided, snapshot) => (
         <div
          ref={provided.innerRef}
           {...provided.droppableProps}>
          <TodoLists list={incompleteTodo} onDeletelist={deleteTodolist} onCompletedList ={completedTodolist} onUpdateTodoList = {updateTodoList} check="Incomplete"/>
        {provided.placeholder}
        </div>
      )
  }
  </Droppable>
    )
  }

  if (completedTodo.length > 0 ) {
    compTodo = (
      <Droppable droppableId="complist">
      {(provided, snapshot) => (
         <div
          ref={provided.innerRef}
           {...provided.droppableProps}>
      <TodoLists list={completedTodo} onDeletelist={deleteTodolist} onCompletedList ={completedTodolist} onUpdateTodoList = {updateTodoList} />
      {provided.placeholder}
      </div>

    )
  }
  </Droppable>
  )}

  const onDragEnd = (result) => {
      const {draggableId, destination, source} = result;

      if(!destination){
        return
      }
      if (destination.index === source.index && destination.droppableId === source.droppableId) {
        return;
    }
    
    if(destination.droppableId === source.droppableId){
      const newTodo = [...todoList]
      const dragableItem = newTodo[source.index]
      newTodo.splice(source.index, 1)
      newTodo.splice(destination.index, 0, dragableItem)
      console.log("dsdsdsd",newTodo);
      setTodoList(newTodo)
       setCompletedTodo(todoList.filter(list => list.completed === true))
       setIncompletedTodo(todoList.filter(list => list.completed === false))
      return
    }

    if (destination.droppableId !== source.droppableId) {
        completedTodolist(draggableId)
  }


  }
  

  return (
    <div >
      <h3 className="header">
      What things you wanna do today?
      </h3>
      <section id="todolist-form">
        <TodoInput onAddTodo={addTodoList}/>
      </section>
      
      <div id="select-list">
          <div id="select">
          <Select value={priorityFilter} onChange={handlePriorityFilter}>             
                <option value = "all" >All</option>
                <option value = "low" >Low</option>
                <option value = "medium">Medium</option>
                <option value = "high"> High</option>
          </Select>
          </div>

          <div id="select">
          <Select value={sortType} onChange={handleSort}>             
                <option value = "" disabled  >Choose Sort</option>
                <option value = "asc" >aA-zZ</option>
                <option value = "dsc">zZ-aA</option>
           </Select>

          </div>
        </div>

      <DragDropContext onDragEnd={onDragEnd}>
      <section id="lists">    
        <h4>Not Completed</h4>
        {todo}
      </section>

      <section id="lists">
        <h4>Completed</h4>
        {compTodo}
      </section>
      </DragDropContext> 
      
      <div className="clear-btn">
        <Button onClick={removeAllList}>Clear Completed List</Button> 
      </div>

    </div>
  );
}

export default App;
