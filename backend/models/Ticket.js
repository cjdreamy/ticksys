const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  ticketNumber: {
    type: String,
    unique: true,
    required: true
  },
  event: {
    type: mongoose.Schema.ObjectId,
    ref: 'Event',
    required: true
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Used', 'Cancelled'],
    default: 'Pending'
  },
  transactionId: String,
  paymentMethod: {
    type: String,
    enum: ['Card', 'Transfer', 'Wallet'],
    required: true
  },
  purchaseDate: {
    type: Date,
    default: Date.now
  },
  usedAt: Date,
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Generate unique ticket number
ticketSchema.pre('save', async function(next) {
  if (!this.ticketNumber) {
    const count = await this.constructor.countDocuments();
    this.ticketNumber = `TKT-${Date.now()}-${count + 1}`;
  }
  next();
});

module.exports = mongoose.model('Ticket', ticketSchema);
