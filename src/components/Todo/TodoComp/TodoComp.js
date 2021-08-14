import React,{useState, useEffect,useCallback} from 'react'
import TodoLists from '../TodoList/TodoLists';
import firebase from '../../../firebase';


const TodoComp = () => {
    const [compList, setCompList] = useState([])
    const database = firebase.firestore().collection("todo")  
    const fetchData = useCallback(() => {
        database.get().then((item) => {
          const items = item.docs.map((doc) => doc.data())
          setCompList(items.filter(list => list.completed === true))
         }) 
      },[])

    useEffect(() => {
          fetchData()
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
