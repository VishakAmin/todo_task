import React,{useState,useEffect, useCallback} from 'react'
import TodoLists from '../TodoList/TodoLists';
import firebase from '../../../firebase';

const TodoInComp = () => {
    const [inCompList, setInCompList] = useState([])
    const database = firebase.firestore().collection("todo")  

    const fetchData = useCallback(() => {
      database.get().then((item) => {
        const items = item.docs.map((doc) => doc.data())
        setInCompList(items.filter(list => list.completed === false))
       }) 
    },[])

    useEffect(() => {
          fetchData();
    })

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
