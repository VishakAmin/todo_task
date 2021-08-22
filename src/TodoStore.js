import {types, onSnapshot, flow, applySnapshot, getSnapshot} from "mobx-state-tree"
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
    setFTodos(todos){
        self.filterTodos = todos
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
                console.log(items);
                self.setTodos(items)
                self.setFTodos(items)
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
        const _filter = self.filterType === "all" ? self.filterTodos :  self.filterType === "low" ? self.filterTodos.filter(todo => todo.priority === "low")  : "high"
        console.log(self.filterType,_filter);
        return self.setTodos(_filter)
    },
    // get sortTodoList(){
    //     return self.todos.filter()
    // }

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
