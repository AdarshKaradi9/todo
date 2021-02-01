const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
    todos: [
        {
            name: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true,
            }
        }
    ]
    
});

module.exports = Todo = mongoose.model('Todo', TodoSchema); 