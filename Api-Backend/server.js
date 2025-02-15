const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config(); // database ko import krha hai
const { GoogleGenerativeAI } = require('@google/generative-ai')

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

// serve the 'uploads' folder as a static directory
app.use('/uploads', express.static('uploads'))

// API Routes
app.use("/api/auth", authRouter);
app.use("/api/students", studentsRoutes);
app.use("/api/feedbacks", feedbackRoutes);



// Initialize Gemini AI SDK
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY); // Use API key from .env file

// Create a new route for Gemini AI
app.post("/api/gemini/generate-content", async (req, res, next) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    res.json({ text: result.response.text() });
  } catch (error) {
    console.error("Error interacting with Gemini AI:", error);
    res.status(500).json({ error: "Something went wrong with the Gemini API request" });
  }
});


// Global Error Handler Middleware
app.use((err, req, res, next) => {
  console.error("Global Error:", err);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});

// Start Server
app.listen(PORT, () => console.log(`Server Running on localhost:${PORT}`));
