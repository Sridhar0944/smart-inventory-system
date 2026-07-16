const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Get all stock in records
router.get("/", (req, res) => {
  const sql = `
    SELECT stock_in.*, products.product_name
    FROM stock_in
    JOIN products ON stock_in.product_id = products.id
    ORDER BY stock_in.id DESC
  `;

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);

    res.json(result);
  });
});

// Add Stock
router.post("/", (req, res) => {
  const { product_id, quantity, supplier, received_date } = req.body;

  const insertSql = `
    INSERT INTO stock_in
    (product_id, quantity, supplier, received_date)
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    insertSql,
    [product_id, quantity, supplier, received_date],
    (err) => {
      if (err) return res.status(500).json(err);

      const updateSql = `
        UPDATE products
        SET quantity = quantity + ?
        WHERE id = ?
      `;

      db.query(updateSql, [quantity, product_id], (err2) => {
        if (err2) return res.status(500).json(err2);

        res.json({
          success: true,
          message: "Stock added successfully",
        });
      });
    }
  );
});

module.exports = router;