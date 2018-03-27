const mongoose = require('mongoose');

const History = mongoose.model('history', {
  name: {
    type: String,
    // required: true,
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
    type: Number,
    default: null,
  },
});

module.exports = { History };
