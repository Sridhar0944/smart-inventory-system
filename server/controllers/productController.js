const Product = require("../models/productModel");

const {generateQRCode} = require("../utils/codeGenerator")
// Get all products
const getProducts = (req, res) => {

  Product.getAllProducts((err, results) => {

    if (err) {

      console.log("PRODUCT DATABASE ERROR:", err);

      return res.status(500).json({
        success: false,
        message: err.message,
      });

    }


    res.status(200).json({
      success: true,
      data: results,
    });

  });

};

// Get product by ID
const getProduct = (req, res) => {
  const { id } = req.params;

  Product.getProductById(id, (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch product",
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      data: results[0],
    });
  });
};

// Add product
const createProduct = async (req, res) => {
  try {
    const barcode = "PROD" + Date.now();
    const qr = await generateQRCode(barcode);

    // Uploaded image filename
    const image = req.file ? req.file.filename : null;

    const productData = {
      ...req.body,
      barcode: barcode,
      qr_code: qr,
      image: image,
    };

    Product.addProduct(productData, (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }

      res.status(201).json({
        success: true,
        message: "Product Added",
        productId: result.insertId,
        barcode: barcode,
        qr_code: qr,
        image: image,
      });
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update product
const updateProduct = (req, res) => {
  const { id } = req.params;

  const image = req.file ? req.file.filename : req.body.image;

  const productData = {
    ...req.body,
    image: image,
  };

  Product.updateProduct(id, productData, (err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Failed to update product",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
    });
  });
};

// Delete product
const deleteProduct = (req, res) => {
  const { id } = req.params;

  Product.deleteProduct(id, (err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Failed to delete product",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  });
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};