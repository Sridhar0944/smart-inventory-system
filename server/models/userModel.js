const db = require("../config/db");

const findUserByEmail = (email, callback) => {
  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], callback);
};

const createUser = (user, callback) => {
  const sql = `
    INSERT INTO users (name, email, password, role)
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    sql,
    [user.name, user.email, user.password, user.role],
    callback
  );
};

module.exports = {
  findUserByEmail,
  createUser,
};