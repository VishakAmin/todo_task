
import React,{useState, useEffect} from 'react';
import './App.css';
import TodoInput from './components/Todo/TodoInput/TodoInput';
import TodoLists from './components/Todo/TodoList/TodoLists';
import uuid from 'react-uuid'
import Button from './components/UI/Button/Button';
import Select from './components/UI/Select/Select';

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
  const [sortType, setSortType] = useState()
  
 
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
    setTodoList([])
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
      <TodoLists list={incompleteTodo} onDeletelist={deleteTodolist} onCompletedList ={completedTodolist} onUpdateTodoList = {updateTodoList} check="Incomplete"/>
    )
  }

  if (completedTodo.length > 0 ) {
    compTodo = (
      <TodoLists list={completedTodo} onDeletelist={deleteTodolist} onCompletedList ={completedTodolist} onUpdateTodoList = {updateTodoList} />
    )
  }

  return (
    <div >
      <h3 className="header">
      What things you wanna do today?
      </h3>
      <section id="todolist-form">
        <TodoInput onAddTodo={addTodoList}/>
      </section>
      <section id="lists">
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
                <option value = "" disabled selected >Choose Sort</option>
                <option value = "asc" >aA-zZ</option>
                <option value = "dsc">zZ-aA</option>
           </Select>

          </div>
        </div>
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
