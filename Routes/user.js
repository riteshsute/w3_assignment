const express = require('express');
const router = express.Router();
const User = require('../Models/user');

// Route to add a new user
router.post('/addUser', async (req, res) => {
    console.log('total points added')
    const { name } = req.body;
    try {
        const user = new User({ name });
        await user.save();
        res.status(201).json({ message: 'User added successfully', user });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add user' });
    }
});

// Route to get all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get users' });
    }
});

module.exports = router;
