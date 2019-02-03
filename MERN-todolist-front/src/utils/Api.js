import axios from 'axios';

const BASE_URL = `http://localhost:8080`;

export const Api = {
    getTodos: (path) => {
        return axios(`${BASE_URL}${path}`, {
            method: 'get'
        });
    },

    createTodo: (path, data) => {
        return axios(`${BASE_URL}${path}`,{
            headers: {'Content-Type': 'application/json'},
            data: JSON.stringify(data),
            method: 'post'
        });
    },

    deleteTodo: (path) => {
        return axios(`${BASE_URL}${path}`,{
            headers: {'Content-Type': 'application/json'},
            method: 'delete'
        });
    },

    updateTodo: (path, data) => {
        return axios(`${BASE_URL}${path}`,{
            headers: {'Content-Type': 'application/json'},
            data: JSON.stringify(data),
            method: 'put'
        });
    }
}