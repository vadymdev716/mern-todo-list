import React, { Component } from 'react';
import './TodoItem.scss';
import DeleteIcon from '../../img/delete.svg'
import CheckBoxIcon from '../../img/check-box-empty.svg'
import OutlineIcon from '../../img/outline-done.svg'
import EditIcon from '../../img/edit-icon.svg'
import moment from 'moment';
import {observer, inject} from 'mobx-react';


@inject('TodoStore')
@observer
class TodoItem extends Component<any, {}> {
    state = {
        isEdit: false,
        editableText: ''
    }
    // inputRef = React.createRef()

    doneHandler = () => {
        this.props.TodoStore.switchTodo(this.props.config._id)
    }
    removeHandler = () => {
        this.props.TodoStore.removeTodo(this.props.config._id)
    }
    editHandler = () => {
        this.setState({
            isEdit: true
        })
    }
    editTextHandler = (e: any) => {
        this.setState({
            editableText: e.target.value
        })
    }
    componentDidUpdate = () => {
        const editInput = document.getElementById('editInput')
        if(editInput) {
            editInput.focus()
        }
    }

    keyUpHandler = (e: any) => {
        if(this.state.editableText && this.state.editableText.trim().length > 0) {
            if(e.keyCode == 13) {
                e.preventDefault()
                this.props.TodoStore.editTodoName(this.props.config._id, this.state.editableText)
                this.setState({
                    isEdit: false,
                    editableText: '',
                })
            }
            if(e.keyCode == 27) {
                e.preventDefault()
                this.setState({
                    isEdit: false,
                    editableText: ''
                })
            }
        }
    }

    render() {
        const {done, title, createdAt} = this.props.config
        return(
            <div className='TodoItem'>
                <div className="TodoItem__mainContainer">
                    <div className="TodoItem__marker"><img src={done ? OutlineIcon : CheckBoxIcon} alt='Done' onClick={this.doneHandler}/></div>
                    {this.state.isEdit 
                        ? <input id='editInput' onKeyUp={this.keyUpHandler} className='TodoItem__editInput' type='text' value={this.state.editableText} onChange={this.editTextHandler} />
                        : <div className={done ? "TodoItem__text through" : "TodoItem__text"}>{title}<div className='TodoItem__doneLabel'>DONE</div></div>
                    }
                    <div className="TodoItem__date">{moment(createdAt).format('Do MMM YYYY')}</div>
                    {done 
                        ? <div className="TodoItem__delete" onClick={this.removeHandler}><img src={DeleteIcon} alt='Delete'/></div>
                        : <div className="TodoItem__edit" onClick={this.editHandler}><img src={EditIcon} alt='Edit'/></div>
                    }
                </div>
            </div>
        )
    }
}

export default TodoItem