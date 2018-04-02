const express = require('express');
const bodyParser = require('body-parser');

const { mongoose } = require('./db/mongoose');
const { Bookings } = require('./models/bookings');
const { History } = require('./models/history');
const { ObjectID } = require('mongodb');
const dateFormat = require('dateformat');

const app = express();
const port = process.env.PORT || 3000;

// bodyParser allows express to post bodies
app.use(bodyParser.json());

app.post('/bookings', (req, res) => {
  const booking = new Bookings({
    name: req.body.name,
    contactNumber: req.body.contactNumber,
  });

  app.post('/history', (req, res) => {
    const booking = new History({
      name: req.body.name,
      contactNumber: req.body.contactNumber,
    });

    booking.save().then((booking) => {
      res.send(booking);
    }).catch((e) => {
      res.status(400).send(e);
    });
  });

  booking.save().then((booking) => {
    res.send(booking);
  }).catch((e) => {
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

app.get('/history', (req, res) => {
  History.find().then((booking) => {
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

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  // add booking to the history page
  Bookings.findById(id).then((booking) => {
    const now = new Date();
    // dont need to include id because it is not used
    const history = new History({
      name: booking.name,
      contactNumber: booking.contactNumber,
      confirmed: true,
      confirmedAt: dateFormat(now, 'dddd, mmmm dS, yyyy, h:MM:ss TT'),
    });

    history.save(booking).then(() => {
      // res.send({ booking });
      res.status(200).send();
    })
      .catch((e) => {
        res.status(400).send(e);
      });
  });
  // remove booking from bookings page

  Bookings.findOneAndRemove(id).then((booking) => {
    if (!booking) {
      return res.status(404).send();
    }
  }).catch((e) => {
    res.status(400).send(e);
  });
});


app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

module.exports = { app };
