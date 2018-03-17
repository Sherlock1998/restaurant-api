var express = require('express');
var bodyParser = require('body-parser')

var {mongoose} = require('./db/mongoose');
var {bookings} = require('./models/bookings');

var app = express();

//bodyParser allows express to post bodies
app.use(bodyParser.json());

app.post('/bookings',(req,res)=>{
  // console.log(req.body);
  var booking = new bookings({
    name: req.body.name
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
