const db = require("../config/db");

const getNotifications = (req, res) => {
  const query = `
    SELECT
      (SELECT COUNT(*) FROM products WHERE quantity <= minimum_stock AND quantity > 0) AS lowStock,
      (SELECT COUNT(*) FROM products WHERE quantity = 0) AS outOfStock;
  `;

  db.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Database Error",
        error: err,
      });
    }

    res.json({
      success: true,
      data: result[0],
    });
  });
};

module.exports = {
  getNotifications,
};