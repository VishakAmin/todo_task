import React,{useState,useEffect} from 'react'
import TodoLists from '../TodoList/TodoLists';


const getlocalStorageItems = () => {
    const todo = localStorage.getItem('lists');
    if(todo){
      const comp = JSON.parse(todo)
      return comp.filter(list => list.completed === false)

    }
    else{
      return []
    }
}


const TodoInComp = () => {
    const [inCompList, setInCompList] = useState([])
    useEffect(() => {
      setInCompList(getlocalStorageItems())
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
