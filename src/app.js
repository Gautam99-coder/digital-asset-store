// src/app.js
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes"); // <-- 1. Import order routes

const app = express();

app.use(express.json());

app.use(cors({ 
  origin: 'http://localhost:5173', 
  credentials: true 
}));

app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes); // <-- 2. Mount order routes

app.get("/", (req, res) => {
    res.send("Digital Asset Store Api is running...");
});

module.exports = app;