import React,{useState, useEffect, useCallback} from 'react'
import TodoLists from '../TodoList/TodoLists';
import { useTodos } from '../../../TodoStore';

const TodoComp = () => {
    const [compList, setCompList] = useState([])
    const todoStore = useTodos() 
    useEffect(() => {
        //currentUser && todoStore.fetchTodo(currentUser.uid)
        setCompList(todoStore.todoCompletedList)
    }, [])
 

    return (
        <div>
            <section id="lists">
                <h3 className="header">
                    Completed Todo List
                </h3>
            { 
                compList.length > 0 ?  <TodoLists list={compList} compList={true}/> : 
                <p style={{textAlign:"center"}}>No Todo Found. Can you add one?</p>
            }
            </section>
        </div>
    )
}

export default TodoComp
