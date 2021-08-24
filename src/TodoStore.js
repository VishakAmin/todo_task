import {types, } from "mobx-state-tree"
import firebase from './firebase';


const database = firebase.firestore().collection("user") 

export const TodoModel = types
.model('TodoModel',{
    text:  types.string,
    priority: types.string,
    id: types.string,
    completed: types.boolean
})
.actions((self) => ({
    todoCompleted(comp){
        self.completed = !comp;
    }
}))
.views((self) => ({
    get todosOfUser(){
         return self.text
    }
}))

export const TodoStore = types
.model("TodoStore",{
    todos:types.array(TodoModel),
    filterTodos:types.array(TodoModel),
    filterType: types.string,
    sortType: types.string
})
.actions((self) => ({
    addTodo(newTodo){
            self.todos.push(newTodo)
    },

    deleteTodo(id){
        const index = self.todos.findIndex(item => item.id === id)
        self.todos.splice(index,1)
    },

    completedTodo(id){
        const index = self.todos.findIndex(item => item.id === id)
        self.todos[index].completed = !self.todos[index].completed ;
        console.log(self.todos[index].completed)
    },

    updateTodo(id, newTodo){
    const index = self.todos.findIndex(item => item.id === id)
    self.todos.splice(index,1, newTodo)
    },

    setTodos(todos){
        self.todos = todos  
    },
 

    fetchTodo(id){
        database
        .doc(id)
        .collection("todo")
        .get()
        .then((item) => {
            const items = item.docs.map((doc) => {
                return doc.data()
            })
            if (items){
                self.setTodos(items)
            }
    })
    .catch((err) => {
        console.log(err);
    })
    },

    setFilter(filter){
        self.filterType = filter
    },

    setSort(sort){
        self.sortType = sort
    },
}))
.views((self) => ({
    get todoCompletedList(){
        return self.todos.filter(todo => todo.completed === true)
    },
    get todoInCompleteList(){
        return self.todos.filter(todo => todo.completed === false)    
    },
    filterTodoList(){
        return self.filterType === "all" ? self.todos :  self.filterType === "low" ? self.todos.filter(todo => todo.priority === "low")  : self.filterType === "high" ? self.todos.filter(list => list.priority === "high") : self.todos.filter(list => list.priority === "medium")
    },
     sortTodoList(){
         const  newArray =[...self.todos]
         return  newArray.sort((a,b) => self.sortType === "asc" ? 1 * a.text.localeCompare(b.text): -1 * a.text.localeCompare(b.text))
    }


}))

let _todoStore;
export const useTodos = () => {
    if(!_todoStore){
        _todoStore = TodoStore.create({
            todos:[ ],
            filterTodos:[ ],
            filterType:"",
            sortType:"",
        })
    }
    return _todoStore
}
