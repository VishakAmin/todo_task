import React,{useState, useEffect} from 'react'
import TodoLists from '../TodoList/TodoLists';

const getlocalStorageItems = () => {
    const todo = localStorage.getItem('lists');
    if(todo){
      const comp = JSON.parse(todo)
      return comp.filter(list => list.completed === true)
    }
    else{
      return []
    }
}

const TodoComp = () => {
    const [compList, setCompList] = useState([])
    useEffect(() => {
        setCompList(getlocalStorageItems())
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
