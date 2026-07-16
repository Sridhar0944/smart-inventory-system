const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./config/db");

// Routes
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const supplierRoutes = require("./routes/supplierRoutes");
const authRoutes = require("./routes/authRoutes");
const stockRoutes = require("./routes/stock");
const dashboardRoutes = require("./routes/dashboardRoutes");
const stockInRoutes = require("./routes/stockIn");
const stockOutRoutes = require("./routes/stockOut");
const reportRoutes = require("./routes/reportRoutes")
const userRoutes = require("./routes/userRoutes")
const lowStockRoutes = require("./routes/lowStockRoute");
const notificationRoutes = require("./routes/notificationRoute")
const path = require("path");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.send("Smart Inventory System API is Running...");
});

// API Routes
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/stock", stockRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/stock-in", stockInRoutes);
app.use("/api/stock-out", stockOutRoutes);
app.use("/api/reports",reportRoutes)
app.use("/api/users", userRoutes);
app.use("/api/low-stock", lowStockRoutes);
app.use("/api/notifications", notificationRoutes)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});