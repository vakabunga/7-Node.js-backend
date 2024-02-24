const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017/';
const client = new MongoClient(url);

const dbName = 'homework';

let db;

async function main() {
  await client.connect();
  db = client.db(dbName);

  return 'done.';
}

function getDb() {
  return db;
}

module.exports = {
  connectDb: main,
  getDb
}
