const Supplier = require("../models/supplierModel");

// Get all suppliers
const getSuppliers = (req, res) => {
  Supplier.getAllSuppliers((err, results) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Failed to fetch suppliers" });
    }

    res.json({
      success: true,
      data: results,
    });
  });
};

// Get supplier by ID
const getSupplier = (req, res) => {
  Supplier.getSupplierById(req.params.id, (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Failed to fetch supplier" });
    }

    if (results.length === 0) {
      return res.status(404).json({ success: false, message: "Supplier not found" });
    }

    res.json({
      success: true,
      data: results[0],
    });
  });
};

// Create supplier
const createSupplier = (req, res) => {
  Supplier.addSupplier(req.body, (err, result) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Failed to add supplier" });
    }

    res.status(201).json({
      success: true,
      message: "Supplier added successfully",
      supplierId: result.insertId,
    });
  });
};

// Update supplier
const updateSupplier = (req, res) => {
  Supplier.updateSupplier(req.params.id, req.body, (err) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Failed to update supplier" });
    }

    res.json({
      success: true,
      message: "Supplier updated successfully",
    });
  });
};

// Delete supplier
const deleteSupplier = (req, res) => {
  Supplier.deleteSupplier(req.params.id, (err) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Failed to delete supplier" });
    }

    res.json({
      success: true,
      message: "Supplier deleted successfully",
    });
  });
};

module.exports = {
  getSuppliers,
  getSupplier,
  createSupplier,
  updateSupplier,
  deleteSupplier,
};