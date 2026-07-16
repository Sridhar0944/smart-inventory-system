const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Get all stock out records
router.get("/", (req, res) => {
  const sql = `
    SELECT
      stock_out.*,
      products.product_name
    FROM stock_out
    JOIN products
      ON stock_out.product_id = products.id
    ORDER BY stock_out.id DESC
  `;

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);

    res.json(result);
  });
});

// Add Stock Out
router.post("/", (req, res) => {
  const {
    product_id,
    quantity,
    customer,
    issued_date,
  } = req.body;

  db.query(
    "SELECT quantity FROM products WHERE id = ?",
    [product_id],
    (err, result) => {
      if (err) return res.status(500).json(err);

      if (result.length === 0) {
        return res.status(404).json({
          message: "Product not found",
        });
      }

      const availableQty = result[0].quantity;

      if (availableQty < quantity) {
        return res.status(400).json({
          message: "Insufficient stock",
        });
      }

      const insertSql = `
        INSERT INTO stock_out
        (product_id, quantity, customer, issued_date)
        VALUES (?, ?, ?, ?)
      `;

      db.query(
        insertSql,
        [product_id, quantity, customer, issued_date],
        (err) => {
          if (err) return res.status(500).json(err);

          db.query(
            `
            UPDATE products
            SET quantity = quantity - ?
            WHERE id = ?
            `,
            [quantity, product_id],
            (err) => {
              if (err) return res.status(500).json(err);

              res.json({
                success: true,
                message: "Stock removed successfully",
              });
            }
          );
        }
      );
    }
  );
});

module.exports = router;