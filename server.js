const express = require('express')
const connectDB = require('./config/db');

//Connect database
connectDB();
const app = express();
app.use(express.json({ extended: false }));

//Define Routes
app.use('/user', require('./routes/users'));
app.use('/todo', require('./routes/todos'))


app.get('/', (req, res) => {
    res.send('users');
})

app.listen(5000, () => {
    console.log('Server started on port 5000...');
})
