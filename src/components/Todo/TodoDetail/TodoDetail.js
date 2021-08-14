import React,{useState, useEffect,useCallback} from 'react'
import { useParams } from 'react-router-dom'
import firebase from '../../../firebase';

const TodoDetail = () => {
    const [todo, setTodo] = useState([])
    const params = useParams();
    const database = firebase.firestore().collection("todo")  

    const getTodoById = useCallback((id) => {              
        database
        .doc(id)
        .get()
        .then((item) => {
            setTodo(item.data())
        })
    },[])

    useEffect(() => {
        getTodoById(params.id)
    }, [])

    return (
        <div>
            <h1 className="header">
                Todo Details
            </h1> 
            <section id="todolist-form">
                <h2>Todo Id: {todo.id} </h2>
                <h2>Text : {todo.text}</h2>
                <h2>Priority : {(todo.priority)}</h2>             
                <h2>Status : {todo.completed ? "Completed" : "Not Completed" }</h2>
            </section>

        </div>
    )
}

export default TodoDetail;
