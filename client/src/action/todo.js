import api from '../utils/api';
import { setAlert } from './alert';


export const getTodo = (userId) => async dispatch => {
    try {
        const res = await api.get(`/todo/${userId}`);
        dispatch({
            type: 'TODO_LOADED',
            payload: res.data
        })
        
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
    }
}

export const addTodo = ({ name, description, userId }) => async dispatch => {
    const config = {
        header: {
            'method': 'post',
            'Content-type': 'application/json'
        }
    }

    const body = JSON.stringify({ name, description });
    try {
        const res = await api.post(`/todo/add/${userId}`, body, config);
        dispatch({
            type: 'TODO_LOADED',
            payload: res.data
        })
        dispatch(setAlert('Todo added', 'success'));
    } catch (err) {
        console.log(err);
        const errors = err.response.data.errors;

        if (errors) {
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
    }
}

export const removeTodo = ({ userId, todoId }) => async dispatch => {
    try {
        await api.delete(`/todo/remove/${userId}/${todoId}`);
        dispatch(getTodo(userId));
        dispatch(setAlert('todo Removed', 'success'));
    } catch (err) {
        console.log(err);
    }
}