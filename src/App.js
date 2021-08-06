
import React,{useState, useEffect} from 'react';
import './App.css';
import TodoInput from './components/Todo/TodoInput/TodoInput';
import TodoLists from './components/Todo/TodoList/TodoLists';
import uuid from 'react-uuid'
import Button from './components/UI/Button/Button';




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
  const [priortyFilter,  setPriortyFilter] = useState("")

  
 
  useEffect(() => {
    localStorage.setItem('lists', JSON.stringify(todoList))

    setCompletedTodo(todoList.filter(list => list.completed === true))
    setIncompletedTodo(todoList.filter(list => list.completed === false))
    }, [todoList])

  let todo = (
    <p style={{textAlign:"center"}}>No Todo Found. Can you add one?</p>
  )

  let compTodo = (
    <p style={{textAlign:"center"}}>No Work Completed yet. </p>
  )

  const addTodoList = (task, priorty) => {
    setTodoList(prevList => {
      const updatedList = [...prevList];
      updatedList.unshift({text:task, id: uuid(), completed: false, priorty:priorty })
      return updatedList;
    })
    console.log(todoList);
  }

  const deleteTodolist = (id) => {
    setTodoList(prevList => {
      const updatedList = prevList.filter(list => list.id !== id);
      return updatedList
    })
  }

  const updateTodoList = (id, newValue) => {

    setTodoList(prevList =>  prevList.map( list =>  (
      list.id === id ? {text:newValue, id:id, completed:false} : list
    )
    ))
    console.log(id,newValue);

  }
  const completedTodolist = (id) => {
      let completed = todoList.map(list=>{
        return list.id === id ? { ...list, completed: !list.completed } : { ...list};
      })
      setTodoList(completed)
  }

  const removeAllList = () => {
    setTodoList([])
  }

  const handlePriortyFilter = (e) => {
    setPriortyFilter(e.target.value)
  }
  
  if (incompleteTodo.length > 0) {
    todo = (
      <TodoLists list={incompleteTodo} onDeletelist={deleteTodolist} onCompletedList ={completedTodolist} onUpdateTodoList = {updateTodoList} check="Incomplete"/>
    )
  }

  if (completedTodo.length > 0 ) {
    compTodo = (
      <TodoLists list={completedTodo} onDeletelist={deleteTodolist} onCompletedList ={completedTodolist} onUpdateTodoList = {updateTodoList}/>
    )
  }


  console.log(priortyFilter);
  return (
    <div >
      <h3 className="header">
      What things you wanna do today?
      </h3>
      <section id="todolist-form">
        <TodoInput onAddTodo={addTodoList}/>
      </section>
      <section id="lists">
          <select value={priortyFilter} onChange={handlePriortyFilter}>
                <option value="" disabled hidden>Choose Filter</option>
                <option value = "all" >All</option>
                <option value = "low" >Low</option>
                <option value = "medium">Medium</option>
                <option value = "high"> High</option>
          </select>
        <h4>Not Completed</h4>
        {todo}
      </section>

      <section id="lists">
        <h4>Completed</h4>
        {compTodo}
      </section>

      <div className="clear-btn">
        <Button onClick={removeAllList}>Clear List</Button> 
      </div>
    </div>
  );
}

export default App;
