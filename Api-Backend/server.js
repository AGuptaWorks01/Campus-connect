const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
const pool = require("./config/db"); // database ko import krha hai
const studentsRoutes = require("./routers/studentRoutes");
const authRouter = require("./routers/AuthRouters");
const feedbackRoutes = require("./routers/FeedbackRoutes");

const app = express();
const PORT = 3100;

// Middleware Setup
app.use(cookieParser());
app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());
app.use(bodyParser.json());


// Database Connection Middleware
app.use(async (req, res, next) => {
  try {
    await pool.getConnection();
    next();
  } catch (error) {
    console.error("Database connection failed:", error);
    return res.status(500).json({ message: "Database connection error" });
  }
});

// API Routes
app.use("/api/auth", authRouter);
app.use("/api/students", studentsRoutes);
app.use("/api/feedbacks", feedbackRoutes);

// Global Error Handler Middleware
app.use((err, req, res, next) => {
  console.error("Global Error:", err);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});

// Start Server
app.listen(PORT, () => console.log(`Server Running on localhost:${PORT}`));
