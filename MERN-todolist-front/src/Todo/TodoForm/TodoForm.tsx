import React, { Component } from 'react';
import './TodoForm.scss';
import {inject} from 'mobx-react';

interface ITodoFormState {
    text: string;
}

@inject('TodoStore')
class TodoForm extends Component<any, ITodoFormState> {
    state = {
        text: ''
    }
    inputElem = React.createRef();

    handleChange = (e: any) => {
            this.setState({
                text: e.target.value
            })
    }

    addHandler = () => {
        if(this.state.text && this.state.text.trim().length > 0) {
            this.props.TodoStore.addTodo(this.state.text)
            this.setState({
                text: ''
            })
        }
    }
    clearHandler = () => {
        this.setState({
            text: ''
        })
    }
    keyUpHandler = (e: any) => {
        if(this.state.text && this.state.text.trim().length > 0) {
            if(e.keyCode == 13) {
                e.preventDefault()
                this.props.TodoStore.addTodo(this.state.text)
                this.setState({
                    text: ''
                })
            }
            if(e.keyCode == 27) {
                e.preventDefault()
                this.setState({
                    text: ''
                })
            }
        }
    }

    componentDidMount = () => {
        const formInput = document.getElementById('mainFormInput')
        if(formInput) {
            formInput.focus();
        }
        // if (this.inputElem.current) {
        //     this.inputElem.current.focus();
        // }
    }

    render() {
        return(
            <div className='TodoForm'>
               <div className="TodoForm__item TodoForm__label">I NEED TO DO:</div> 
               <input className='TodoForm__item TodoForm__input' 
                    // ref={this.inputElem}
                    id='mainFormInput'
                    value={this.state.text} 
                    type='text' 
                    onChange={this.handleChange} 
                    onKeyUp={this.keyUpHandler}
                />
               <div className="TodoForm__item TodoForm__actions">
                    <div className="addButton" onClick={this.addHandler}>ADD</div>
                    <div className="clearButton" onClick={this.clearHandler}>CLEAR</div>
               </div>
            </div>
        )
    }
}

export default TodoForm