import React from 'react';
import './Todo.scss';
import TodoHeader from './TodoHeader/TodoHeader';
import TodoForm from './TodoForm/TodoForm';
import TodoList from './TodoList/TodoList';
import TodoFilter from './TodoFilter/TodoFilter'
import TodoSort from './TodoSort/TodoSort'

function Todo () {
    return (
        <div className='Todo'>
            <TodoHeader />
            <TodoForm />
            <TodoSort />
            <TodoList />
            <TodoFilter />
        </div>
    )
}

export default Todo