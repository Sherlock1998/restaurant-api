const express = require('express');
const bodyParser = require('body-parser')

const {mongoose} = require('./db/mongoose');
const {bookings} = require('./models/bookings');

const app = express();

//bodyParser allows express to post bodies
app.use(bodyParser.json());

app.post('/bookings',(req,res)=>{
  // console.log(req.body);
  const booking = new bookings({
    name: req.body.name,
    contactNumber: req.body.contactNumber
  });

  booking.save().then((doc)=>{
    res.send(doc);
  }, (e)=>{
    res.status(400).send(e);
  })
})

app.listen(3000,()=>{
  console.log('Server started on port 3000');
});

module.exports = {app};
