const express = require("express");
const cookieParser = require("cookie-parser");

const cors = require("cors");
const bodyParser = require("body-parser");
const pool = require("./config/db"); // database ko import krha hai
const studentsRoutes = require("./routers/studentRoutes");
const authRouter = require("./routers/AuthRouters");
const feedbackRoutes = require('./routers/FeedbackRoutes');

const app = express();
const PORT = 3100;

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use("/api/students", studentsRoutes);
app.use("/api/auth", authRouter);
app.use('/api/feedbacks', feedbackRoutes);

app.use(async (req, res, next) => {
  try {
    await pool.getConnection();
    next();
  } catch (error) {
    console.error("Database connection failed:", error);
    return res.status(500).json({ message: "Database connection error" });
  }
});

app.listen(PORT, () => console.log(`Server Running on localhost:${PORT}`));
