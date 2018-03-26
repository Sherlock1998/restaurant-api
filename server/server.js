const express = require('express');
const bodyParser = require('body-parser');

const { mongoose } = require('./db/mongoose');
const { Bookings } = require('./models/bookings');

const app = express();
const port = process.env.PORT || 3000;

// bodyParser allows express to post bodies
app.use(bodyParser.json());

app.post('/bookings', (req, res) => {
  // console.log(req.body);
  const booking = new Bookings({
    name: req.body.name,
    contactNumber: req.body.contactNumber,
  });

  booking.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/bookings', (req, res) => {
  Bookings.find().then((bookings) => {
    res.send({ bookings });
  }, (e) => {
    res.status(400).send(e);
  });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

module.exports = { app };
