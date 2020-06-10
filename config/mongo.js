const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;                 // client
const connectionStr = 'mongodb://localhost:27017';       // string with port where mongoDB runs
const client = new MongoClient(connectionStr);           // this strinh is passed to MongoClient and it's making instance of MongoClient 


async function dbQueries(people) {
  await people.insertOne({ 'name': 'Pesho' });
console.log("INSERTED ONE!  !  !  !!!");
  const result = await people.find({ name: 'Pesho' }).toArray();
  console.log("Async result: ", result);
}



client.connect(function (err) {
  if (err) console.error("Database Error: ", err);
  const db = client.db('testdb');              //use
  const people = db.collection('people');      //


  dbQueries(people);
});
