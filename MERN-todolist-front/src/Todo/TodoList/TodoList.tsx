import React, { Component } from 'react';
import './TodoList.scss';
import TodoItem from '../TodoItem/TodoItem'
import {observer, inject} from 'mobx-react';

@inject('TodoStore')
@observer
class TodoList extends Component<any, {}> {

    componentDidMount = () => {
        this.props.TodoStore.fetchTodos();
    }

    render() {

        const { filteredList } = this.props.TodoStore
        const itemsList = filteredList.length > 0 ? (
            filteredList.map((item:any, i:any) => (
                <TodoItem key={item._id} config={item} index={i}/>
            )
            ) 
        ) : null;

        return(
            <div className='TodoList'>
                {itemsList}
            </div>
        )
    }
}

export default TodoList