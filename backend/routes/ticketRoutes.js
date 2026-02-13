const express = require('express');
const router = express.Router();
const {
  purchaseTickets,
  getUserTickets,
  getTicketById,
  cancelTicket,
  getEventTickets
} = require('../controllers/ticketController');
const { protectUser, protectOrganizer } = require('../middleware/auth');

// User ticket routes
router.post('/purchase', protectUser, purchaseTickets);
router.get('/my-tickets', protectUser, getUserTickets);
router.get('/:id', protectUser, getTicketById);
router.put('/:id/cancel', protectUser, cancelTicket);

// Organizer ticket routes
router.get('/event/:eventId', protectOrganizer, getEventTickets);

module.exports = router;
