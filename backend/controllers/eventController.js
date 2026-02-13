const Event = require('../models/Event');

// @desc    Get all events
// @route   GET /api/events
// @access  Public
exports.getAllEvents = async (req, res) => {
  try {
    const { category, city, search, status } = req.query;
    let query = {};

    if (category) query.category = category;
    if (city) query.city = city;
    if (status) query.status = status;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const events = await Event.find(query).populate('organizer', 'name email company').sort('-createdAt');

    res.status(200).json({
      success: true,
      count: events.length,
      events
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single event
// @route   GET /api/events/:id
// @access  Public
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    ).populate('organizer', 'name email company phone city country description');

    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    res.status(200).json({
      success: true,
      event
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create event (Organizer only)
// @route   POST /api/events
// @access  Private
exports.createEvent = async (req, res) => {
  try {
    const { title, description, category, startDate, endDate, location, city, country, capacity, price } = req.body;

    // Validation
    if (!title || !description || !category || !startDate || !endDate || !location || !capacity || !price) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    const event = await Event.create({
      title,
      description,
      category,
      startDate,
      endDate,
      location,
      city,
      country,
      capacity,
      ticketsAvailable: capacity,
      price,
      organizer: req.organizer.id
    });

    res.status(201).json({
      success: true,
      event
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update event (Organizer only)
// @route   PUT /api/events/:id
// @access  Private
exports.updateEvent = async (req, res) => {
  try {
    let event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    if (event.organizer.toString() !== req.organizer.id) {
      return res.status(403).json({ success: false, message: 'Only event organizer can update this event' });
    }

    event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      event
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete event (Organizer only)
// @route   DELETE /api/events/:id
// @access  Private
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    if (event.organizer.toString() !== req.organizer.id) {
      return res.status(403).json({ success: false, message: 'Only event organizer can delete this event' });
    }

    await Event.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Event deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get organizer's events
// @route   GET /api/events/organizer/my-events
// @access  Private
exports.getOrganizerEvents = async (req, res) => {
  try {
    const events = await Event.find({ organizer: req.organizer.id }).sort('-createdAt');

    res.status(200).json({
      success: true,
      count: events.length,
      events
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get event statistics
// @route   GET /api/events/:id/stats
// @access  Private (Organizer)
exports.getEventStats = async (req, res) => {
  try {
    const Ticket = require('../models/Ticket');
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    if (event.organizer.toString() !== req.organizer.id) {
      return res.status(403).json({ success: false, message: 'Only event organizer can view statistics' });
    }

    const tickets = await Ticket.find({ event: req.params.id });
    const confirmedTickets = tickets.filter(t => t.status === 'Confirmed');
    const totalRevenue = confirmedTickets.reduce((sum, t) => sum + (t.price * t.quantity), 0);

    res.status(200).json({
      success: true,
      stats: {
        totalTicketsSold: confirmedTickets.reduce((sum, t) => sum + t.quantity, 0),
        totalRevenue,
        totalTickets: event.capacity,
        availableTickets: event.ticketsAvailable,
        ticketsPercentage: ((event.capacity - event.ticketsAvailable) / event.capacity * 100).toFixed(2)
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
