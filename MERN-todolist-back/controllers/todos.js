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