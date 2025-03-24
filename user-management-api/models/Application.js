const { Pool } = require('pg');
const pool = require('../config/db');

const createApplicationTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS applications (
      id SERIAL PRIMARY KEY,
      seeker_id INT REFERENCES users(id) ON DELETE CASCADE,
      job_id INT REFERENCES jobs(id) ON DELETE CASCADE,
      status VARCHAR(50) CHECK(status IN ('applied', 'reviewed', 'rejected', 'interviewed')) DEFAULT 'applied',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
  await pool.query(query);
};

module.exports = { createApplicationTable };
