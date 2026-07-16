const express = require("express")
const router = express.Router()

const authMiddleware = require("../middleware/authMiddleware")
const {getLowStockProducts} = require("../controllers/lowStockController")

router.get("/",authMiddleware,getLowStockProducts)

module.exports = router