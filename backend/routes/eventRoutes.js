const express = require('express');
const router = express.Router();
const {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  getOrganizerEvents,
  getEventStats
} = require('../controllers/eventController');
const { protectOrganizer, protectUser } = require('../middleware/auth');

// Public routes
router.get('/', getAllEvents);
router.get('/:id', getEventById);

// Organizer routes
router.post('/', protectOrganizer, createEvent);
router.put('/:id', protectOrganizer, updateEvent);
router.delete('/:id', protectOrganizer, deleteEvent);
router.get('/organizer/my-events', protectOrganizer, getOrganizerEvents);
router.get('/:id/stats', protectOrganizer, getEventStats);

module.exports = router;
