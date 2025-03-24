const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const pool = require('../config/db');
const router = express.Router();

const SECRET_KEY = 'your-secret-key'; // Change this to a strong secret

// Sample user for demonstration (No database usage)
// Sample user for demonstration (No database usage)
const sampleUser = {
  id: 1,
  email: 'employer@example.com',  // Update this to match your test email
  name: 'Employer Name',
  role: 'employer',
  password: bcrypt.hashSync('password123', 10), // Encrypted password
};


// Generate JWT token
const generateToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
    expiresIn: '1h', // Token expiry (1 hour)
  });
};

// Login Route (Authenticate and issue JWT)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Validate email and password
  if (email !== sampleUser.email || !bcrypt.compareSync(password, sampleUser.password)) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Generate and send JWT token
  const token = generateToken(sampleUser);
  res.status(200).json({ token });
});

// Protected Route (Example)
router.get('/profile', verifyToken, (req, res) => {
  res.status(200).json({ message: 'Welcome to your profile', user: req.user });
});

// Middleware to Verify JWT
function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(403).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    req.user = decoded; // Attach decoded user to request
    next();
  });
}

module.exports = router;
