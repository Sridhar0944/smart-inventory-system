const express = require("express")
const router = express.Router()

const{
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
} = require("../controllers/categoryController")

//Get all cetegories
router.get("/",getCategories)

// Get category by ID
router.get("/:id",getCategory)

//Create Cetegory
router.post("/",createCategory)

//Update category
router.put("/:id",updateCategory)

//Delete Category
router.delete("/:id",deleteCategory)

module.exports = router