// models/userModel.js
const db = require("../config/db");
exports.createUser = async (username, email, password, role) => {
  return db.execute("INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)", [username, email, password, role]);
};
exports.getUserByEmail = async (email) => {
  const [user] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);
  return user[0];
};
