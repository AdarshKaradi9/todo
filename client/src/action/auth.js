import api from '../utils/api';
import { setAlert } from './alert';

// a simple action that is called by the React component that dispatches the data to the reducer
export const loadUser = (email) => async dispatch => {
    try {
        const res = await api.get(`/user/${email}`);
        dispatch({
            type: 'USER_LOADED',
            payload: res.data
        }) 
    }catch(err) {
        console.log(err);
        
    }
}


export const register = ({ name, email, password }) => async dispatch => {
    const config = {
        header: {
            'method': 'post',
            'Content-type': 'application/json'
        }
    }

    const body = JSON.stringify({ name, email, password });
    try {
        const res = await api.post('/user/register', body, config);
        dispatch({
            type: 'REGISTER_SUCCESS',
            payload: res.data
        })
        dispatch(loadUser(res.data.email));
        dispatch(setAlert('Registered successfully', 'success'));
    } catch (err) {
        console.log(err);
        const errors = err.response.data.errors;

        if (errors) {
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
    }
}

export const login = ({ email, password }) => async dispatch => {
    const config = {
        header: {
            'method': 'post',
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ email, password });
    try {
        const res = await api.post('/user/login', body, config);
        dispatch({
            type: 'LOGIN_SUCCESS',
            payload: res.data
        })  
        
        dispatch(loadUser(res.data.email));
        dispatch(setAlert('Logged in successfully', 'success'));
    } catch (err) {
        console.log(err);
        const errors = err.response.data.errors;

        if (errors) {
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
    }
}

export const logout = () => async dispatch => {
    dispatch({
        type: 'LOGOUT'
    })
    dispatch({
        type: 'CLEAR_TODO'
    })
    dispatch(setAlert('Logged out successfully', 'success'));
}