import { observable, computed, action, reaction } from 'mobx';
import { ITodoItem, IFetchedTodo } from '../model/interface'
// import {TodoModel} from '../model/todoModel'
import {Api} from '../utils/Api';

class Todo {
    @observable public todoList: ITodoItem[] = [];
    @observable public currentTodoIndex: number | null = null;
    @observable public filter: string = 'all';
    @observable public sortMethod: string = '';

    private sortTodo = reaction(
        () => this.sortMethod,
        (method: string) => {
            this.sortTodoList(method)
        }
    );

    @action fetchTodos = async() => {
        try{
            const result = await Api.getTodos('/todos')
            console.log(result);
           
            this.todoList = result.data.todos;
        } catch {
           console.log('Todo list fetching is failed')
        }
            
    }


    @action setSortMethod(name: string): void {
        this.sortMethod = name
    }

    @action sortTodoList(method: string) {
        this.todoList = this.todoList.slice().sort((a: ITodoItem, b: ITodoItem) => {
            if (a[method] > b[method]) {
                return 1;
            }
            if (a[method] < b[method]) {
                return -1;
            }
            return 0;
        })
    }

    // @computed private get todoLength(): number {
    //     return this.todoList.length
    // }

    @action private async addTodo(title: string) {
        const todo: {title: string, done: boolean} = {
            title: title,
            done: false
        }

        try{
            const response  = await Api.createTodo('/todo', todo)
            
            this.todoList.push(response.data.todo)
            if(this.sortMethod) {
                this.sortTodoList(this.sortMethod)
            }
        } catch {
            console.log('Todo creation failed')
        }
    }

    @action private async removeTodo(id: string) {
        try {
            const resonse = await Api.deleteTodo(`/todo/${id}`)
            
            this.todoList = this.todoList.filter((item, i) => {
                return item._id !== id
            })

        } catch {
            console.log('Delete todo failed')
        }

    }

    @action private async editTodoName (id: string, field: string) {
        const todoItem = this.todoList.find(item => item._id === id);
        if (!todoItem) return;

        try {
            const response = Api.updateTodo(`/todo/${id}`, {
                ...todoItem,
                title: field
            })

            this.todoList = this.todoList.map(item => {
                if(item._id === id) {
                    return {
                        ...item,
                        title: field
                    }
                } else return item
            })

        } catch {
            console.log('Could not update todo')
        }
    }

    @action private async switchTodo(id: string) {
        const todoItem = this.todoList.find(item => item._id === id);
        if (!todoItem) return;
        try {
            const response = Api.updateTodo(`/todo/${id}`, {
                ...todoItem,
                done: !todoItem.done
            })

            this.todoList = this.todoList.map(item => {
                if(item._id === id) {
                    return {
                        ...item,
                        done: !item.done
                    }
                } else return item
            })

        } catch {
            console.log('Could not update todo')
        }
    }

    @action private changeFilter(name: string): void {
        this.filter = name;
    }

    @computed private get filteredList() {
        switch (this.filter) {
            case 'all': 
                return this.todoList
                break
            case 'completed':
                return this.todoList.filter(item => {
                    return item.done === true 
                })
                break
            case 'active':
                return this.todoList.filter(item => {
                    return item.done !== true 
                })
                break
            default: 
                break
        }
    }
}

export const TodoStore = new Todo()