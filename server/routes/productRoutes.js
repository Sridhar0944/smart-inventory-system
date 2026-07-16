const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
} = require("../controllers/productController");

const upload = require("../middleware/upload")


// Get all products
router.get(
    "/",
    authMiddleware,
    getProducts
);


// Get single product
router.get(
    "/:id",
    authMiddleware,
    getProduct
);


// Create product
router.post(
    "/",
    authMiddleware,
    upload.single("image"),
    createProduct
);


// Update product
router.put(
    "/:id",
    authMiddleware,
    upload.single("image"),
    updateProduct
);


// Delete product
router.delete(
    "/:id",
    authMiddleware,
    deleteProduct
);


module.exports = router;