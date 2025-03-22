// controllers/authController.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db");
exports.register = async (req, res) => {
  const { username, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  await db.execute("INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)", [username, email, hashedPassword, role]);
  res.json({ message: "User registered successfully" });
};
exports.login = async (req, res) => {
  const { email, password } = req.body;
  const [user] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);
  if (!user.length || !(await bcrypt.compare(password, user[0].password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign({ id: user[0].id, role: user[0].role }, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
};