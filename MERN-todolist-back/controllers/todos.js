const Todo = require('../models/todo');

exports.getTodos = (req, res, next) => {
    Todo.find()
        .then(todos => {
            res.status(200).json({
                message: 'Fetched todos successfully.',
                todos: todos
            })
        })
        .catch(err => {
            next(err)
        })
}

exports.postTodo = (req, res, next) => {
    const { title, done} = req.body;
    const todo = new Todo({
        title: title,
        done: done, 
    })
    todo.save()
        .then(result => {
            console.log(result)
            res.status(201).json({
                message: 'Todo created successfully.',
                todo: todo,
            })
        })
        .catch(err => {
            console.log('Todo create failed');
            next(err);
        })
}

exports.updateTodo = (req, res, next) => {
    const todoId = req.params.id;
    Todo.findByIdAndUpdate(todoId, {
            title: req.body.title,
            done: req.body.done,
        })
        .then(result => {
            res.status(200).json({message: 'Todo updated successfully', todo: result})
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}

exports.deleteTodo = (req, res, next) => {
    const todoId = req.params.id;
    console.log(todoId);
    Todo.findByIdAndDelete(todoId)
        .then(result => {
            console.log('Todo deleted successfully')
            console.log(result);
            res.status(200).json({message: 'Todo deleted', id: result._id})
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}