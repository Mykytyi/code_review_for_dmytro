const { Client } = require('pg');
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});


client.connect();

process.on('exit', () => {
  client.end();
});

module.exports = client;