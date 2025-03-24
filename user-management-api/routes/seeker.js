const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// Apply for a job
router.post('/apply/:jobId', async (req, res) => {
  const { jobId } = req.params;
  const seekerId = req.user.id; // Assume user is a seeker

  try {
    const result = await pool.query(
      'INSERT INTO applications (seeker_id, job_id) VALUES ($1, $2) RETURNING *',
      [seekerId, jobId]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
