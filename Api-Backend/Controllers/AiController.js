const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const pdfParse = require("pdf-parse");
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();  // Load environment variables
const router = express.Router();


// Initialize Gemini AI SDK
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY); // Use API key from .env file

// Generate content (AI review and suggestions) based on prompt
exports.generateContent = async (req, res) => {
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
};

// Upload and process the resume PDF
exports.uploadResume = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }

    try {
        // Read the uploaded PDF file and extract text
        const dataBuffer = fs.readFileSync(req.file.path);
        const pdfData = await pdfParse(dataBuffer);
        const resumeText = pdfData.text;

        // If no text found in the resume
        if (!resumeText.trim()) {
            return res.status(400).json({ error: "No text found in the uploaded PDF" });
        }

        // Send the resume text to Gemini AI for review
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(`Please review the following resume:\n\n${resumeText}`);

        // Make sure the AI returned a valid response
        if (result && result.response && result.response.text) {
            const reviewResponse = result.response.text; // Ensure this is correctly assigned

            // Generate suggestions for improvements
            const suggestionsResult = await model.generateContent(`Provide suggestions to improve this resume:\n\n${resumeText}`);
            let suggestions = "No specific suggestions available.";

            if (suggestionsResult && suggestionsResult.response && suggestionsResult.response.text) {
                suggestions = suggestionsResult.response.text;
            }

            // Return the structured review and suggestions
            const structuredReview = {
                review: reviewResponse,  // Resume Review
                suggestions: suggestions,  // Suggestions for improvement
                observations: "Good use of action verbs and concise language."  // Additional observations
            };

            return res.json(structuredReview); // Send response with review and suggestions
        } else {
            return res.status(400).json({ error: "Invalid response from Gemini AI" });
        }
    } catch (error) {
        console.error("Error processing the PDF:", error);

        // Ensure error handling doesn't try to send multiple responses
        if (!res.headersSent) {
            return res.status(500).json({ error: "Error processing the PDF" });
        }
    }
};
