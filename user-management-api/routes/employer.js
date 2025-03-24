const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// Middleware to verify if user is an employer
const verifyEmployer = (req, res, next) => {
  if (req.user.role !== 'employer') {
    return res.status(403).json({ message: 'Forbidden: Employer only access' });
  }
  next();
};

// Post a job opening
router.post('/jobs', verifyEmployer, async (req, res) => {
  const { title, description } = req.body;
  const employerId = req.user.id;
  
  try {
    const result = await pool.query(
      'INSERT INTO jobs (title, description, employer_id) VALUES ($1, $2, $3) RETURNING *',
      [title, description, employerId]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Review job applications
router.get('/applications/:jobId', verifyEmployer, async (req, res) => {
  const { jobId } = req.params;
  try {
    const result = await pool.query('SELECT * FROM applications WHERE job_id = $1', [jobId]);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Reject a candidate
router.put('/applications/reject/:applicationId', verifyEmployer, async (req, res) => {
  const { applicationId } = req.params;
  try {
    const result = await pool.query(
      'UPDATE applications SET status = $1 WHERE id = $2 RETURNING *',
      ['rejected', applicationId]
    );
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Schedule an interview
router.post('/interviews/:applicationId', verifyEmployer, async (req, res) => {
  const { applicationId } = req.params;
  const { interviewDate } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO interviews (application_id, interview_date) VALUES ($1, $2) RETURNING *',
      [applicationId, interviewDate]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
