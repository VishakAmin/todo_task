import React,{useState,useEffect, useCallback} from 'react'
import TodoLists from '../TodoList/TodoLists';
import { useAuth } from '../../contexts/AuthContext';
import { useTodos } from '../../../TodoStore';

const TodoInComp = () => {
    const [inCompList, setInCompList] = useState([])
    const {currentUser} = useAuth()
    const todoStore = useTodos() 
    

    useEffect(() => {
      //currentUser && todoStore.fetchTodo(currentUser.uid)
      setInCompList(todoStore.todoInCompleteList)
  }, [])

    return (
        <div>
              <section id="lists">
              <h3 className="header">
                  Incompleted Todo List
               </h3>
            {
              inCompList.length > 0 ? <TodoLists list={inCompList} compList={true}/> : <p style={{textAlign:"center"}}>No Work Completed yet. </p>
            }
           </section>
        </div>
    )}

export default TodoInComp
