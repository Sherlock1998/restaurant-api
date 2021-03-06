const mongoose = require('mongoose');

const Bookings = mongoose.model('bookings', {
  name: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: Number,
    trim: true,
  },
  seats: {
    type: Number,
    min: 1,
  },
  notes: {
    type: String,
  },
  confirmed: {
    type: Boolean,
    default: false,
  },
  confirmedAt: {
    type: String,
    default: null,
  },
});

module.exports = { Bookings };
