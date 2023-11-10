//mongodb logic integration
const { MongoClient } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'
// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
// Database Name
const dbName = 'admin';
async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to Mongo db server desdel request del programa/navegador');

  //data manipulator
  const db = client.db(dbName);
  return db;
  next();

}




module.exports = main;