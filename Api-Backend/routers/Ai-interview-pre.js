const express = require("express");
const router = express.Router();
require('dotenv').config();  // Load environment variables
const { GoogleGenerativeAI } = require('@google/generative-ai')



// Initialize Gemini AI SDK
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY); // Use API key from .env file

// Create a new route for Gemini AI
router.post("/generate-content", async (req, res, next) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: "Prompt is required" });
    }

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(prompt);
        // Check for valid response and send it back
        if (result && result.response && result.response.text) {
            res.json({ text: result.response.text() });
        } else {
            throw new Error("Invalid response structure from Gemini AI");
        }

    } catch (error) {
        console.error("Error interacting with Gemini AI:", error);
        res.status(500).json({ error: "Something went wrong with the Gemini API request" });
    }
});



module.exports = router;