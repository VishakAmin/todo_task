//For test Purpose ONLY
import React,{useState} from 'react'
import { observer } from 'mobx-react-lite'
import { useTodos } from './TodoStore'


const App1 = () =>  {
    const [todo, setTodo] = useState("")
    const todoStore = useTodos()
    const handleChange = (e) => {
            setTodo(e.target.value)
    }


    const handleSubmit = () => {
            todoStore.addTodo(todo)
    }

    return (
        <div>
            <input onChange={handleChange} value={todo}/>
            <button onClick={handleSubmit}>Add</button>
            <ul>
                {todoStore.todos.map(todo => (
                    <li>{todo.text} {todo.completed ? "Yes " : " No " }</li>
                ))}
            </ul>

        </div>
    )
}

export default observer(App1)
