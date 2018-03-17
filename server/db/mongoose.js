var mongoose = require('mongoose');

//Use the Promise library. Not enabled by default
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/bookings');

module.exports = {mongoose};
