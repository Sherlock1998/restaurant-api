let mongoose = require('mongoose');

// Use the Promise library. Not enabled by default
mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bookings');

module.exports = { mongoose };
