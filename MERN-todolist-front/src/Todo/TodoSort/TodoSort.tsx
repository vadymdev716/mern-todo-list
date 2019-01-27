import React, {Component} from 'react'
import './TodoSort.scss'
import { observer, inject } from 'mobx-react'
import classNames from 'classnames';

@inject('TodoStore')
@observer
class TodoSort extends Component<any, any> {

    formHandler = (e: any) => {
        this.props.TodoStore.setSortMethod(e.target.value)
    }
    
    render() {
        if (this.props.TodoStore.todoList.length === 0) return null;

        const {sortMethod} = this.props.TodoStore
        return (
            <div className="TodoSort">
                <div className="sortLabel">Sort list by: </div>
                <form onChange={this.formHandler} className="radioGroup">
                    <label className={classNames({'active': sortMethod === 'title'})}>
                        <span>&#10003;</span><input type="radio" name="contact" value="title" />
                        Title
                    </label>
                    <label className={classNames({'active': sortMethod === 'createdAt'})}>
                        <span>&#10003;</span><input type="radio" name="contact" value="createdAt" />
                        Date
                    </label>
                </form>
            </div>
        )
    }
}

export default TodoSort