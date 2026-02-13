const express = require('express');
const router = express.Router();
const { registerOrganizer, loginOrganizer, getOrganizerProfile, updateOrganizerProfile } = require('../controllers/authOrganizerController');
const { protectOrganizer } = require('../middleware/auth');

// Organizer Authentication Routes
router.post('/organizer/register', registerOrganizer);
router.post('/organizer/login', loginOrganizer);
router.get('/organizer/me', protectOrganizer, getOrganizerProfile);
router.put('/organizer/profile', protectOrganizer, updateOrganizerProfile);

module.exports = router;
