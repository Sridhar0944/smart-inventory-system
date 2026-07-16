const db = require("../config/db");

const getDashboardStats = (req, res) => {
    const sql = `
        SELECT
            (SELECT COUNT(*) FROM products) AS totalProducts,
            (SELECT COUNT(*) FROM categories) AS totalCategories,
            (SELECT COUNT(*) FROM suppliers) AS totalSuppliers,
            (SELECT COUNT(*) FROM products WHERE quantity <= minimum_stock AND quantity > 0) AS lowStock,
            (SELECT COUNT(*) FROM products WHERE quantity = 0) AS outOfStock
    `;

    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        res.json(result[0]);
    });
};

module.exports = {
    getDashboardStats,
};