const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Todo = require('../models/Todo');
const User = require('../models/User');

//@route   POST todo/create
//@desc    Create Todo
//@access  Public

router.post('/add/:userId', [
    check('name', 'Name is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
],
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { name, description } = req.body;
    const user = await User.findOne({ _id: req.params.userId });
    const todo = await Todo.findOne({ userId: req.params.userId })
    try {
        if(!user) {
            return res.status(400).json({ msg: 'There is no such user'});
        }
        const newTodo = {
            name,
            description
        }
        if(!todo) {
            let todos = await Todo.findOneAndUpdate(
                { userId: req.params.userId },
                { $set : {todos: newTodo }},
                { new: true, upsert: true, setDefaultsOnInsert: true }
            )  
            res.json(todos.todos); 
        }
        
        
        todo.todos.unshift(newTodo);
        
        await todo.save();
        res.json(todo.todos);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
    
})

//@route   GET todo/:userId
//@desc    Get Todo
//@access  Public

router.get('/:userId', async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.userId });
        if(user === null) {
            return res.status(400).json({ msg: 'There is no such user'});
        }
        
        const todos = await Todo.findOne({userId: req.params.userId});
        
        if(todos === null) {
            return res.status(400).json({ msg: 'There are no todos'});
        }
        res.json(todos.todos);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

router.delete('/remove/:userId/:todoId', async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.userId });
        const todosList = await Todo.findOne({ userId: req.params.userId });

        const todo = todosList.todos.find(
            ({ id }) => id === req.params.todoId
        );
        // Make sure todo exists
        if (!todo) {
        return res.status(404).json({ msg: 'todo does not exist' });
        }

        todosList.todos = todosList.todos.filter(
        ({ id }) => id !== req.params.todoId
        );
        await todosList.save();
        return res.json(todo);
    } catch (err) {
        console.error(err.message);
        res.status(500).send(err.message);
    }
}) 

module.exports = router;