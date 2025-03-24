const { Pool } = require('pg');

// Create a new pool instance for PostgreSQL connection
const pool = new Pool({
  user: 'postgres',  // your PostgreSQL username
  host: 'localhost', // your PostgreSQL host (localhost in most cases)
  database: 'user-management', // the name of your PostgreSQL database
  password: 'password',  // your PostgreSQL password
  port: 5432,  // default PostgreSQL port
});

// Test connection
pool.connect()
  .then(() => {
    console.log('Connected to PostgreSQL');
  })
  .catch(err => {
    console.error('Error connecting to PostgreSQL:', err.stack);
  });

module.exports = pool;
