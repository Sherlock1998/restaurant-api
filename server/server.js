const express = require('express');
const bodyParser = require('body-parser');

const { mongoose } = require('./db/mongoose');
const { Bookings } = require('./models/bookings');
const { ObjectID } = require('mongodb');

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

  booking.save().then((booking) => {
    res.send(booking);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/bookings', (req, res) => {
  Bookings.find().then((booking) => {
    res.send({ booking });
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/bookings/:id', (req, res) => {
  const id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(400).send();
  }

  Bookings.findById().then((booking) => {
    res.send({ booking });
  }).catch((e) => {
    res.status(400).send(e);
  });
});

app.delete('/bookings/:id', (req, res) => {
  const id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(400).send();
  }

  Bookings.findByIdAndRemove(id).then((booking) => {
    res.send({ booking });
  }).catch((e) => {
    res.status(400).send(e);
  });
});


app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

module.exports = { app };
