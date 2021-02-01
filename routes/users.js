const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const {check, validationResult } = require('express-validator')


const User = require('../models/User');

//@route   POST users/register
//@desc    Register User
//@access  Public

router.post('/register', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
],
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    
    const {name, email, password} = req.body; 

    try {
        // See if user exists
        let user = await User.findOne({ email });
        
        if(user) {
            return res.status(400).json({ errors: [{ msg: 'User already exists' }]})
        }

        user = new User({
            name,
            email,
            password
        });

        // Encrypt password
        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);
        
        await user.save();
        res.json(user);
    } catch(err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }

});

//@route   POST users/login
//@desc    login User
//@access  Public

router.post('/login', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
],
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { email, password} = req.body; 
    try {
        // See if user exists
        let user = await User.findOne({ email });
        if(!user) {
            return res.status(400).json({ errors: [{ msg: 'Invalid Credentials or User does not exists' }]})
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({ errors: [{ msg: 'Invalid Credentials or User does not exists' }]})
        }
        res.json(user);
    } catch(err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }

});

router.get('/:email', async (req, res) => {
    const user = await User.findOne({email: req.params.email}).select('-password');
    try {
        if(!user) {
            return res.status(400).json({ msg: 'There is no such user'});
        }

        res.json(user);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

module.exports = router;