const Category = require("../models/categoryModel");

// Get all categories
const getCategories = (req, res) => {
  Category.getAllCategories((err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch categories",
      });
    }

    res.status(200).json({
      success: true,
      data: results,
    });
  });
};

// Get category by ID
const getCategory = (req, res) => {
  const { id } = req.params;

  Category.getCategoryById(id, (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch category",
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).json({
      success: true,
      data: results[0],
    });
  });
};

// Create category
const createCategory = (req, res) => {
  Category.addCategory(req.body, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Failed to add category",
      });
    }

    res.status(201).json({
      success: true,
      message: "Category added successfully",
      categoryId: result.insertId,
    });
  });
};

// Update category
const updateCategory = (req, res) => {
  const { id } = req.params;

  Category.updateCategory(id, req.body, (err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Failed to update category",
      });
    }

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
    });
  });
};

// Delete category
const deleteCategory = (req, res) => {
  const { id } = req.params;

  Category.deleteCategory(id, (err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Failed to delete category",
      });
    }

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  });
};

module.exports = {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};