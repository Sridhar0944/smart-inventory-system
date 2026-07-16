const db = require("../config/db");

// Get all products
const getAllProducts = (callback) => {
  const sql = `
SELECT
    products.id,
    products.product_name,
    categories.category_name,
    suppliers.supplier_name,
    products.price,
    products.quantity,
    products.minimum_stock,
    products.image,
    products.barcode,
    products.qr_code
FROM products
LEFT JOIN categories
    ON products.category_id = categories.id
LEFT JOIN suppliers
    ON products.supplier_id = suppliers.id
ORDER BY products.id ASC;
`;

  db.query(sql, callback);
};

// Get product by ID
const getProductById = (id, callback) => {
  db.query("SELECT * FROM products WHERE id = ?", [id], callback);
};

// Get Low Stock Products

const getLowStockProducts = (callback) => {
  const sql = `
    SELECT
      products.id,
      products.product_name,
      categories.category_name,
      suppliers.supplier_name,
      products.quantity,
      products.minimum_stock
    FROM products
    LEFT JOIN categories
      ON products.category_id = categories.id
    LEFT JOIN suppliers
      ON products.supplier_id = suppliers.id
    WHERE products.quantity <= products.minimum_stock
      AND products.quantity > 0
    ORDER BY products.quantity ASC
  `;

  db.query(sql, callback);
};

// Add product
const addProduct = (product, callback) => {
  const {
    product_name,
    category_id,
    supplier_id,
    price,
    quantity,
    minimum_stock,
    barcode,
    qr_code,
    image
  } = product;

  const sql = `
    INSERT INTO products
    (product_name, category_id, supplier_id, price, quantity, minimum_stock,barcode,qr_code,image)
    VALUES (?, ?, ?, ?, ?, ?,?,?,?)
  `;

  db.query(
    sql,
    [
      product_name,
      category_id,
      supplier_id,
      price,
      quantity,
      minimum_stock,
      barcode,
      qr_code,
      image
    ],
    callback
  );
};

// Update product
const updateProduct = (id, product, callback) => {
  const {
    product_name,
    category_id,
    supplier_id,
    price,
    quantity,
    minimum_stock,
    image,
  } = product;

  const sql = `
    UPDATE products
    SET
      product_name=?,
      category_id=?,
      supplier_id=?,
      price=?,
      quantity=?,
      minimum_stock=?,
      image=?
    WHERE id=?
  `;

  db.query(
    sql,
    [
      product_name,
      category_id,
      supplier_id,
      price,
      quantity,
      minimum_stock,
      image,
      id,
    ],
    callback
  );
};

// Delete product
const deleteProduct = (id, callback) => {
  db.query("DELETE FROM products WHERE id=?", [id], callback);
};

module.exports = {
  getAllProducts,
  getProductById,
  getLowStockProducts,
  addProduct,
  updateProduct,
  deleteProduct,
};