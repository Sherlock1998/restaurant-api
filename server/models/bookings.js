var mongoose = require('mongoose')

var bookings = mongoose.model('bookings', {
  name: {
    type:String,
    required:true,
  },
  // contactNumber: {
  //   type:Number,
  //   trim:true
  // },
  // seats: {
  //   type:Number,
  //
  //   min:1
  // },
  // notes: {
  //   type:String,
  // },
  // confirmed: {
  //   type:Boolean,
  //   default:false,
  // },
  // confirmedAt: {
  //   type:Number,
  //   default:null,
  // }
});

module.exports = {bookings}
