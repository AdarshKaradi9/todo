import React, { Fragment, useEffect, useState } from 'react'
import { Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addTodo, getTodo, removeTodo } from '../../action/todo';
const Todos = ({ auth: {isAuthenticated, user }, todos: { todos }, getTodo, addTodo, removeTodo }) => {
    useEffect(() => {
        if(user) {
            getTodo(user._id);
        }
      }, [getTodo, user]);
    const [todoData, setodoData ] = useState({
        name: '',
        description: '',
    });

    const { name, description } = todoData;
    
    const onChange = e => setodoData({ ...todoData, [e.target.name]: e.target.value });
    const onAdd = async e => {
        e.preventDefault();
        if(user) {
            const userId = user._id;
            addTodo({ name, description, userId });
        }        
    }

    const onRemove = async (e, userId, todoId) => {
        e.preventDefault();
        removeTodo({ userId, todoId})
    }

    if(!isAuthenticated) {
        return <Redirect to='/login' />
    }

    return (
        <Fragment>
            <div className='todo-main'>
            <h2 className="p-10">Add todo</h2>
            <section className="container todo">
                
                <form className="form" onSubmit={ e => onAdd(e) }>
                    <div className="form-group">
                        <input type="text" placeholder="name" value={name} onChange={ e => onChange(e)} name="name"/>{' '}
                        <input type="text" placeholder="description" value={description} onChange={ e => onChange(e)} name="description"/>{' '}
                        <input type="submit" className="btn btn-primary btn-sm" value="add" />
                    </div>
                    { todos && <i>Remaining todos: {todos.length}</i>}
                </form>
                <div>
                    { todos && todos.length>0 ? (todos.reverse().map(todo => 
                    <div>
                        <div className='todo-inner'>
                            <div><h4><strong>{todo.name}</strong></h4></div>
                            <div className='tbtn'><i>{todo.description}</i></div> 
                            <button className='btn btn-danger btn-sm' onClick={e => onRemove(e, user._id, todo._id)}>remove</button>
                        </div><hr />
                    </div> )) : <div>No todos added yet</div> }
                </div>
            </section>
            </div>
            
        </Fragment>
    )
}

Todos.propTypes = {
    getTodo: PropTypes.func.isRequired,
    addTodo: PropTypes.func.isRequired,
    removeTodo: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    todos: state.todo
})

export default connect(mapStateToProps, { getTodo , addTodo, removeTodo })(Todos)


        