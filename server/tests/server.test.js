const expect = require('expect');
const request = require('supertest');

const { app } = require('./../server');
const { Bookings } = require('./../models/bookings');
const { History } = require('./../models/history');
const { ObjectID } = require('mongodb');

const testBookings = [{
  _id: new ObjectID(),
  name: 'test 1',
  contactNumber: 1244,
}, {
  _id: new ObjectID(),
  name: 'test 2',
  contactNumber: 1234,
}];

beforeEach((done) => {
  Bookings.remove({}).then(() => Bookings.insertMany(testBookings)).then(() => History.remove({}).then(() => done()));
});

describe('POST/bookings', () => {
  it('create a booking', (done) => {
    const name = 'John Doe';

    request(app)
      .post('/bookings')
      // supertest automatically converts this to JSON
      .send({ name })
      .expect(200)
      .expect((res) => {
        expect(res.body.name).toBe(name);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Bookings.find({ name }).then((bookings) => {
          expect(bookings.length).toBe(1);
          expect(bookings[0].name).toBe(name);
          done();
        }).catch(e => done(e));
      });
  });

  it('should not post booking with invalid data', (done) => {
    request(app)
      .post('/bookings')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Bookings.find({}).then((bookings) => {
          expect(bookings.length).toBe(2);
          done();
        }).catch(e => done(e));
      });
  });
});

describe('GET/bookings', () => {
  it('Get the list of bookings', (done) => {
    request(app)
      .get('/bookings')
      .expect(200)
      .expect((res) => {
        expect(res.body.booking.length).toBe(2);
      })
      .end(done);
  });
});

describe('DELETE/bookings', () => {
  it('Save booking to /history', (done) => {
    request(app)
      .post('/history')
      .send(testBookings[0])
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        History.find().then((booking) => {
          done();
        })
          .catch(e => done(e));
      });
  });

  it('Remove booking from /bookings', (done) => {
    const hexId = testBookings[0]._id.toHexString();

    request(app)
      .delete(`/bookings/${hexId}`)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Bookings.findById(hexId).then((booking) => {
          expect(booking).toBeFalsy();
          done();
        })
          .catch(e => done(e));
      });
  });

  it('Return a 404 if object ID is invalid', (done) => {
    request(app)
      .delete('/bookings/1')
      .expect(404)
      .end(done);
  });
});
