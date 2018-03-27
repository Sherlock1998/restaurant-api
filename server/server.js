const express = require('express');
const bodyParser = require('body-parser');

const { mongoose } = require('./db/mongoose');
const { Bookings } = require('./models/bookings');
const { History } = require('./models/history');
const { ObjectID } = require('mongodb');

const app = express();
const port = process.env.PORT || 3000;

// bodyParser allows express to post bodies
app.use(bodyParser.json());

app.post('/bookings', (req, res) => {
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
    return res.status(404).send();
  }

  Bookings.findById(id).then((booking) => {
    res.send({ booking });
  }).catch((e) => {
    res.status(400).send(e);
  });
});

app.delete('/bookings/:id', (req, res) => {
  const { id } = req.params;
  // console.log(res.body);
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  // add booking to the history page
  Bookings.findById(id).then((booking) => {
    const history = new History({
      name: booking.name,
      contactNumber: booking.contactNumber,
      id,
    });

    history.save(booking).then((doc) => {
      res.send(doc);
    }, (e) => {
      res.status(400).send(e);
    });
  });

  // remove booking from bookings page
  Bookings.findByIdAndRemove(id).then((booking) => {
    if (!booking) {
      return res.status(404).send();
    }
    res.send(booking);
  }).catch((e) => {
    res.status(400).send(e);
  });
});


app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

module.exports = { app };
