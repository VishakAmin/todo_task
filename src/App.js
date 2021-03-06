
import React,{useState, useEffect} from 'react';
import './App.css';
import TodoInput from './components/Todo/TodoInput/TodoInput';
import TodoLists from './components/Todo/TodoList/TodoLists';
import { nanoid } from 'nanoid';
import Button from './components/UI/Button/Button';
import Select from './components/UI/Select/Select';
import {DragDropContext, Droppable} from "react-beautiful-dnd"
import firebase from './firebase';
import { useAuth } from './components/contexts/AuthContext';
import { observer } from 'mobx-react-lite'
import { useTodos } from './TodoStore'

function App() {
  const [todoList, setTodoList] = useState([])
  const [priorityFilter,  setPriorityFilter] = useState("all")
  const [todoFilter, setTodoFilter] = useState([])
  const [sortType, setSortType] = useState("")
  const {currentUser}  = useAuth()
  const database = firebase.firestore().collection("user") 
  const todoStore = useTodos()

  useEffect(() => {
      currentUser && todoStore.fetchTodo(currentUser.uid)
         setTodoList(todoStore.todos);
        
    },[todoStore, currentUser]) 

  let todo = (
    <p style={{textAlign:"center"}}>No Todo Found. Can you add one?</p>
  )

  let compTodo = (
    <p style={{textAlign:"center"}}>No Work Completed yet. </p>
  )

  const addTodoList = (task, priority) => {

    const newTodo  = { text:task,priority:priority, id: nanoid(), completed: false, } 
  //   const id = nanoid();
  //   const newTodo  = { text:task, id: id, completed: false, priority:priority } 
    database
    .doc(currentUser.uid)
    .collection("todo")
    .doc(newTodo.id)
    .set(newTodo)
    .then(() => {
      todoStore.addTodo(newTodo)
    })
    .catch((err) => {
      console.log(err);
    })
    setPriorityFilter("")
    setSortType("")
   }

  const deleteTodolist = (id) => {

  
    database
    .doc(currentUser.uid)
    .collection("todo")
    .doc(id)
    .delete()
    .then(() => {
      todoStore.deleteTodo(id)
    })
    .catch((err) => {
      console.log(err);
    });
  }

  const updateTodoList = (id, newValue, newPriority) => {

    const updateTodo = {text:newValue, id:id, priority:newPriority, completed:false}


    database
    .doc(currentUser.uid)
    .collection("todo")
    .doc(id)
    .update(updateTodo)
    .then(() => {
      todoStore.updateTodo(id, updateTodo)
    })

    setPriorityFilter("")

  }

  const getTodoById = (id) => (
    database
    .doc(currentUser.uid)
    .collection("todo")
    .doc(id)
    .get()
    .then((item) => {
      return item.data()
    })
  )



  const completedTodolist = async (id) => {
  
    const newListUpdate = await getTodoById(id)      

    console.log("SEE HERE",newListUpdate);
      database
      .doc(currentUser.uid)
      .collection("todo")
      .doc(id)
      .update({completed:!newListUpdate.completed})
      .then(() => {  
        todoStore.completedTodo(id)        
      })
   
  }

  const removeAllList = async () => {
    
    const completeList = await firebase.firestore().collection('user').doc(currentUser.uid).collection("todo").where("completed","==",true).get()
    completeList.forEach(doc => {
        database
        .doc(currentUser.uid)
        .collection("todo")
        .doc(doc.data().id)
        .delete()
        .then(() => {
          setTodoList(todoList.filter(list => list.completed === false))
        }) 
    });
    setTodoFilter(todoList)
    setPriorityFilter("")
    setSortType("")
    
  }

  const handlePriorityFilter = (e) => {
     setPriorityFilter(e.target.value)
    todoStore.setFilter(e.target.value)
    const tempList = todoStore.filterTodoList()
    setTodoList(tempList)
  }
  
  const handleSort = (e) => {
    setSortType(e.target.value)
    todoStore.setSort(e.target.value)
    const tempList = todoStore.sortTodoList()
    setTodoList(tempList)
    // setSortType(e.target.value);
    // const newList = [...todoList]
    // const sortArray = newList.sort( (a,b) => {
    //   const CheckSort = (sortType === "asc") ? -1 : 1;
    //   return CheckSort * a.text.localeCompare(b.text)
    // })
    // setTodoList(sortArray)
  }
  

  const incomp =  todoList.filter(list => list.completed === false)
  const comp =  todoList.filter(list => list.completed === true)
  
  if ( incomp.length > 0&&  todoList.length > 0) {
    todo = (
      <TodoLists list={incomp} onDeletelist={deleteTodolist} onCompletedList ={completedTodolist} onUpdateTodoList = {updateTodoList} check="Incomplete"/>
    )
  }

  if (comp.length >0 && todoList.length > 0 ) {
    compTodo = (
      <TodoLists list={comp} onDeletelist={deleteTodolist} onCompletedList ={completedTodolist} onUpdateTodoList = {updateTodoList} />
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
      setTodoList(newTodo)
      //  setCompletedTodo(todoList.filter(list => list.completed === true))
      //  setIncompletedTodo(todoList.filter(list => list.completed === false))
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
        <Droppable droppableId="list">
      {(provided, snapshot) => (
         <div
          ref={provided.innerRef}
           {...provided.droppableProps}>
        {todo}
        {provided.placeholder}
        </div>
      )
  }
     </Droppable>
      </section>
      <section id="lists">
        <h4>Completed</h4>
        <Droppable droppableId="complist">
      {(provided, snapshot) => (
         <div
          ref={provided.innerRef}
           {...provided.droppableProps}>
        {compTodo}
        {provided.placeholder}
      </div>

    )
  }
  </Droppable>
      </section>
      </DragDropContext> 
      
      <div className="clear-btn">
        <Button onClick={removeAllList}>Clear Completed List</Button> 
      </div>

    </div>
  );
}

export default  observer(App);
