import React,{useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import firebase from '../../../firebase';
import { useAuth } from '../../contexts/AuthContext';

const TodoDetail = () => {
    const [todo, setTodo] = useState([])
    const params = useParams();
    const database = firebase.firestore().collection("user")  
    const {currentUser}  = useAuth()
    

    useEffect(() => {
        const getTodoById = (id) => {              
            database
            .doc(currentUser.uid)
            .collection("todo")
            .doc(id)
            .get()
            .then((item) => {
                setTodo(item.data())
            })
        }
        getTodoById(params.id)
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

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
