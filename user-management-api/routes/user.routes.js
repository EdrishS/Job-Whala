const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const verifyToken = require('../middlewares/authMiddleware'); // Import middleware


// Create a user (protected)
router.post('/', verifyToken, async (req, res) => {
  const { name, email } = req.body;
  try {
    const result = await pool.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [name, email]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// 🟢 Create a User
// router.post('/', async (req, res) => {
//   console.log('Request received:', req.body);
//   const { name, email } = req.body;
  
//   try {
//     const result = await pool.query(
//       'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
//       [name, email]
//     );
//     console.log('✅ User created:', result.rows[0]);
//     res.status(201).json(result.rows[0]);
//   } catch (err) {
//     console.error('❌ Error creating user:', err);
//     res.status(500).json({ error: err.message });
//   }
// });

// // 🔵 Get All Users
// router.get('/', async (req, res) => {
//   try {
//     const result = await pool.query('SELECT * FROM users ORDER BY id');
//     res.status(200).json(result.rows);
//   } catch (err) {
//     console.error('❌ Error fetching users:', err);
//     res.status(500).json({ error: err.message });
//   }
// });

// // 🟡 Get a User by ID
// router.get('/:id', async (req, res) => {
//   const { id } = req.params;
  
//   try {
//     const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
//     if (result.rows.length === 0) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     res.status(200).json(result.rows[0]);
//   } catch (err) {
//     console.error('❌ Error fetching user by ID:', err);
//     res.status(500).json({ error: err.message });
//   }
// });

// // 🟠 Update a User
// router.put('/:id', async (req, res) => {
//   const { id } = req.params;
//   const { name, email } = req.body;
  
//   try {
//     const result = await pool.query(
//       'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
//       [name, email, id]
//     );
//     if (result.rows.length === 0) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     res.status(200).json(result.rows[0]);
//   } catch (err) {
//     console.error('❌ Error updating user:', err);
//     res.status(500).json({ error: err.message });
//   }
// });

// // 🔴 Delete a User
// router.delete('/:id', async (req, res) => {
//   const { id } = req.params;
  
//   try {
//     const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
//     if (result.rows.length === 0) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     res.status(200).json({ message: 'User deleted successfully' });
//   } catch (err) {
//     console.error('❌ Error deleting user:', err);
//     res.status(500).json({ error: err.message });
//   }
// });

module.exports = router;
