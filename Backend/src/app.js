// src/app.js
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const webhookRoutes = require("./routes/webhookRoutes"); // <-- 1. Import webhook routes

const app = express();

app.use(cors({ 
  origin: 'http://localhost:5173', 
  credentials: true 
}));
app.use(cookieParser());

// 2. Mount Webhook route BEFORE express.json()
app.use("/api/webhook", webhookRoutes);

// 3. THIS MUST STAY BELOW THE WEBHOOK
app.use(express.json());

// 4. Mount other routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => {
    res.send("Digital Asset Store Api is running...");
});

module.exports = app;