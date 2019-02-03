const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const mongoDB_User = process.env.MONGOdb_USER;
const mongoDB_Key = process.env.MONGOkey_USER;

const todosRoutes = require('./routes/todos');
const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

app.use('/', todosRoutes);

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({message: message, data: data});
});

mongoose.connect(
    // `mongodb+srv://${mongoDB_User}:${mongoDB_Key}@cluster0-wijca.mongodb.net/todo-list-node?retryWrites=true`
    "mongodb://localhost:27017/todoList"
)
    .then(result => {
        app.listen(8080);
        console.log('Listen on port :8080');
    })
    .catch(err => {
        console.log(err)
    })

