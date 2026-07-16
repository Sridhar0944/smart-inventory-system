const express = require("express");
const router = express.Router();
const db = require("../config/db");
const bcrypt = require("bcrypt")

// =============================
// Get All Users
// =============================
router.get("/", (req, res) => {
  const sql = `
    SELECT id, name, email, role
    FROM users
    ORDER BY id DESC
  `;

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);
  });
});

// =============================
// Get Profile (Temporary)
// =============================
router.get("/profile", (req, res) => {
  const sql = `
    SELECT id, name, email, role
    FROM users
    ORDER BY id ASC
    LIMIT 1
  `;

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Database Error",
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json(result[0]);
  });
});

// =============================
// Change Password
// =============================
router.put("/change-password", (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  const getUserSql = `
    SELECT *
    FROM users
    ORDER BY id ASC
    LIMIT 1
  `;

  db.query(getUserSql, async (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    if (result.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const user = result[0];

    // Compare current password
    const isMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Current Password is Incorrect",
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(
      newPassword,
      10
    );

    const updateSql = `
      UPDATE users
      SET password = ?
      WHERE id = ?
    `;

    db.query(
      updateSql,
      [hashedPassword, user.id],
      (err) => {
        if (err) {
          return res.status(500).json(err);
        }

        res.json({
          message: "Password Updated Successfully",
        });
      }
    );
  });
});

module.exports = router;