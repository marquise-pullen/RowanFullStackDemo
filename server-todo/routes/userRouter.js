const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const router = express.Router();

// POST: localhost:3001/api/users/register
router.post('/register', [
    body('username').not().isEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { email, password, username } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(500).send({ message: 'User already exists' });
        }

        // Hash the password and create a new user
        const user = new User(req.body);

        await user.save();

        // Respond with the new user's data, excluding the password
        res.status(201).send({
            message: 'User registered successfully',
            user: {
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        console.error(error);
        res.status(400).send({ message: 'Error registering user' });
    }
});

// POST: localhost:3001/api/users/login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).send({ message: 'Login failed! User not found' });
        }

        // Compare the hashed password
        const isPasswordMatch = await bcrypt.compareSync(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).send({ message: 'Login failed! Password not a match' });
        }

        // Return user data (excluding the password)
        res.status(200).send({
            message: 'Login successful',
            user: {
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        console.error(error);
        res.status(400).send({ message: 'Error logging in' });
    }
});

module.exports = router;

