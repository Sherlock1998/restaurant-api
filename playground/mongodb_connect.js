const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/RestaurantAPI', (err,client)=>{
  if(err) {
    return console.log('Unable to connect to MongDB',err);
  }
  console.log('Connected to MongoDB');
  const db = client.db('Bookings');

  db.collection('Bookings').insertOne({
    name:'boke',
    contact_number: '0102438625',
    seats: '2',
    notes: 'just a random note'
  }, (err,result)=>{
    if(err) {
      return console.log('Cannot write to db',err);
    }
    console.log(JSON.stringify(result.ops,undefined,2));
  })
  db.collection('Bookings').insertOne({
    name:'Doe',
    contact_number: '0102438625',
    seats: '2',
    notes: 'just a random note'
  }, (err,result)=>{
    if(err) {
      return console.log('Cannot write to db',err);
    }
    console.log(JSON.stringify(result.ops,undefined,2));
  })
  db.collection('Bookings').insertOne({
    name:'John',
    contact_number: '0102438625',
    seats: '2',
    notes: 'just a random note'
  }, (err,result)=>{
    if(err) {
      return console.log('Cannot write to db',err);
    }
    console.log(JSON.stringify(result.ops,undefined,2));
  })
  // client.close();
})
