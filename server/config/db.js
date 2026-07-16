const mysql = require("mysql2");
require("dotenv").config();

console.log("DB Config:");
console.log({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD ? "******" : "NOT FOUND",
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password:"Sridhar#0944",
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

db.connect((err) => {
  if (err) {
    console.error("❌ Database Connection Failed:", err.message);
    return;
  }

  console.log("✅ MySQL Connected Successfully");
});

module.exports = db;