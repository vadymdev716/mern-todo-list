const express = require('express');

const todoController = require('../controllers/todos.js');

const router = express.Router();

router.get('/todos', todoController.getTodos);

router.post('/todo', todoController.postTodo);

module.exports = router;