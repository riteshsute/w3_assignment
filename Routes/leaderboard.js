const express = require('express');
const router = express.Router();
const User = require('../Models/user');
const pointsHistory = require('../Models/pointsHistory');

// Route to claim random points for a user
router.post('/pointsHistory', async (req, res) => {
    console.log('total points added1')
    const { userId } = req.body;
    const points = Math.floor(Math.random() * 10) + 1;

    try {
        // Find the user and update the total points
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.totalPoints += points;
        await user.save();

        console.log('total points added2')
        // Save the claim history
        const newpointsHistory = new pointsHistory({ userId, points });
        console.log(newpointsHistory, 'jbjbs');
        await newpointsHistory.save();
        console.log('total points added in tri');


        res.status(200).json({ message: 'Points claimed successfully', points });
    } catch (error) {
        res.status(500).json({ error: 'Failed to claim points' });
    }
});

// Route to get the leaderboard
router.get('/leaderboard', async (req, res) => {
    try {
        const users = await User.find().sort({ totalPoints: -1 });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get leaderboard' });
    }
});

module.exports = router;
