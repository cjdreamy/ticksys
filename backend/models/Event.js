const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide event title'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide event description']
  },
  organizer: {
    type: mongoose.Schema.ObjectId,
    ref: 'Organizer',
    required: true
  },
  category: {
    type: String,
    enum: ['Music', 'Sports', 'Technology', 'Art', 'Business', 'Entertainment', 'Education', 'Other'],
    required: true
  },
  startDate: {
    type: Date,
    required: [true, 'Please provide start date']
  },
  endDate: {
    type: Date,
    required: [true, 'Please provide end date']
  },
  location: {
    type: String,
    required: [true, 'Please provide location']
  },
  city: String,
  country: String,
  capacity: {
    type: Number,
    required: [true, 'Please provide event capacity']
  },
  ticketsAvailable: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: [true, 'Please provide ticket price'],
    min: [0, 'Price cannot be negative']
  },
  image: String,
  status: {
    type: String,
    enum: ['Draft', 'Published', 'Cancelled', 'Completed'],
    default: 'Draft'
  },
  views: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update ticketsAvailable based on sold tickets
eventSchema.methods.updateAvailableTickets = async function() {
  const Ticket = require('./Ticket');
  const soldTickets = await Ticket.countDocuments({ event: this._id, status: 'Confirmed' });
  this.ticketsAvailable = this.capacity - soldTickets;
  return this.save();
};

module.exports = mongoose.model('Event', eventSchema);
