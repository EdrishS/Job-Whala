const { Pool } = require('pg');
const pool = require('../config/db');

const createInterviewTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS interviews (
      id SERIAL PRIMARY KEY,
      application_id INT REFERENCES applications(id) ON DELETE CASCADE,
      interview_date TIMESTAMP,
      status VARCHAR(50) CHECK(status IN ('scheduled', 'completed', 'canceled')) DEFAULT 'scheduled',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
  await pool.query(query);
};

module.exports = { createInterviewTable };
