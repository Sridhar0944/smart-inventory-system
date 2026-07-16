const db = require("../config/db");

// Get all suppliers
const getAllSuppliers = (callback) => {
  db.query("SELECT * FROM suppliers", callback);
};

// Get supplier by ID
const getSupplierById = (id, callback) => {
  db.query("SELECT * FROM suppliers WHERE id = ?", [id], callback);
};

// Add supplier
const addSupplier = (supplier, callback) => {
  const {
    supplier_name,
    contact_person,
    phone,
    email,
    address,
  } = supplier;

  const sql = `
    INSERT INTO suppliers
    (supplier_name, contact_person, phone, email, address)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      supplier_name,
      contact_person,
      phone,
      email,
      address,
    ],
    callback
  );
};

// Update supplier
const updateSupplier = (id, supplier, callback) => {
  const {
    supplier_name,
    contact_person,
    phone,
    email,
    address,
  } = supplier;

  const sql = `
    UPDATE suppliers
    SET
      supplier_name = ?,
      contact_person = ?,
      phone = ?,
      email = ?,
      address = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [
      supplier_name,
      contact_person,
      phone,
      email,
      address,
      id,
    ],
    callback
  );
};

// Delete supplier
const deleteSupplier = (id, callback) => {
  db.query("DELETE FROM suppliers WHERE id = ?", [id], callback);
};

module.exports = {
  getAllSuppliers,
  getSupplierById,
  addSupplier,
  updateSupplier,
  deleteSupplier,
};