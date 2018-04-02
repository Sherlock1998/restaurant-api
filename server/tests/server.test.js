const expect = require('expect');
const request = require('supertest');

const { app } = require('./../server');
const { Bookings } = require('./../models/bookings');
const { History } = require('./../models/history');

const testBooking = [{
  name: 'test 1',
  contactNumber: 1234,
}, {
  name: 'test 2',
  contactNumber: 1234,
}];

beforeEach((done) => {
  Bookings.remove({}).then(() => Bookings.insertMany(testBooking)).then(() => done());
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
    const hexId = testBooking[0]._id.toHexString();


    request(app)
      .delete(`/bookings/${hexId}`)
      .expect(200);
  });

  // it('Remove a booking', (done) => {

  // });

  // it('Return a 404 if booking is not found', (done) => {

  // });
});
