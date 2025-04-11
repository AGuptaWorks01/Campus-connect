const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config(); // database ko import krha hai
// const { GoogleGenerativeAI } = require('@google/generative-ai')

const studentsRoutes = require("./routers/Student.Route");
const authRouter = require("./routers/Auth.Route");
const feedbackRoutes = require("./routers/Feedback.Route");
const ai = require('./routers/Ai.Route')

const app = express();

// Middleware Setup
app.use(cookieParser());
app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());
app.use(bodyParser.json());

// serve the 'uploads' folder as a static directory
app.use('/uploads', express.static('uploads'))

// API Routes
app.use("/api/auth", authRouter);
app.use("/api/students", studentsRoutes);
app.use("/api/feedbacks", feedbackRoutes);
app.use("/api/gemini", ai);

module.exports = app;
