const express = require('express');
const todoController = require('../controllers/todos.js');

const router = express.Router();

router.get('/todos', todoController.getTodos);
router.post('/todo', todoController.postTodo);
router.put('/todo/:id', todoController.updateTodo);
router.delete('/todo/:id', todoController.deleteTodo);

module.exports = router;