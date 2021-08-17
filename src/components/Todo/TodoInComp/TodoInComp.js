import React,{useState,useEffect} from 'react'
import TodoLists from '../TodoList/TodoLists';
import { useAuth } from '../../contexts/AuthContext';
import firebase from '../../../firebase';

const TodoInComp = () => {
    const [inCompList, setInCompList] = useState([])
    const {currentUser} = useAuth()
    const database = firebase.firestore().collection("user")  

    useEffect(() => {
        const fetchData = () => {
            database
            .doc(currentUser.uid)
            .collection("todo")
            .get()
            .then((item) => {
             const items = item.docs.map((doc) => doc.data())
            setInCompList(items.filter(list => list.completed === false))
            }) 
          }
          fetchData()
      }, []) //eslint-disable-line
 
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
