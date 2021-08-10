import React,{useState} from 'react'
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
    const [inCompList, setInCompList] = useState(getlocalStorageItems())
    console.log(inCompList);
    return (
        <div>
              <section id="lists">
              <h3 className="header">
                  Incompleted Todo List
               </h3>
            {
              inCompList.length ? <TodoLists list={inCompList} comp={true}/> : <p style={{textAlign:"center"}}>No Work Completed yet. </p>
            }
           </section>
        </div>
    )}

export default TodoInComp
