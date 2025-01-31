const express = require("express");
const cookieParser = require("cookie-parser");

const cors = require("cors");
const bodyParser = require("body-parser");
const pool = require("./config/db"); // database ko import krha hai
const studentsRouter = require("./routers/studentRoutes");
const authRouter = require("./routers/AuthRouters");
const app = express();
const port = 3000;

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use("/api/students", studentsRouter);
app.use("/api/auth", authRouter);

app.use(async (req, res, next) => {
  try {
    await pool.getConnection();
    next();
  } catch (error) {
    console.error("Database connection failed:", error);
    return res.status(500).json({ message: "Database connection error" });
  }
});

app.listen(port, () => console.log(`Server Running on localhost:${port}`));
