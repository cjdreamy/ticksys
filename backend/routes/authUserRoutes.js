const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile, updateUserProfile } = require('../controllers/authUserController');
const { protectUser } = require('../middleware/auth');

// User Authentication Routes
router.post('/user/register', registerUser);
router.post('/user/login', loginUser);
router.get('/user/me', protectUser, getUserProfile);
router.put('/user/profile', protectUser, updateUserProfile);

module.exports = router;
