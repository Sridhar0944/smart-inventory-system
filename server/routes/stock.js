const express = require("express");
const router = express.Router();
const db = require("../config/db");

// ======================
// Stock IN
// ======================

router.post("/in", (req, res) => {
  const { product_id, quantity, remarks } = req.body;

  if (!product_id || !quantity) {
    return res.status(400).json({
      success: false,
      message: "Product ID and Quantity are required",
    });
  }

  // Check product exists
  const checkSql = "SELECT * FROM products WHERE id = ?";

  db.query(checkSql, [product_id], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Insert transaction
    const transactionSql = `
      INSERT INTO stock_transactions
      (product_id, quantity, remarks, type)
      VALUES (?, ?, ?, ?)
    `;

    db.query(
      transactionSql,
      [product_id, quantity, remarks || "", "in"],
      (err) => {
        if (err) {
          return res.status(500).json(err);
        }

        // Update stock quantity
        const updateSql = `
          UPDATE products
          SET quantity = quantity + ?
          WHERE id = ?
        `;

        db.query(updateSql, [quantity, product_id], (err2) => {
          if (err2) {
            return res.status(500).json(err2);
          }

          res.json({
            success: true,
            message: "Stock added successfully",
          });
        });
      }
    );
  });
});

// ======================
// Stock OUT
// ======================

router.post("/out", (req, res) => {
  const { product_id, quantity, remarks } = req.body;

  if (!product_id || !quantity) {
    return res.status(400).json({
      success: false,
      message: "Product ID and Quantity are required",
    });
  }

  const checkSql = `
    SELECT quantity
    FROM products
    WHERE id = ?
  `;

  db.query(checkSql, [product_id], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (result[0].quantity < quantity) {
      return res.status(400).json({
        success: false,
        message: "Insufficient stock",
      });
    }

    const transactionSql = `
      INSERT INTO stock_transactions
      (product_id, quantity, remarks, type)
      VALUES (?, ?, ?, ?)
    `;

    db.query(
      transactionSql,
      [product_id, quantity, remarks || "", "out"],
      (err) => {
        if (err) {
          return res.status(500).json(err);
        }

        const updateSql = `
          UPDATE products
          SET quantity = quantity - ?
          WHERE id = ?
        `;

        db.query(updateSql, [quantity, product_id], (err2) => {
          if (err2) {
            return res.status(500).json(err2);
          }

          res.json({
            success: true,
            message: "Stock removed successfully",
          });
        });
      }
    );
  });
});

// ======================
// Transaction History
// ======================

router.get("/history", (req, res) => {
  const sql = `
    SELECT
      st.id,
      p.product_name,
      st.type,
      st.quantity,
      st.remarks,
      st.created_at
    FROM stock_transactions st
    JOIN products p
      ON st.product_id = p.id
    ORDER BY st.created_at DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(results);
  });
});

module.exports = router;