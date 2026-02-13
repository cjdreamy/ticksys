const Ticket = require('../models/Ticket');
const Event = require('../models/Event');

// @desc    Purchase tickets
// @route   POST /api/tickets/purchase
// @access  Private
exports.purchaseTickets = async (req, res) => {
  try {
    const { eventId, quantity, paymentMethod } = req.body;

    // Validation
    if (!eventId || !quantity || !paymentMethod) {
      return res.status(400).json({ success: false, message: 'Please provide event ID, quantity, and payment method' });
    }

    if (quantity < 1) {
      return res.status(400).json({ success: false, message: 'Quantity must be at least 1' });
    }

    // Check event exists and has available tickets
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    if (event.ticketsAvailable < quantity) {
      return res.status(400).json({ success: false, message: 'Not enough tickets available' });
    }

    if (event.status !== 'Published') {
      return res.status(400).json({ success: false, message: 'Event is not available for ticket purchase' });
    }

    // Create ticket
    const ticket = await Ticket.create({
      event: eventId,
      user: req.user.id,
      price: event.price,
      quantity,
      paymentMethod,
      status: 'Confirmed',
      transactionId: `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    });

    // Update event available tickets
    event.ticketsAvailable -= quantity;
    await event.save();

    // Populate event details
    const populatedTicket = await Ticket.findById(ticket._id).populate('event').populate('user', 'firstName lastName email');

    res.status(201).json({
      success: true,
      message: 'Tickets purchased successfully',
      ticket: populatedTicket,
      totalPrice: event.price * quantity
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get user's tickets
// @route   GET /api/tickets/my-tickets
// @access  Private
exports.getUserTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ user: req.user.id })
      .populate('event', 'title startDate location price')
      .sort('-purchaseDate');

    res.status(200).json({
      success: true,
      count: tickets.length,
      tickets
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get ticket by ID
// @route   GET /api/tickets/:id
// @access  Private
exports.getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id)
      .populate('event')
      .populate('user', 'firstName lastName email phone');

    if (!ticket) {
      return res.status(404).json({ success: false, message: 'Ticket not found' });
    }

    // Check if user owns ticket or is the organizer
    if (ticket.user._id.toString() !== req.user.id && req.user.role !== 'organizer') {
      return res.status(403).json({ success: false, message: 'Not authorized to view this ticket' });
    }

    res.status(200).json({
      success: true,
      ticket
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Cancel ticket
// @route   PUT /api/tickets/:id/cancel
// @access  Private
exports.cancelTicket = async (req, res) => {
  try {
    let ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ success: false, message: 'Ticket not found' });
    }

    if (ticket.user.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized to cancel this ticket' });
    }

    if (ticket.status === 'Used' || ticket.status === 'Cancelled') {
      return res.status(400).json({ success: false, message: 'Cannot cancel this ticket' });
    }

    ticket.status = 'Cancelled';
    ticket = await ticket.save();

    // Return tickets to event
    const event = await Event.findById(ticket.event);
    event.ticketsAvailable += ticket.quantity;
    await event.save();

    res.status(200).json({
      success: true,
      message: 'Ticket cancelled successfully',
      ticket
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get event tickets (Organizer only)
// @route   GET /api/tickets/event/:eventId
// @access  Private
exports.getEventTickets = async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);

    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    if (event.organizer.toString() !== req.organizer.id) {
      return res.status(403).json({ success: false, message: 'Only event organizer can view tickets' });
    }

    const tickets = await Ticket.find({ event: req.params.eventId })
      .populate('user', 'firstName lastName email')
      .sort('-purchaseDate');

    res.status(200).json({
      success: true,
      count: tickets.length,
      tickets
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
