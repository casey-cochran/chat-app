import 'dotenv/config';

import {MongoClient} from 'mongodb';
import assert from 'node:assert';

// Connection URL
const url = process.env.MONGO_URI;
console.log(url, 'wahts url here')

// Database Name
const dbName = 'webapp';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);

  client.close();
});
