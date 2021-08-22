import {types, onSnapshot, flow, applySnapshot, getSnapshot} from "mobx-state-tree"
import { nanoid } from "nanoid";


export const TodoModel = types
.model('TodoModel',{
    text:  types.string,
    priority: types.optional(types.string, "low"),
    id: types.string,
    completed: types.optional(types.boolean, false)
})
.actions((self) => ({
    todoCompleted(id){
        self.completed = !self.completed;
    }
}))

.views((self) => ({
    get todosOfUser(){
         return self.text
    }
}))

export const TodoStore = types
.model("TodoStore",{
    todos:types.array(TodoModel)
})
.actions((self) => ({
    addTodo(newTodo){
            self.todos.push(newTodo)
    },

    deleteTodo(id){
        const index = self.todos.findIndex(item => item.id === id)
        self.todos.splice(index,1)
    },

    updateTodo(id, newTodo){
        const index = self.todos.findIndex(item => item.id === id)
        self.todos.splice(index,1, newTodo)
    },

    completedTodo(id){
        self.todos.completed = !self.todos.completed 
        //   console.log(self.id.completed ? "T":"F");
    }

}))
.views((self) => ({
    get todoCompletedList(){
        return self.todos.filter(todo => todo.completed === true)
    },
    get todoInCompleteList(){
        return self.todos.filter(todo => todo.completed === false)    
    }
}))


let _todoStore;
export const useTodos = () => {
    if(!_todoStore){
        _todoStore = TodoStore.create({
            todos:[{
                text: "dasdas",
                id:"dasdasdasd",
                priorty:"low",
                completed:true
            }]
        })
    }
    return _todoStore
}

