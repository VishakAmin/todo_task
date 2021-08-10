import React,{useState} from 'react'
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
    const [compList, setCompList] = useState(getlocalStorageItems())
    console.log(compList);
    return (
        <div>
            <section id="lists">
                <h3 className="header">
                    Completed Todo List
                </h3>
            { 
                compList.length > 0 ?  <TodoLists list={compList} comp={true}/> : 
                <p style={{textAlign:"center"}}>No Todo Found. Can you add one?</p>
            }
            </section>
        </div>
    )
}

export default TodoComp
