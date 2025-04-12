const express = require('express');
const multer = require('multer');
const aiController = require('../Controllers/Ai.Controller'); // Importing the controller
const router = express.Router();

// Setup file upload using multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

// Route to generate content using Gemini AI (For both reviewing and suggestion purposes)
router.post("/generate-content", aiController.generateContent);

// Route to handle PDF resume upload and review
router.post("/upload-resume", upload.single("resume"), aiController.uploadResume);

module.exports = router;
