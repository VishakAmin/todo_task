import React,{useState,useEffect, useCallback} from 'react'
import TodoLists from '../TodoList/TodoLists';
import { useAuth } from '../../contexts/AuthContext';
import firebase from '../../../firebase';

const TodoInComp = () => {
    const [inCompList, setInCompList] = useState([])
    const {currentUser} = useAuth()
    

    const fetchData = useCallback(() => {
      firebase.firestore().collection("user")
      .doc(currentUser.uid)
      .collection("todo")
      .get()
      .then((item) => {
       const items = item.docs.map((doc) => doc.data())
      setInCompList(items.filter(list => list.completed === false))
      }) 
    },[currentUser])

    useEffect(() => {
          fetchData()
      }, [fetchData])
 
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
