const db = require("../config/db");

exports.findByEmail = (email, callback) => {
  db.query("SELECT * FROM users WHERE email = ?", [email], callback);
};

exports.createUser = (user, callback) => {

  const sql = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";

  db.query(sql, [user.name, user.email, user.password, user.role], callback);
};