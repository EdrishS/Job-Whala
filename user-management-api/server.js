const express = require("express");
require("dotenv").config();
const pool = require("./config/db"); // for PostgreSQL connection
const authRoutes = require('./routes/auth');
const employerRoutes = require('./routes/employer');
const seekerRoutes = require('./routes/seeker');
// const userRoutes = require("./routes/user.routes");
const app = express();
// const port = process.env.PORT || 5433;

app.use(express.json());
// Authentication Routes
app.use('/api/auth', authRoutes);
app.use('/api/employer', employerRoutes); // Employer Routes
app.use('/api/seeker', seekerRoutes); // Job Seeker Routes

// Example of a simple route to test DB connection
app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.send(`Connected to DB: ${result.rows[0].now}`);
  } catch (err) {
    res.status(500).send("Database connection error");
  }
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.use((err, req, res, next) => {
    console.error("Error occurred:", err);  // Logs all errors
    res.status(500).json({ message: "Internal server error" });
  });

// app.listen(port, () => console.log(`Server running on port ${port}`));
