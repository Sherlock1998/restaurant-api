const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {bookings} = require('./../models/bookings');

beforeEach((done)=>{
  bookings.remove({}).then(()=>done());
})

describe('POST/bookings', ()=>{
  it('create a booking', ()=>{
    const name = 'John Doe';

    request(app)
      .post('/bookings')
      //supertest automatically converts this to JSON
      .send({})
      .expect(200)
      .expect((res)=>{
        expect(res.body.name).toBe(name);
      })
      .end((err,res)=>{
        if(err) {
          return done(err);
        }
        bookings.find().then((bookings)=>{
          expect(bookings.length).toBe(1)
          expect(bookings[0].name).toBe(name)
          done();
        }).catch((e)=> done(e))
      })
  })
})
