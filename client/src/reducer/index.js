import { combineReducers } from 'redux';
import auth from './auth'
import todo from './todo'
import alert from './alert'
export default combineReducers({
    auth,
    todo,
    alert
})